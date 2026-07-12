// Browser-side version of the photo pipeline used for the existing catalog:
// EXIF-corrected orientation, resized to max 1000px wide, JPEG quality 0.82.

const MAX_WIDTH = 1000;
const QUALITY = 0.82;

async function loadBitmap(file) {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    // Older browsers: <img> applies EXIF orientation itself when drawn.
    const url = URL.createObjectURL(file);
    try {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Could not read that image file.'));
        img.src = url;
      });
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    }
  }
}

// Returns { base64, dataUrl } — base64 for the GitHub blob, dataUrl for preview.
export async function processPhoto(file) {
  const source = await loadBitmap(file);
  const srcW = source.naturalWidth || source.width;
  const srcH = source.naturalHeight || source.height;
  const scale = Math.min(1, MAX_WIDTH / srcW);
  const width = Math.round(srcW * scale);
  const height = Math.round(srcH * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, 0, 0, width, height);
  if (source.close) source.close();

  const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
  return { base64: dataUrl.split(',')[1], dataUrl };
}
