import React from "react";

const BackgroundImage = ({ imageUrl, fallbackColor = "#f0f0f0" }) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundColor: fallbackColor,
        backgroundBlendMode: "overlay",
      }}
    ></div>
  );
};

export default BackgroundImage;
