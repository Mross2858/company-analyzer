import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
  onUpload?: (file: File) => void;
}

export const FileUpload: React.FC<Props> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && onUpload) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Companies</h2>
      
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload size={24} className={isDragActive ? 'text-blue-500' : 'text-gray-400'} />
          
          {isDragActive ? (
            <p className="text-blue-500">Drop the file here...</p>
          ) : isDragReject ? (
            <Alert variant="destructive">
              <AlertDescription>Invalid file type. Please upload a CSV or Excel file.</AlertDescription>
            </Alert>
          ) : (
            <div>
              <p className="text-gray-600">Drag & drop a file here, or click to select</p>
              <p className="text-sm text-gray-400 mt-2">Supports CSV, XLS, XLSX</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};