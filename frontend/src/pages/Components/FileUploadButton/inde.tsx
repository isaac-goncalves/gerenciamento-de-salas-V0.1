import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

// FileInput styled component
const FileInput = styled.input`
  /* display: none; */
`;

// Button styled component
const Button = styled.button`
  /* Add your button styles here */
`;

// FileUploadButton component
const FileUploadButton: React.FC = () => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      sendFileToBackend(file);
    }
  };

  const sendFileToBackend = (selectedFile: File) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch('http://localhost:3333/template/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <>
      <Button>
        <FileInput
          type="file"
          onChange={handleFileChange}
        />
        Choose File
      </Button>
    </>
  );
};

export default FileUploadButton;