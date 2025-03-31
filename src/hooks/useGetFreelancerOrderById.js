import { useEffect, useState } from 'react';
import { getFreelancerOrderById2 } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetFreelancerOrderById = () => {
    const [loading, setLoading] = useState(false);
    const [freelancerOrderByIddData, setFreelancerOrderByIddData] = useState(null);
    const [errorText, setErrorText] = useState('');


    const getFreelancerOrderById = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getFreelancerOrderById2(id); // Make the API request
            setFreelancerOrderByIddData(response); // Set the fetched data
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getFreelancerOrderById, loading, freelancerOrderByIddData, errorText };
};
