import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import axios from 'axios';
import Api from '../apis/api';

const CropModal = ({ handleCropModal, imageToCrop,images,setImages }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async (imageSrc, pixelCrop) => {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg');
    });
  }, []);

  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) {
      console.error('Cropped area is not set');
      return;
    }

    try {
      const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
        console.log('blob',croppedImageBlob)
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('image', croppedImageBlob);
      const response = await Api.post("/api/users/upload",formData)
      console.log('dssssa',response);
      let arr = [...images]; // Create a copy of the images array
      let replaced = false; // A flag to indicate if the replacement has been done
      
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '' && !replaced) {
          arr[i] = response.data.imageLink;
          replaced = true; 
      }
    }
    setImages(arr)
    handleCropModal()
    console.log('aa',arr);

    } catch (error) {
      console.error('Error uploading cropped image:', error);
    }
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-gray-700 bg-opacity-40">
      <div className="bg-white p-4 rounded-md shadow-md overflow-hidden">
        <div className="relative w-96 h-64">
          <Cropper
            image={imageToCrop}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={handleCropAndUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
            Crop & upload
          </button>
          <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleCropModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
