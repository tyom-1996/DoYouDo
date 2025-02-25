import { useEffect, useState } from 'react';
import { getFreelancerById2 } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetFreelancerById = () => {
    const [loading, setLoading] = useState(false);
    const [freelancerByIdData, setFreelancerByIdData] = useState(null);
    const [errorText, setErrorText] = useState('');



    const getFreelancerById = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getFreelancerById2(id); // Make the API request
            setFreelancerByIdData(response); // Set the fetched data
            console.log(response, 'get_order_by_idd_____data')
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getFreelancerById, loading, freelancerByIdData, errorText };
};
