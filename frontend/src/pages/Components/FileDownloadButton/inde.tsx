import React from 'react';

interface FileDownloadButton {
  fileName: string;
  fileUrl: string;
}

const FileDownloadButton: React.FC<FileDownloadButton> = ({ fileName, fileUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <button onClick={handleDownload}>
      Download Template
    </button>
  );
};

export default FileDownloadButton;