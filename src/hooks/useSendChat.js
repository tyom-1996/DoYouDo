import { useState } from 'react';
import {sendChat2} from '../utils/api/authApi'; // Ensure the path is correct

export const useSendChat = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [sendChatData, setSendChatData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const sendChat = async (formData) => {
        setLoadingAddFavorites(true);
        setErrorText('');

        try {
            const data = await sendChat2(formData);
            setSendChatData(data);
        } catch (error) {
            console.log(error, '------');
            setErrorText(error);
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return {sendChat, loadingAddFavorites, sendChatData};
};
