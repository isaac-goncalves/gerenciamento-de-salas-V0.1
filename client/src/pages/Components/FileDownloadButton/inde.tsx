import React from 'react';

import styled from 'styled-components';

import { Colors } from '../../../colors';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${Colors.mainpurple};
  padding: 10px 20px;
  border : none;
  font-size: 0.8rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  /* border: 1px solid red; */
  max-width: 40rem;
  max-height: 3rem;
  min-width: 12rem;

  cursor: pointer;
  &:hover {
    background-color: ${Colors.horariosCard};
  }
`

interface FileDownloadButton {
  buttonText: string;
  fileName: string;
  fileUrl: string;
}

const FileDownloadButton: React.FC<FileDownloadButton> = ({ buttonText, fileName, fileUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Button onClick={handleDownload}>
      {buttonText}
    </Button>
  );
};

export default FileDownloadButton;