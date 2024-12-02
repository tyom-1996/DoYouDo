import { useState } from 'react';
import { getSelectedFreelancers2 } from '../utils/api/authApi';

export const useGetSelectedFreelancers = () => {
    const [loadingSelectedFreelancers, setLoadingSelectedFreelancers] = useState(false);
    const [selectedFreelancersData, setSelectedFreelancersData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const getSelectedFreelancers = async (id) => {
        setLoadingSelectedFreelancers(true);
        setErrorText('');

        try {
            const data = await getSelectedFreelancers2(id);
            console.log(data, 'selected_freelancers___')
            setSelectedFreelancersData(data);
        } catch (error) {
            setErrorText(error?.message || 'Error loading selected freelancers');
        } finally {
            setLoadingSelectedFreelancers(false);
        }
    };

    return { getSelectedFreelancers, loadingSelectedFreelancers, selectedFreelancersData, errorText };
};
