// import { useState, useEffect } from 'react';
//
// export const useSetCategories = () => {
//     const [loading, setLoading] = useState(false);
//     const [categoriesInfoData2, setCategoriesInfoData2] = useState(null);
//     const [error, setError] = useState(null);
//
//
//
//     const setCategories = async (selectedSubCategoryIds) => {
//         console.log(selectedSubCategoryIds, 'selected_sub_cat')
//         setLoading(true);
//         setError(null);
//
//         try {
//             let userToken = await localStorage.getItem('token');
//             if (!userToken) {
//                 throw new Error('User token is missing');
//             }
//
//             let AuthStr = 'Bearer ' + userToken;
//
//             const response = await fetch(`http://localhost:3007/api/profile/categories`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': AuthStr,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     category_ids: selectedSubCategoryIds
//                 })
//             });
//
//             const data = await response.json();
//             console.log(data, 'profile_data')
//             console.log(response.ok, 'response.ok')
//
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to fetch notifications');
//             }
//
//             setCategoriesInfoData2(data);
//
//         } catch (err) {
//             console.error('Error fetching notifications:', err.message);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {setCategories, loading, categoriesInfoData2, error };
// };


import { useState } from 'react';
import { setCategories2 } from '../utils/api/authApi'; // Import the API function

export const useSetCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categoriesInfoData2, setCategoriesInfoData2] = useState(null);
    const [errorText, setErrorText] = useState('');

    const setCategories = async (selectedSubCategoryIds) => {
        setLoading(true);
        setErrorText('');

        try {
            const data = await setCategories2(selectedSubCategoryIds); // Call the API function
            setCategoriesInfoData2(data);
            console.log(data, 'categories_data____seeeeet');
        } catch (error) {
            // Handle error
            setErrorText(error.response?.data?.message || 'Error setting categories');
        } finally {
            setLoading(false);
        }
    };

    return { setCategories, loading, categoriesInfoData2, errorText };
};
