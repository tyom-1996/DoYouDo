import { useEffect, useState } from 'react';
import { getChatUnreadCount2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetChatUnreadCount = () => {

    const [loading, setLoading] = useState(false);
    const [getChatsUnreadCountData, setGetChatsUnreadCountData] = useState(null);
    const [errorText, setErrorText] = useState('');


    const getChatUnreadCount = async () => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getChatUnreadCount2(); // Fetch orders from the API
            setGetChatsUnreadCountData(data); // Set the data from the API
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return {getChatUnreadCount, loading, getChatsUnreadCountData, errorText};
};




