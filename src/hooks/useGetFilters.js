import { useEffect, useState } from 'react';
import { getFilters2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetFilters = () => {
    const [loading, setLoading] = useState(false);
    const [filtersData, setFiltersData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const getFilters = async () => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getFilters2(); // Fetch orders from the API
            console.log(data, 'get_orders_data_____')
            setFiltersData(data); // Set the data from the API
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getFilters, filtersData, };
};




