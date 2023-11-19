import React, { ChangeEvent, useEffect } from 'react';

import styled from 'styled-components';
import { Colors } from '../../../colors';

import { HiOutlineUpload } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineUpload } from 'react-icons/ai';

// FileInput styled component
const FileInput = styled.input`
  display: none;
`;

// Label styled component
const Label = styled.label`
 background-color: ${props => props.theme.hoverCard};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  height: 2rem;
  padding: 0 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  p {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: #006f8f;
  }
`;


interface FileUploadButtonProps {
  course: number;
  loggedUserRole: string;
  action: string;
  uploadText: string;
}

// FileUploadButton component
const FileUploadButton = ({ course,loggedUserRole, action, uploadText }: FileUploadButtonProps) => {

  const [loggedUser, setLoggedUser] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState(0);

  useEffect(() => {
    console.log(course);
    setLoggedUser(loggedUserRole);
    setSelectedCourse(course);
  }
    , [loggedUserRole]);


  console.log(loggedUserRole);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {
      sendFileToBackend(file);
    }
  };

  const sendFileToBackend = async (selectedFile: File) => {

    console.log(selectedCourse);

    let url = '';

    if (action === 'profilepic') {
      url = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/usuarios/upload/';
    }
    else {
      url = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/template/upload/${selectedCourse}`;
    }

    const formData = new FormData();

    formData.append('file', selectedFile);

    await fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend

        if (data.message = "File uploaded and processed successfully") {
          toast.success('Template enviado e processado com sucesso!');
        } else {
          toast.error('Foi encontrado um erro ao processar o upload do template. Tente novamente mais tarde.');
        }
        console.log(data);
        //enable other uploads 
      })
      .catch((error) => {
        // Handle errors
        toast.error('Foi encontrado um erro ao processar o upload do template. Tente novamente mais tarde.');
        console.error(error);
      });
  };
  //insira um reac icon de arquivo ali depois do escolher arquivo
  return (
    <Label
      htmlFor="fileUpload">
      <AiOutlineUpload
        // onClick={handleFileChange}
        size={20}
      />
      <p>
        {selectedCourse}
        {uploadText}
      </p>
      <FileInput
        // disabled={loggedUser === 'aluno' || loggedUser == 'guest' ? true : false}
        id="fileUpload"
        type="file"
        onChange={handleFileChange}
        
      />
    </Label>
  );
};

export default FileUploadButton;