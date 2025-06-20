import { useState } from 'react';
import {createChat2} from '../utils/api/authApi'; // Ensure the path is correct

export const useCreateChat = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [createChatData, setCreateChatData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const createChat = async (adId, sellerId) => {
        setLoadingAddFavorites(true);
        setErrorText('');

        try {
            const data = await createChat2(adId, sellerId); // Call your API function
            setCreateChatData(data);
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {createChat, loadingAddFavorites, createChatData};
};
