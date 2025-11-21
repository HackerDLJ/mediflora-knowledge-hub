/**
 * Image preprocessing utilities for improved plant identification
 */

export const preprocessImage = async (imageData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Set optimal dimensions (max 1024px while maintaining aspect ratio)
      const maxSize = 1024;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Get image data for processing
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Apply enhancements
      enhanceContrast(data, 1.2);
      adjustBrightness(data, 10);
      reduceSaturation(data, 0.9); // Slight desaturation for better plant feature detection

      // Put processed data back
      ctx.putImageData(imageData, 0, 0);

      // Apply slight sharpening
      applySharpening(ctx, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageData;
  });
};

const enhanceContrast = (data: Uint8ClampedArray, factor: number) => {
  const contrast = (factor - 1) * 128;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp((factor * (data[i] - 128)) + 128 + contrast);     // R
    data[i + 1] = clamp((factor * (data[i + 1] - 128)) + 128 + contrast); // G
    data[i + 2] = clamp((factor * (data[i + 2] - 128)) + 128 + contrast); // B
  }
};

const adjustBrightness = (data: Uint8ClampedArray, amount: number) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + amount);       // R
    data[i + 1] = clamp(data[i + 1] + amount); // G
    data[i + 2] = clamp(data[i + 2] + amount); // B
  }
};

const reduceSaturation = (data: Uint8ClampedArray, factor: number) => {
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = clamp(gray + factor * (data[i] - gray));       // R
    data[i + 1] = clamp(gray + factor * (data[i + 1] - gray)); // G
    data[i + 2] = clamp(gray + factor * (data[i + 2] - gray)); // B
  }
};

const applySharpening = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const output = ctx.createImageData(width, height);
  const dst = output.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dstOff = (y * width + x) * 4;
      let r = 0, g = 0, b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = Math.min(height - 1, Math.max(0, y + cy - halfSide));
          const scx = Math.min(width - 1, Math.max(0, x + cx - halfSide));
          const srcOff = (scy * width + scx) * 4;
          const wt = weights[cy * side + cx];

          r += data[srcOff] * wt;
          g += data[srcOff + 1] * wt;
          b += data[srcOff + 2] * wt;
        }
      }

      dst[dstOff] = clamp(r);
      dst[dstOff + 1] = clamp(g);
      dst[dstOff + 2] = clamp(b);
      dst[dstOff + 3] = data[dstOff + 3]; // Alpha
    }
  }

  ctx.putImageData(output, 0, 0);
};

const clamp = (value: number): number => {
  return Math.max(0, Math.min(255, value));
};
