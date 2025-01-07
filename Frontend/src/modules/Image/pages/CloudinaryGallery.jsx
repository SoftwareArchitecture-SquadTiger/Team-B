import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtyc0iz95', // Your Cloudinary cloud name
  },
});

const CloudinaryGallery = () => {
  const image = cld.image('testPreset/images/da0nvjojcsigjxstiynp'); // Replace 'sample' with any available public_id in your Cloudinary account

  // Apply transformations
  image.resize(fill().width(500).height(500));

  return (
    <div>
      <h2>Cloudinary Image Gallery</h2>
      <AdvancedImage cldImg={image} alt="Sample Image" />
    </div>
  );
};

export default CloudinaryGallery;
