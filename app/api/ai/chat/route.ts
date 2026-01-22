import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import {
  createStreamingChatCompletion,
  createChatCompletion,
  isOpenRouterConfigured,
  type ChatMessage,
} from '@/lib/openrouter';

// POST /api/ai/chat - AI chat completion (protected)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    // Check if OpenRouter is configured
    if (!isOpenRouterConfigured()) {
      return NextResponse.json(
        { error: 'خدمة الذكاء الاصطناعي غير مفعّلة' }, // AI service not configured
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages, stream = true, model, temperature, max_tokens } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'الرسائل مطلوبة' }, // Messages required
        { status: 400 }
      );
    }

    // Validate message format
    for (const msg of messages as ChatMessage[]) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: 'صيغة الرسائل غير صحيحة' }, // Invalid message format
          { status: 400 }
        );
      }
    }

    const options = { model, temperature, max_tokens };

    // Streaming response
    if (stream) {
      const streamResponse = await createStreamingChatCompletion(messages, options);

      return new Response(streamResponse, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Non-streaming response
    const completion = await createChatCompletion(messages, options);
    return NextResponse.json(completion);
  } catch (error) {
    console.error('AI chat error:', error);

    const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
