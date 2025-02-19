import { useState } from 'react';
import {  makeOrderRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useMakeOrder = () => {
    const [loadingMakeOrder, setLoadingMakeOrder] = useState(false);
    const [makeOrderData, setMakeOrderData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const makeOrder = async (categoryId, type, address, latitude, longitude, title, description, price, startDate, endDate, photos, files) => {
        setLoadingMakeOrder(true);
        setErrorText('');

        try {
            const data = await makeOrderRequest(categoryId, type, address, latitude, longitude, title, description, price, startDate, endDate, photos, files); // Call your API function
            setMakeOrderData(data);
            console.log(data, 'make_order_data___');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error?.message );
        } finally {
            setLoadingMakeOrder(false);
        }
    };

    return { makeOrder, loadingMakeOrder, makeOrderData, errorText };
};
