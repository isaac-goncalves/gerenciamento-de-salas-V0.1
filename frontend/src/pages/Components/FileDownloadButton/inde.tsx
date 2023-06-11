import React from 'react';

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
    <button onClick={handleDownload}>
      {buttonText}
    </button>
  );
};

export default FileDownloadButton;