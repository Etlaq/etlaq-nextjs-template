/**
 * Cloudinary upload utilities
 * https://cloudinary.com/documentation
 */

import { serverEnv } from '@/lib/env';
import crypto from 'crypto';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1';

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  transformation?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  created_at: string;
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    serverEnv.CLOUDINARY_CLOUD_NAME &&
    serverEnv.CLOUDINARY_API_KEY &&
    serverEnv.CLOUDINARY_API_SECRET
  );
}

/**
 * Generate a signature for Cloudinary upload
 */
function generateSignature(params: Record<string, string>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const stringToSign = sortedParams + serverEnv.CLOUDINARY_API_SECRET;

  return crypto.createHash('sha1').update(stringToSign).digest('hex');
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  file: File | Buffer,
  options: UploadOptions = {}
): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary not configured');
  }

  const {
    folder = 'uploads',
    public_id,
    transformation,
    resource_type = 'auto',
  } = options;

  const timestamp = Math.round(Date.now() / 1000).toString();

  // Build params for signature
  const params: Record<string, string> = {
    timestamp,
    folder,
  };

  if (public_id) params.public_id = public_id;
  if (transformation) params.transformation = transformation;

  const signature = generateSignature(params);

  // Build form data
  const formData = new FormData();

  if (Buffer.isBuffer(file)) {
    // Convert Buffer to Blob using Uint8Array
    const uint8Array = new Uint8Array(file);
    const blob = new Blob([uint8Array]);
    formData.append('file', blob);
  } else {
    formData.append('file', file);
  }

  formData.append('api_key', serverEnv.CLOUDINARY_API_KEY!);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  if (public_id) formData.append('public_id', public_id);
  if (transformation) formData.append('transformation', transformation);

  const uploadUrl = `${CLOUDINARY_UPLOAD_URL}/${serverEnv.CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Upload failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<boolean> {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary not configured');
  }

  const timestamp = Math.round(Date.now() / 1000).toString();

  const params = {
    public_id: publicId,
    timestamp,
  };

  const signature = generateSignature(params);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', serverEnv.CLOUDINARY_API_KEY!);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const deleteUrl = `${CLOUDINARY_UPLOAD_URL}/${serverEnv.CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`;

  const response = await fetch(deleteUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Delete failed: ${response.status}`);
  }

  const result = await response.json();
  return result.result === 'ok';
}

/**
 * Generate a Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!serverEnv.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name not configured');
  }

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformationString = transformations.join(',');

  return `https://res.cloudinary.com/${serverEnv.CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${publicId}`;
}
