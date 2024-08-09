"use client"
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';


const page = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);

    // Create a preview URL for the uploaded image
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto p-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>画像をドロップしてください</p>
        ) : (
          <p>ここをクリックするか、画像をドラッグ＆ドロップしてアップロード</p>
        )}
      </div>
      {uploadedImage && (
        <div className="mt-4">
          <p>アップロードされた画像: {uploadedImage.name}</p>
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Uploaded image preview"
                width={300}
                height={300}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;