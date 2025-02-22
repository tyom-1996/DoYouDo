import { useState } from 'react';
import {  createProfilePortfolio2} from '../utils/api/authApi'; // Ensure the path is correct

export const useCreateProfilePortfolio = () => {
    const [loadingMakeOrder, setLoadingMakeOrder] = useState(false);
    const [createProfilePortfolioData, setCreateProfilePortfolioData] = useState(null);
    const [nameErrorText, setNameErrorText] = useState('');
    const [descriptionErrorText, setDescriptionErrorText] = useState('');
    const [categoryErrorText, setCategoryErrorText] = useState('');
    const [imagesErrorText, setImagesErrorText] = useState('');

    const validateInputs = (projectName, description, selectedSubCategoryId, formattedImages) => {
        let isValid = true;

            if (!projectName) {
                setNameErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!description) {
                setDescriptionErrorText('Поле является обязательным.');
                isValid = false;
            }
        if (!selectedSubCategoryId) {
            setCategoryErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (formattedImages.length == 0) {
            setImagesErrorText('Поле является обязательным.');
            isValid = false;
        }
        return isValid;
    };
    const createProfilePortfolio  = async (projectName, description, selectedSubCategoryId, formattedImages) => {
        setLoadingMakeOrder(true);
        setImagesErrorText('');
        setNameErrorText('');
        setDescriptionErrorText('');
        setCategoryErrorText('')

        const isValid = validateInputs(projectName, description, selectedSubCategoryId, formattedImages);
        if (!isValid) {
            return false;
        }

        try {
            const data = await createProfilePortfolio2(projectName, description, selectedSubCategoryId, formattedImages); // Call your API function
            setCreateProfilePortfolioData(data);
            console.log(data, 'make_order_data___');
        } catch (error) {
            console.log(error, '------')
        } finally {
            setLoadingMakeOrder(false);
        }
    };

    return { createProfilePortfolio, createProfilePortfolioData, nameErrorText, descriptionErrorText, categoryErrorText, imagesErrorText };
};
