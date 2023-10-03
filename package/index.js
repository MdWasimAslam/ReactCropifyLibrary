function cropContainer(imageUrl, zoom, cropWidth, cropHeight) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Calculate the dimensions for cropping
        const scaledCropWidth = (cropWidth / zoom)*2;
        const scaledCropHeight = (cropHeight / zoom)*2;
  
        // Set the canvas dimensions to the cropped size
        canvas.width = scaledCropWidth;
        canvas.height = scaledCropHeight;
  
        // Calculate the cropping position
        const xOffset = (img.width - scaledCropWidth) / 2;
        const yOffset = (img.height - scaledCropHeight) / 2;
  
        // Draw the cropped portion onto the canvas
        ctx.drawImage(
          img,
          xOffset,
          yOffset,
          scaledCropWidth,
          scaledCropHeight,
          0,
          0,
          scaledCropWidth,
          scaledCropHeight
        );
  
        // Convert the canvas content to a Data URL (JPEG format)
        const croppedImageUrl = canvas.toDataURL('image/jpeg');
  
        // Resolve the promise with the cropped image URL
        resolve(croppedImageUrl);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
module.exports = cropContainer