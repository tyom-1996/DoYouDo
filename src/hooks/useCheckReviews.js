import { useEffect, useState } from 'react';
import { checkReviews2 } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useCheckReviews = (id) => {
    const [loading, setLoading] = useState(false);
    const [checkReviewsData, setCheckReviewsData] = useState(null);
    const [errorText, setErrorText] = useState('');



    const checkReviews = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await checkReviews2(id); // Make the API request
            setCheckReviewsData(response); // Set the fetched data
            console.log(response, 'get_user_reviews')
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { checkReviews, loading, checkReviewsData, errorText };
};
