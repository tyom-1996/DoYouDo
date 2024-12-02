import { useState } from 'react';
import {  selectFreelancerRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useSelectFreelancer = () => {
    const [loadingSelectFreelancer, setLoadingSelectFreelancer] = useState(false);
    const [selectFreelancerData, setSelectFreelancerData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const selectFreelancer = async (id, responseId) => {

        setLoadingSelectFreelancer(true);
        setErrorText('');

        console.log(id, responseId, 'id_responc_iiidiid')

        try {
            const data = await selectFreelancerRequest(id, responseId); // Call your API function
            setSelectFreelancerData(data);
            console.log(data, 'selectFreelancer_____');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingSelectFreelancer(false);
        }
    };

    return { selectFreelancer, loadingSelectFreelancer, selectFreelancerData};
};
