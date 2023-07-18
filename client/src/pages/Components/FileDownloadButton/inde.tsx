import React from 'react';

import styled from 'styled-components';

import { Colors } from '../../../colors';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${Colors.mainpurple};
  color: white;
  border : none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  
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