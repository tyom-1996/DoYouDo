import { useEffect, useState } from 'react';
import { getChats2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetChats = () => {

    const [loading, setLoading] = useState(false);
    const [chatsData, setChatsData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1); // Total pages from the API


    const getChats = async () => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getChats2(); // Fetch orders from the API
            setChatsData(data); // Set the data from the API
            setTotalPages(data.totalPages); // Set the total number of pages
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getChats, loading, chatsData, errorText, totalPages };
};




