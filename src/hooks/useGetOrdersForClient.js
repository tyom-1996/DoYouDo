// Updated useGetClientOrders Hook
import { useEffect, useState } from 'react';
import { getClientOrders2 } from '../utils/api/authApi'; // Ensure the correct path

export const useGetClientOrders = () => {
    const [loading, setLoading] = useState(false);
    const [clientOrdersData, setClientOrdersData] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getClientOrders = async (page = 1, limit = 10, status = null) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getClientOrders2(page, limit, status);
            setClientOrdersData(data.orders || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            setErrorText(error.message || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getClientOrders, loading, clientOrdersData, errorText, totalPages };
};
