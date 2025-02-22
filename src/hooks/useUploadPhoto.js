import { useState } from 'react';
import { uploadPhoto2 } from '../utils/api/authApi';

export const useUploadPhoto = () => {
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [uploadPhotoData, setUploadPhotoData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const uploadPhoto = async (file) => {
        setLoadingUpload(true);
        setErrorText('');

        try {
            const data = await uploadPhoto2(file); // Pass file to function
            setUploadPhotoData(data);
            console.log('Upload Success:', data);
        } catch (error) {
            console.log('Upload Error:', error);
            setErrorText(error);
        } finally {
            setLoadingUpload(false);
        }
    };

    return { uploadPhoto, uploadPhotoData, loadingUpload, errorText };
};
