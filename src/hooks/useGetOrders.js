import { useEffect, useState } from 'react';
import { getOrders2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetOrders = () => {
    const [loading, setLoading] = useState(false);
    const [ordersData, setOrderData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1); // Total pages from the API

    const getOrders = async (body, page, limit = 10) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getOrders2(body, page, limit); // Fetch orders from the API
            console.log(data, 'get_orders_data_____')
            setOrderData(data); // Set the data from the API
            setTotalPages(data.totalPages); // Set the total number of pages
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getOrders, loading, ordersData, errorText, totalPages };
};




