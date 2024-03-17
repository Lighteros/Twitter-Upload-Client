import React, { useState } from 'react';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('An error occurred while uploading the file', error);
      }
    }
  };

  return (
    <div>
      {selectedFile && (
        <div>
          {selectedFile.type.includes('image') ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
          ) : (
            <video src={URL.createObjectURL(selectedFile)} controls autoPlay/>
          )}
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <button onClick={handleUpload}>Upload</button>
      )}
    </div>
  );
};

export default VideoUpload;