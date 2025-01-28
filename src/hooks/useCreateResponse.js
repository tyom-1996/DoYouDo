import { useState } from 'react';
import {  createResponseRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useCreateResponse = () => {
    const [loadingCreateResponse, setLoadingCreateResponse] = useState(false);
    const [createResponseData, setCreateResponseData] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [responseErrorText, setResponseErrorText] = useState('');
    const [priceErrorText, setPriceErrorText] = useState('');
    const [dateErrorText, setDateErrorText] = useState('');
    const [balanceErrorText, setBalanceErrorText] = useState('');

    const validateInputs = (responseText, price, date) => {
        let isValid = true;

        if (!responseText) {
            setResponseErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!price) {
            setPriceErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!date) {
            setDateErrorText('Поле является обязательным.');
            isValid = false;
        }
        return isValid;
    };

    const createResponse = async (id, responseText, price, date) => {

        setLoadingCreateResponse(true);
        setDateErrorText('');
        setPriceErrorText('');
        setResponseErrorText('');
        setErrorText('');

        const isValid = validateInputs(responseText, price, date);
        if (!isValid) {
            setLoadingCreateResponse(false);
            return false;
        }

        try {
            const data = await createResponseRequest(id, responseText, price, date); // Call your API function
            setCreateResponseData(data);
            console.log(data, 'create_responce____');
        } catch (error) {
            if (error.message === 'Недостаточно доступных откликов для создания') {
                setBalanceErrorText('Недостаточно доступных откликов для создания');
            } else {
                 setBalanceErrorText('')
            }
            setErrorText(error );
        } finally {
            setLoadingCreateResponse(false);
        }
    };

    return { createResponse, loadingCreateResponse, createResponseData,balanceErrorText, errorText, responseErrorText, priceErrorText, dateErrorText };
};
