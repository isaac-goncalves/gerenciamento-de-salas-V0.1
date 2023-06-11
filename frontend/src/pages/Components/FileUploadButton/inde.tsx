import React, { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Colors } from '../../../colors';

// FileInput styled component
const FileInput = styled.input`
  display: none;
`;

// Label styled component
const Label = styled.label`
    
  padding: 10px 20px;
  background-color: ${Colors.mainpurple};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${Colors.horariosCard};
  }
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
        toast.success('Template enviado e processado com sucesso!');
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        toast.error('Foi encontrado um erro ao processar o upload do template. Tente novamente mais tarde.');
        console.error(error);
      });
  };

  return (
    <>
      <Label htmlFor="fileUpload">
        Choose File
        <FileInput
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
        />
      </Label>
    </>
  );
};

export default FileUploadButton;