import { useEffect, useState } from 'react';
import { getFreelancers2 } from '../utils/api/authApi';

export const useGetFreelancers = () => {
    const [loading, setLoading] = useState(false);
    const [freelancersData, setFreelancersData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getFreelancers = async (filters = {}, page = 1, limit = 10) => {
        setLoading(true);
        setErrorText('');

        try {
            const updatedFilters = { ...filters };

            if (!filters.lat || !filters.lng) {
                delete updatedFilters.lat;
                delete updatedFilters.lng;
            }

            const data = await getFreelancers2(updatedFilters, page, limit);
            console.log(data, 'freelancers data');
            setFreelancersData(data);
            setTotalPages(Math.ceil(data.total / limit));
        } catch (error) {
            setErrorText(error || 'Error loading freelancers');
        } finally {
            setLoading(false);
        }
    };


    return { getFreelancers, loading, freelancersData, errorText, totalPages };
};

