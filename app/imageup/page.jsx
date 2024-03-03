"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const Image = () => {
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const handleUploadSuccess = (result) => {
    const imageUrl = result.info.secure_url;

    setUploadedImageUrls((prevUrls) => [...prevUrls, imageUrl]);
  };

  return (
    <div className="pages-padding">
      <CldUploadWidget
        uploadPreset="sndschta"
        onSuccess={handleUploadSuccess}
        onFailure={(error) => console.error("Image upload failed:", error)}
        resourceType="image"
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>

      {/* Render the uploaded images */}
      <div>
        <h2>Uploaded Images:</h2>
        <ul>
          {uploadedImageUrls.map((imageUrl, index) => (
            <li key={index}>
              {console.log(uploadedImageUrls)}
              <img src={imageUrl} alt={`Uploaded Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Image;
