/**
 * React-grab server for Etlaq Studio integration
 * Runs on port 4567 (Claude Code compatible)
 * Forwards requests to Studio2's /api/grab endpoint
 */

import http from "http";

const PORT = 4567;
const STUDIO_API_URL = process.env.STUDIO_API_URL || "https://studio.etlaq.sa";
const STUDIO_CHAT_ID = process.env.STUDIO_CHAT_ID;

// Store active sessions
const sessions = new Map<
  string,
  { aborted: boolean; controller: AbortController }
>();

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // Health check endpoint
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        provider: "etlaq-studio",
        chatId: STUDIO_CHAT_ID ? "configured" : "missing",
      })
    );
    return;
  }

  // Abort endpoint
  if (req.method === "POST" && url.pathname.startsWith("/abort/")) {
    const sessionId = url.pathname.replace("/abort/", "");
    const session = sessions.get(sessionId);
    if (session) {
      session.aborted = true;
      session.controller.abort();
      sessions.delete(sessionId);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ aborted: true }));
    return;
  }

  // Main agent endpoint
  if (req.method === "POST" && url.pathname === "/agent") {
    if (!STUDIO_CHAT_ID) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "STUDIO_CHAT_ID not configured",
          message: "React-grab integration not available",
        })
      );
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const sessionId = data.sessionId || crypto.randomUUID();

        // Create abort controller for this session
        const controller = new AbortController();
        sessions.set(sessionId, { aborted: false, controller });

        console.log(`[GRAB] New session: ${sessionId}`);
        console.log(`[GRAB] Context:`, data.context);
        console.log(`[GRAB] Prompt:`, data.prompt?.substring(0, 100));

        // Set up SSE response
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        // Forward to Studio2
        try {
          const studioResponse = await fetch(`${STUDIO_API_URL}/api/grab`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatId: STUDIO_CHAT_ID,
              context: data.context || {},
              prompt: data.prompt || data.systemPrompt?.append || "",
            }),
            signal: controller.signal,
          });

          if (!studioResponse.ok) {
            const error = await studioResponse.text();
            res.write(`data: ${JSON.stringify({ type: "error", error })}\n\n`);
            res.end();
            return;
          }

          // Stream the response
          if (studioResponse.body) {
            const reader = studioResponse.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
              const session = sessions.get(sessionId);
              if (session?.aborted) {
                break;
              }

              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              res.write(chunk);
            }
          }

          res.write(
            `data: ${JSON.stringify({ type: "complete", sessionId })}\n\n`
          );
        } catch (error: any) {
          if (error.name !== "AbortError") {
            console.error("[GRAB] Error:", error);
            res.write(
              `data: ${JSON.stringify({ type: "error", error: error.message })}\n\n`
            );
          }
        }

        sessions.delete(sessionId);
        res.end();
      } catch (error: any) {
        console.error("[GRAB] Parse error:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request body" }));
      }
    });
    return;
  }

  // 404 for unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`🔗 [GRAB] React-grab server running on port ${PORT}`);
  console.log(`🔗 [GRAB] Studio API: ${STUDIO_API_URL}`);
  console.log(
    `🔗 [GRAB] Chat ID: ${STUDIO_CHAT_ID ? "✓ configured" : "✗ missing"}`
  );
});

// Handle shutdown
process.on("SIGINT", () => {
  console.log("[GRAB] Shutting down...");
  server.close();
  process.exit(0);
});
