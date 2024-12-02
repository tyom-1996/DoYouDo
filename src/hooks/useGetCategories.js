// import { useState, useEffect } from 'react';
//
// export const useGetCategories = () => {
//     const [loadingCategoryInfo, setLoadingCategoryInfo] = useState(false);
//     const [categoriesData, setCategoriesData] = useState(null);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//       getCategories()
//     }, []);
//
//     const getCategories = async () => {
//         setLoadingCategoryInfo(true);
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
//             const response = await fetch(`http://localhost:3007/api/categories`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': AuthStr,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });
//
//             const data = await response.json();
//             console.log(data, 'categories___')
//             console.log(response.ok, 'response.ok')
//
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to fetch notifications');
//             }
//
//             setCategoriesData(data);
//
//         } catch (err) {
//             console.error('Error fetching notifications:', err.message);
//             setError(err.message);
//         } finally {
//             setLoadingCategoryInfo(false);
//         }
//     };
//
//     return {getCategories, loadingCategoryInfo, categoriesData, error };
// };



import {useEffect, useState} from 'react';
import { getCategories2 } from '../utils/api/authApi'; // Ensure this path is correct

export const useGetCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState(null);
    const [errorText, setErrorText] = useState('');


    useEffect(()=>{
        getCategories();
    }, [])
    const getCategories = async () => {
        setLoading(true);
        setErrorText('');

        try {
            const data = await getCategories2(); // Fetch categories using API function
            setCategoriesData(data);
            console.log(data, 'categories_data___');
        } catch (error) {
            setErrorText(error || 'Error loading categories');
        } finally {
            setLoading(false);
        }
    };

    return { getCategories, loading, categoriesData, errorText };
};
