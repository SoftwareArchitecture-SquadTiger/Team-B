// import React, { useEffect, useState } from 'react';
// import CloudinaryGallery from '../components/CloudinaryGallery';
// import ImageGallery from '../components/ImageGallery';
// import fetchCloudinaryImages from '../services/fetchCloudinaryImages';

// const GalleryPage = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const fetchedImages = await fetchCloudinaryImages();
//         setImages(fetchedImages);
//       } catch (error) {
//         console.error('Error loading images:', error);
//       }
//     };

//     loadImages();
//   }, []);

//   return (
//     <div>
//       <CloudinaryGallery />
//       <ImageGallery images={images} />
//     </div>
//   );
// };

// export default GalleryPage;
