import React, { useState, useRef } from 'react';
import cropContainer from 'react-cropify';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageZoom, setImageZoom] = useState(0);
  const [croppedWidth, setCroppedWidth] = useState(100); // Set your desired initial value
  const [croppedHeight, setCroppedHeight] = useState(100); // Set your desired initial value

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Reset zoom when a new image is selected
      setImageZoom(0.3);
      if (sliderRef.current) {
        sliderRef.current.value = 0.1; // Reset the slider value
      }
    }
  };

  const handleZoomSliderChange = () => {
    const zoomValue = parseFloat(sliderRef.current.value); // Parse the slider value as a float
    setImageZoom(zoomValue);
  };

  
  const handleCrop = async () => {
    if (selectedImage) {
      try {
        const croppedImageUrl = await cropContainer(selectedImage, imageZoom, croppedWidth, croppedHeight);
        setCroppedImage(croppedImageUrl);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };
  

  return (
    <div
      style={{
        fontFamily: 'Arial',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Image Cropper</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ margin: '20px' }}
      />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingBottom: '100%', // Creates a square container - Change for different shapes
              overflow: 'hidden',
            }}
          >
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Selected"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${imageZoom})`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          </div>
          <div>
            <input
              type="range"
              min={0.3}
              max={3}
              step={0.01}
              ref={sliderRef}
              value={imageZoom}
              onChange={handleZoomSliderChange}
              style={{
                width: '100%',
                position: 'relative',
                zIndex: 2,
              }}
            />
          </div>
        </div>
      )}
      {selectedImage && (
        <div>
          <button
            onClick={handleCrop}
            style={{
              margin: '20px',
              padding: '10px 20px',
              background: '#0074D9',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Crop Image
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {croppedImage && (
        <div>
          <h2>Cropped Image:</h2>
          <img src={croppedImage} alt="Cropped" width="200" />
        </div>
      )}
    </div>
  );
}

export default App;
