// Updated useGetClientOrders Hook
import { useEffect, useState } from 'react';
import { getFreelancerResponses2 } from '../utils/api/authApi'; // Ensure the correct path

export const useGetFreelancerResponses = () => {
    const [loading, setLoading] = useState(false);
    const [freelancerResponsesData, setFreelancerResponsesData] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getFreelancerResponses = async (page = 1, limit = 10, status = null) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getFreelancerResponses2(page, limit, status);
            setFreelancerResponsesData(data?.data || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            setErrorText(error.message || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getFreelancerResponses, loading, freelancerResponsesData, errorText, totalPages };
};
