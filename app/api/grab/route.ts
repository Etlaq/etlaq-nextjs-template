import { NextResponse } from "next/server";

export const maxDuration = 60;

/**
 * Proxy endpoint for react-grab integration
 * Forwards requests to studio2's /api/grab endpoint
 * Only available in development mode
 */
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const chatId = process.env.STUDIO_CHAT_ID;
    const studioUrl = process.env.STUDIO_API_URL;

    if (!chatId || !studioUrl) {
      console.error("[GRAB] Missing environment variables:", {
        hasChatId: !!chatId,
        hasStudioUrl: !!studioUrl,
      });
      return NextResponse.json(
        {
          error: "React-grab integration not configured",
          details: "STUDIO_CHAT_ID or STUDIO_API_URL not set",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Add chatId to the request body
    const grabRequest = {
      chatId,
      context: body.context || {},
      prompt: body.prompt,
    };

    console.log("[GRAB] Forwarding request to studio:", {
      studioUrl,
      chatId,
      componentName: grabRequest.context.componentName,
    });

    // Forward to studio2
    const response = await fetch(`${studioUrl}/api/grab`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grabRequest),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[GRAB] Studio error:", error);
      return NextResponse.json(
        { error: "Studio request failed", details: error },
        { status: response.status }
      );
    }

    // Stream the response back
    if (response.body) {
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    return NextResponse.json({ error: "No response body" }, { status: 500 });
  } catch (error: any) {
    console.error("[GRAB] Proxy error:", error);
    return NextResponse.json(
      { error: "Proxy error", details: error.message },
      { status: 500 }
    );
  }
}
