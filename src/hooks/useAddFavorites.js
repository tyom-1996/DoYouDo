import { useState } from 'react';
import {addFavoritesRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useAddFavorites = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [addFavoritesData, setAddFavoritesData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const addFavorites = async (id, responseId) => {
        setLoadingAddFavorites(true);
        setErrorText('');
        console.log(id, responseId, 'add_favorites_ids')

        try {
            const data = await addFavoritesRequest(id, responseId); // Call your API function
            setAddFavoritesData(data);
            console.log(data, 'add_favorites___');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {addFavorites, loadingAddFavorites, addFavoritesData};
};
