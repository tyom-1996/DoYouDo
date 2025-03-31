import { useState } from 'react';
import {  createReviewRequest} from '../utils/api/authApi'; // Ensure the path is correct

export const useCreateReviews = () => {
    const [loadingCreateResponse, setLoadingCreateResponse] = useState(false);
    const [createReviewData, setCreateReviewData] = useState(null);
    const [ratingErrorText, setRatingErrorText] = useState('');
    const [reviewTypeErrorText, setReviewTypeErrorText] = useState('');
    const [textErrorText, setTextErrorText] = useState('');

    const validateInputs = (rating, reviewType, reviewText) => {
        let isValid = true;

        if (!rating) {
            setRatingErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!reviewType) {
            setReviewTypeErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!reviewText) {
            setTextErrorText('Поле является обязательным.');
            isValid = false;
        }
        return isValid;
    };

    const createReview = async (clientId, id, rating, reviewType, reviewText) => {

        setRatingErrorText('');
        setReviewTypeErrorText('');
        setTextErrorText('');


        const isValid = validateInputs(rating, reviewType, reviewText);
        if (!isValid) {
            setLoadingCreateResponse(false);
            return false;
        }

        try {
            const data = await createReviewRequest(clientId, id, rating, reviewType, reviewText); // Call your API function
            setCreateReviewData(data);
            console.log(data, 'create_review____');
        } catch (error) {
        } finally {
            setLoadingCreateResponse(false);
        }
    };

    return { createReview, loadingCreateResponse, createReviewData, ratingErrorText, reviewTypeErrorText, textErrorText };
};
