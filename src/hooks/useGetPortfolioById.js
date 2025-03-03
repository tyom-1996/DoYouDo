import { useEffect, useState } from 'react';
import { getPortfolioByIdApi } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetPortfolioById = () => {
    const [loading, setLoading] = useState(false);
    const [portfolioByIdData, setPortfolioByIdData] = useState(null);
    const [errorText, setErrorText] = useState('');


    const getPortfolioById = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getPortfolioByIdApi(id); // Make the API request
            setPortfolioByIdData(response); // Set the fetched data
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getPortfolioById, loading, portfolioByIdData, errorText };
};
