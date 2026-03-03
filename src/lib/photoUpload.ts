/**
 * DEMO: Photo upload stub — simulates success without Firebase Storage.
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/** Simulate uploading a single file (no real upload). */
export async function uploadPhoto(_file: File): Promise<UploadResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, url: '#demo' };
}

/** Check whether photo upload is available (always true in demo). */
export function isPhotoUploadAvailable(): boolean {
  return true;
}
