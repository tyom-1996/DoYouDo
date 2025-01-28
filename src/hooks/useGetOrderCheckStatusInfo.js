import { useEffect, useState } from 'react';
import { getOrderCheckStatusInfo2 } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetOrderCheckStatusInfo = (id) => {
    const [loading, setLoading] = useState(false);
    const [orderCheckStatusData, setOrderCheckStatusData] = useState(null);
    const [errorText, setErrorText] = useState('');


    const getOrderCheckStatusInfo = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getOrderCheckStatusInfo2(id); // Make the API request
            setOrderCheckStatusData(response); // Set the fetched data

            console.log(response, 'check_status______')
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getOrderCheckStatusInfo, loading, orderCheckStatusData, errorText };
};
