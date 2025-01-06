import React from "react";

const FileUpload = ({ onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Project Image/Video</label>
      <input
        type="file"
        onChange={onChange}
        accept="image/png, image/jpeg, audio/mp3"
        className="w-full p-2 border rounded"
      />
      <p className="text-gray-500 text-sm mt-1">
        Upload a file or drag and drop PNG, JPG, MP3 up to 200MB.
      </p>
    </div>
  );
};

export default FileUpload;
