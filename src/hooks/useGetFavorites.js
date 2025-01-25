import { useState } from 'react';
import {getFavoritesList} from '../utils/api/authApi'; // Ensure the path is correct

export const useGetFavorites = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [getFavoritesData, setAddFavoritesData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const getFavorites = async (id) => {
        setLoadingAddFavorites(true);
        setErrorText('');
        console.log(id, 'add_favorites_ids')

        try {
            const data = await getFavoritesList(id); // Call your API function
            setAddFavoritesData(data);
            console.log(data, 'add_favorites___');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {getFavorites, loadingAddFavorites, getFavoritesData};
};
