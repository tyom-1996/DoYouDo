import { useEffect, useState } from 'react';
import { getOrderByIdApi } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetOrderById = (id) => {
    const [loading, setLoading] = useState(false);
    const [orderByIdData, setOrderByIdData] = useState(null);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (id) {
            getOrderById(id); // Fetch the order when the component mounts or id changes
        }
    }, [id]);

    const getOrderById = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getOrderByIdApi(id); // Make the API request
            setOrderByIdData(response); // Set the fetched data
            console.log(response, 'get_order_by_idd_____data')
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getOrderById, loading, orderByIdData, errorText };
};
