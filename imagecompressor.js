import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

// Utility function for image compression
const compressImage = async (file, maxSizeMB = 1) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        const maxDimension = 1920; // Max width/height
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Adjust quality based on file size
        let quality = 0.8;
        const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
        
        canvas.toBlob(
          (blob) => {
            if (blob.size > maxSize) {
              quality = Math.min(maxSize / blob.size, 0.8);
              canvas.toBlob(
                (finalBlob) => {
                  resolve({
                    blob: finalBlob,
                    url: URL.createObjectURL(finalBlob),
                    width,
                    height,
                    size: finalBlob.size,
                    compressionRatio: (file.size / finalBlob.size).toFixed(2)
                  });
                },
                'image/jpeg',
                quality
              );
            } else {
              resolve({
                blob,
                url: URL.createObjectURL(blob),
                width,
                height,
                size: blob.size,
                compressionRatio: (file.size / blob.size).toFixed(2)
              });
            }
          },
          'image/jpeg',
          quality
        );
      };
    };
  });
};

const ImageCompressor = () => {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const files = e.dataTransfer?.files || e.target.files;
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    
    const compressedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const compressed = await compressImage(file);
        return {
          originalName: file.name,
          originalSize: file.size,
          ...compressed
        };
      })
    );
    
    setImages([...images, ...compressedImages]);
    setIsProcessing(false);
  };
  
  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop images here, or click to select files
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleDrop}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          Select Files
        </label>
      </div>

      {isProcessing && (
        <div className="text-center text-gray-600">
          Processing images...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={image.url}
              alt={image.originalName}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-2 text-sm">
              <p className="font-semibold">{image.originalName}</p>
              <p>Original: {(image.originalSize / 1024 / 1024).toFixed(2)} MB</p>
              <p>Compressed: {(image.size / 1024 / 1024).toFixed(2)} MB</p>
              <p>Compression ratio: {image.compressionRatio}x</p>
              <p>Dimensions: {image.width}x{image.height}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCompressor;
