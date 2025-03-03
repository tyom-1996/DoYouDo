import { useState } from 'react';
import { updatePortfolioById2 } from '../utils/api/authApi';

export const useUpdatePortfolioById = () => {
    const [loading, setLoading] = useState(false);
    const [updatePortfolioByIdData, setUpdatePortfolioByIdData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const updatePortfolioById = async (id, projectName, categoryId, description, images) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await updatePortfolioById2(id, projectName, categoryId, description, images);
            setUpdatePortfolioByIdData(response);
        } catch (error) {
            setErrorText(error || 'Ошибка обновления портфолио');
        } finally {
            setLoading(false);
        }
    };

    return { updatePortfolioById, loading, updatePortfolioByIdData, errorText };
};
