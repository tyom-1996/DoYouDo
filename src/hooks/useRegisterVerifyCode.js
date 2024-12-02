import { useState } from 'react';
import { verifyRegisterCode } from '../utils/api/authApi';

export const useRegisterVerifyCode = () => {
    const [loading, setLoading] = useState(false);
    const [codeErrorText, setCodeErrorText] = useState('');
    const [loginData, setLoginData] = useState(null);

    const registerVerifyCode = async (email, phone, code) => {
        setCodeErrorText('');
        setLoading(true);

        try {
            // Validation for the code input
            if (!code) {
                setCodeErrorText('Поле является обязательным.');
                return false;
            }

            // Call the API function to verify the code
            const data = await verifyRegisterCode(email, phone, code);
            setLoginData(data); // Store the result if successful
            return true;
        } catch (error) {
            if (error.message === 'Неверный код подтверждения') {
                setCodeErrorText('Неверный код подтверждения');
            } else {
                setCodeErrorText(error.message || 'Ошибка при входе');
            }
            return false;
        } finally {
            setLoading(false); // Always stop loading after request
        }
    };

    return { registerVerifyCode, loading, codeErrorText, loginData };
};
