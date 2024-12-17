import React from "react";
import { FaImage } from "react-icons/fa";

const AvatarUpload = ({ image, handleImageUpload }) => {
  return (
    <div className="col-span-2 flex flex-col items-center">
      <label
        htmlFor="avatar"
        className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-100"
      >
        {image ? (
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <FaImage className="text-gray-400 text-3xl" />
        )}
      </label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
