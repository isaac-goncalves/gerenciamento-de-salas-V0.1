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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  min-width: 12rem;
  color: white;
  background-color: ${props => props.theme.mainpurple};
  padding: 10px 20px;
  gap: 10px;
  max-width: 20rem;
  width: 100%;
  max-height: 2.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.horariosCard};
  }
`;


interface FileUploadButtonProps {
  userId: string;
  loggedUserRole: string;
  action: string;
}

// FileUploadButton component
const FileUploadButton = ({ userId, loggedUserRole, action }: FileUploadButtonProps) => {

  const [loggedUser, setLoggedUser] = React.useState('');

  useEffect(() => {
    setLoggedUser(loggedUserRole);
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
      url = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/template/upload';
    }

    const formData = new FormData();
    
    formData.append('file', selectedFile);
    formData.append('userId', userId);

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
        onClick={() => { loggedUser == 'aluno' || loggedUser == 'guest' ? toast.error('Usuário sem permissão para upload de arquivos🧐') : null }}
        htmlFor="fileUpload">
        <HiOutlineUpload
          size={25}
        />
        Escolher arquivo para upload
        <FileInput
          disabled={loggedUser === 'aluno' || loggedUser == 'guest' ? true : false}
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
        />
      </Label>
  );
};

export default FileUploadButton;