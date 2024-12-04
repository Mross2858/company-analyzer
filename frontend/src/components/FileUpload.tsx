import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const FileUpload: React.FC<{ onUpload: (file: File) => void }> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the file here...</p>
      ) : (
        <div>
          <p className="text-gray-600">Drag & drop a file here, or click to select</p>
          <p className="text-sm text-gray-400 mt-2">Supports CSV, XLS, XLSX</p>
        </div>
      )}
    </div>
  );
};