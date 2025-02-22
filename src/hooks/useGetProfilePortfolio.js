import { useEffect, useState } from 'react';
import { getProfilePortfolio2 } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetProfilePortfolio = () => {
    const [loading, setLoading] = useState(false);
    const [profilePortfolioPData, setProfilePortfolioData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1); // Total pages from the API

    const getProfilePortfolio = async ( page, limit = 10) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getProfilePortfolio2( page, limit); // Fetch orders from the API
            setProfilePortfolioData(data); // Set the data from the API
            setTotalPages(data.totalPages); // Set the total number of pages
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getProfilePortfolio,  errorText, totalPages, profilePortfolioPData };
}




