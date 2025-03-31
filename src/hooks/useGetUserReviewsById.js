import { useEffect, useState } from 'react';
import { getUserReviewsById2 } from '../utils/api/authApi'; // Adjust the path based on your project structure

export const useGetUserReviewsById = (id) => {
    const [loading, setLoading] = useState(false);
    const [userReviewsByIdData, setUserReviewsByIdData] = useState(null);
    const [errorText, setErrorText] = useState('');



    const getUserReviewsById = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const response = await getUserReviewsById2(id); // Make the API request
            setUserReviewsByIdData(response); // Set the fetched data
            console.log(response, 'get_user_reviews')
        } catch (error) {
            setErrorText(error || 'Error loading order data');
        } finally {
            setLoading(false);
        }
    };

    return { getUserReviewsById, loading, userReviewsByIdData, errorText };
};
