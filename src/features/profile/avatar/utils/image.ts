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
  maxWidth = 128,
  maxHeight = 128,
  fit: "contain" | "fill" = "contain"
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width < 600 || img.height < 600) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Thumbnail generation failed"));
            }
          },
          "image/webp",
          0.9
        );
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      let drawWidth = maxWidth;
      let drawHeight = maxHeight;

      if (fit === "contain") {
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        drawWidth = Math.round(img.width * scale);
        drawHeight = Math.round(img.height * scale);
      }

      canvas.width = maxWidth;
      canvas.height = maxHeight;

      if (fit === "contain") {
        const offsetX = Math.round((maxWidth - drawWidth) / 2);
        const offsetY = Math.round((maxHeight - drawHeight) / 2);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Thumbnail generation failed"));
          }
        },
        "image/webp",
        0.9
      );
    };
    img.onerror = () => reject(new Error("Invalid image file"));
    img.src = url;
  });
};
