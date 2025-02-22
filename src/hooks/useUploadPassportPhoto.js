import { useState } from 'react';
import {uploadPassportPhoto2} from '../utils/api/authApi'; // Ensure the path is correct

export const useUploadPassportPhoto = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [uploadPassportPhotoData, setUploadPassportPhotoData] = useState(null);

    const uploadPassportPhoto = async (passportImage, passportSelfieImage) => {
        setLoadingAddFavorites(true);

        try {
            const data = await uploadPassportPhoto2(passportImage, passportSelfieImage); // Call your API function
            setUploadPassportPhotoData(data);
            console.log(data, 'add_favorites___');
        } catch (error) {
            console.log(error, '------')
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {uploadPassportPhoto,  uploadPassportPhotoData};
};
