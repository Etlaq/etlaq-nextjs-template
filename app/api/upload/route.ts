import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

// POST /api/upload - Upload file to Cloudinary (protected)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: 'خدمة رفع الملفات غير مفعّلة' }, // Upload service not configured
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json(
        { error: 'الملف مطلوب' }, // File required
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'حجم الملف يتجاوز الحد المسموح (10 ميجابايت)' }, // File too large
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'نوع الملف غير مدعوم. الأنواع المدعومة: JPEG, PNG, GIF, WebP, SVG' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file, { folder });

    return NextResponse.json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);

    const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
