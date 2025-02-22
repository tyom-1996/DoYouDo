import { useState } from 'react';
import {updateProfile2} from '../utils/api/authApi'; // Ensure the path is correct

export const useUpdateProfile = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [updateProfileData, setUpdateProfileData] = useState(null);

    const updateProfile = async (name, surname, experience, aboutMe, email, address, latitude, longitude, selectedGender, selectedBirthDate, profileImage  ) => {
        setLoadingAddFavorites(true);

        try {
            const data = await updateProfile2(name, surname, experience, aboutMe, email, address, latitude, longitude, selectedGender, selectedBirthDate, profileImage);
            setUpdateProfileData(data);
            console.log(data, 'add_favorites___');
        } catch (error) {
            console.log(error, '------')
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {updateProfile,  updateProfileData};
};
