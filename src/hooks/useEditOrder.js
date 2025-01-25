import { useState } from 'react';
import {  editOrderRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useEditOrder = () => {
    const [loadingMakeOrder, setLoadingMakeOrder] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const editOrder = async (id, selectedSubCategoryId, selectedPlace, address, latitude, longitude,heading, description, price, selectedStartDate, selectedEndDate, images,files) => {
        setLoadingMakeOrder(true);
        setErrorText('');

        try {
            const data = await editOrderRequest(id, selectedSubCategoryId, selectedPlace, address, latitude, longitude,heading, description, price, selectedStartDate, selectedEndDate, images,files); // Call your API function
            setEditOrderData(data);
            console.log(data, 'make_order_data___');
        } catch (error) {
            console.log(error, '------')
            setErrorText(error );
        } finally {
            setLoadingMakeOrder(false);
        }
    };

    return { editOrder, loadingMakeOrder, editOrderData, errorText };
};
