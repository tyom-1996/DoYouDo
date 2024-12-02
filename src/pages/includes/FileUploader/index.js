import React, { useState } from 'react';
import styles from '../../../assets/css/create_order.css'; // Import CSS module

export default function FileUploader({ onFilesUpdate }) {
    const [files, setFiles] = useState([]);

    const selectFiles = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Filter out image files based on MIME types
        const filteredFiles = selectedFiles.filter(file => !file.type.startsWith('image/'));

        if (filteredFiles.length < selectedFiles.length) {
            // If any images were filtered out, alert the user
            alert('Image files are not allowed. Please select only non-image files.');
        }

        const updatedFiles = [...files, ...filteredFiles];
        setFiles(updatedFiles);

        // Send updated files to the parent component
        onFilesUpdate(updatedFiles);
    };

    const deleteFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);

        // Send updated files to the parent component
        onFilesUpdate(updatedFiles);
    };

    return (
        <div className="container">
            <div className="fileList">
                {files.map((file, index) => (
                    <div key={index} className="fileContainer">
                        <span className="fileName">{file.name}</span>
                        <button
                            onClick={() => deleteFile(index)}
                            className="deleteButton"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                            >
                                <rect width={24} height={24} fill="#fff" rx={7} />
                                <path
                                    fill="red"
                                    d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.997.997 0 0 0 5.7 7.11L10.59 12 5.7 16.89a.998.998 0 0 0 1.41 1.41L12 13.41l4.89 4.89a.997.997 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <div className='upload_btn'>
                <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" // Accept specific file types
                    style={{ display: 'none' }}
                    id="file-input"
                    onChange={selectFiles}
                />
                <label htmlFor="file-input" className="file_uploadButton">
                    <span className='file_upload_title'>Добавить</span>
                </label>
            </div>
        </div>
    );
}
