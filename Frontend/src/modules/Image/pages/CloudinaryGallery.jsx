import React, { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtyc0iz95', // Your Cloudinary cloud name
  },
});

const CloudinaryGallery = () => {
  const [imageUrl, setImageUrl] = useState('');
  const image = cld.image('testPreset/images/da0nvjojcsigjxstiynp'); // Default image public_id

  // Apply transformations
  image.resize(fill().width(500).height(500));

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      script.onload = () => {
        console.log('Cloudinary script loaded');
      };
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  const handleUpload = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: 'dtyc0iz95',
          uploadPreset: 'unsignedPreset', // Replace with your unsigned preset name
          apiKey: '136267292197893', // Replace with your API key
          sources: ['local', 'url', 'camera'],
          multiple: false,
          cropping: true,
          croppingAspectRatio: 1,
          showSkipCropButton: false,
          folder: 'testPreset/images/',
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Uploaded Image:', result.info.secure_url);
            setImageUrl(result.info.secure_url);
          } else if (error) {
            console.error('Upload Error:', error);
          }
        }
      );
    } else {
      console.error('Cloudinary script not loaded');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Cloudinary Image Gallery</h2>

      <div style={styles.galleryContainer}>
        {/* Display the Default Image */}
        <div style={styles.imageWrapper}>
          <AdvancedImage cldImg={image} alt="Default Image" style={styles.image} />
          <p style={styles.caption}>Default Image</p>
        </div>

        {/* Display the Uploaded Image */}
        {imageUrl && (
          <div style={styles.imageWrapper}>
            <img src={imageUrl} alt="Uploaded" style={styles.image} />
            <p style={styles.caption}>Uploaded Image</p>
          </div>
        )}
      </div>

      {/* Upload Image Button */}
      <button onClick={handleUpload} style={styles.uploadButton}>
        Add Image
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  galleryContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    maxWidth: '500px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  caption: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#666',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
};

export default CloudinaryGallery;
