/**
 * React-grab server for Etlaq Studio integration
 * Runs on port 4567 (Claude Code compatible)
 * Returns grab data for client to postMessage to Studio2
 */

import http from "http";

const PORT = 4567;

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
      })
    );
    return;
  }

  // Main agent endpoint - returns data for postMessage
  if (req.method === "POST" && url.pathname === "/agent") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        console.log(`[GRAB] Received grab request`);
        console.log(`[GRAB] Context:`, data.context);
        console.log(`[GRAB] Prompt:`, data.prompt?.substring(0, 100));

        // Return grab data for client to postMessage to parent window
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            type: "grab-prompt",
            prompt: data.prompt || data.systemPrompt?.append || "",
            context: data.context || {},
          })
        );
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
});

// Handle shutdown
process.on("SIGINT", () => {
  console.log("[GRAB] Shutting down...");
  server.close();
  process.exit(0);
});
