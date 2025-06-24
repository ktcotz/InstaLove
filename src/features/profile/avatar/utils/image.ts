import { CustomError } from "../../../../utils/CustomErrors";

export const validateImage = async (
  file: File,
  maxWidth = 1024,
  maxHeight = 1024,
  maxAspectRatio = 1.5
) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        reject(
          new CustomError({
            message: `Image too large. Max ${maxWidth}x${maxHeight}px.`,
          })
        );
      }

      const aspectRatio = width / height;
      if (aspectRatio > maxAspectRatio) {
        reject(
          new CustomError({
            message: `Invalid aspect ratio. Must be <= ${maxAspectRatio}.`,
          })
        );
      }

      resolve();
    };
    img.onerror = () => {
      reject(new CustomError({ message: "Invalid image file." }));
    };
    img.src = url;
  });
};

export const createThumbnail = async (
  file: File,
  maxSize = 128
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new CustomError({ message: "Thumbnail generation failed" }));
          }
        },
        "image/png",
        0.9
      );
    };
    img.onerror = () =>
      reject(new CustomError({ message: "Invalid image file." }));
    img.src = url;
  });
};
