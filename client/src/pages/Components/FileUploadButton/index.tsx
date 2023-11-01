import React, { ChangeEvent, useEffect } from 'react';

import styled from 'styled-components';
import { Colors } from '../../../colors';

import { HiOutlineUpload } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';

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

  margin-left: 0.5rem;
  p {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: #006f8f;
  }
`;


interface FileUploadButtonProps {
  userId?: string;
  loggedUserRole: string;
  action: string;
  course: number;
}

// FileUploadButton component
const FileUploadButton = ({ course, userId, loggedUserRole, action }: FileUploadButtonProps) => {

  const [loggedUser, setLoggedUser] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState(0);
  

  useEffect(() => {
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

  const sendFileToBackend = (selectedFile: File) => {

    let url = '';

    if (action === 'profilepic') {
      url = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/usuarios/upload/';
    }
    else {
      url = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/template/upload/${selectedCourse}`;
    }

    const formData = new FormData();

    formData.append('file', selectedFile);

    fetch(url, {
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
  //insira um reac icon de arquivo ali depois do escolher arquivo
  return (
    <Label
      htmlFor="fileUpload">
      <HiOutlineUpload
        size={25}
      />
      <p>
        Enviar Arquivo
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