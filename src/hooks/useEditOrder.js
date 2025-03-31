import { useState } from 'react';
import { editOrderRequest } from '../utils/api/authApi'; // Ensure the path is correct

export const useEditOrder = () => {
    const [loadingMakeOrder, setLoadingMakeOrder] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const editOrder = async (
        id,
        categoryId,
        selectedSubCategoryId,
        selectedPlace2,
        address,
        latitude,
        longitude,
        heading,
        description,
        price,
        selectedStartDate,
        selectedEndDate,
        images,
        files
    ) => {
        setLoadingMakeOrder(true);
        setErrorText('');

        try {
            const data = await editOrderRequest(
                id,
                categoryId,
                selectedSubCategoryId,
                selectedPlace2,
                address,
                latitude,
                longitude,
                heading,
                description,
                price,
                selectedStartDate,
                selectedEndDate,
                images,
                files
            );
            setEditOrderData(data);
            console.log(data, 'edit_order_data___');
        } catch (error) {
            console.log(error, '------');
            setErrorText(error);
        } finally {
            setLoadingMakeOrder(false);
        }
    };

    return { editOrder, loadingMakeOrder, editOrderData, errorText };
};
