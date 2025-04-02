import { useState } from 'react';
import { changeStatusOfOrder2 } from '../utils/api/authApi'; // Ensure the path is correct

export const useChangeStatusOfOrder = () => {
    const [changeStatusOfOrderData, setChangeStatusOfOrderData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const changeStatusOfOrder = async (orderId, status) => {
        setErrorText('');
        try {
            // If your API expects an object for status, e.g. { newStatus: 'closed' }
            const data = await changeStatusOfOrder2(orderId, status);
            setChangeStatusOfOrderData(data);
        } catch (error) {
            console.log(error, '------');
            setErrorText(error);
        }
    };

    return { changeStatusOfOrder, changeStatusOfOrderData, errorText };
};
