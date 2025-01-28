import { useState } from 'react';
import {profileToggleRole2} from '../utils/api/authApi'; // Ensure the path is correct

export const useSetProfileToggleRole = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [profileToggleRoleData, setProfileToggleRoleData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const profileToggleRole = async () => {
        setLoadingAddFavorites(true);
        setErrorText('');

        try {
            const data = await profileToggleRole2(); // Call your API function
            setProfileToggleRoleData(data);
            console.log(data, 'add_favorites___');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {profileToggleRole, loadingAddFavorites, profileToggleRoleData};
};
