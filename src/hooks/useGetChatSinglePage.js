import { useEffect, useState } from 'react';
import { getChatSinglePage2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetChatSinglePage = () => {

    const [loading, setLoading] = useState(false);
    const [chatSingleData, setChatSingleData] = useState(null);
    const [errorText, setErrorText] = useState('');


    const getChatSinglePage = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getChatSinglePage2(id); // Fetch orders from the API
            setChatSingleData(data); // Set the data from the API
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getChatSinglePage, loading, chatSingleData, };
};




