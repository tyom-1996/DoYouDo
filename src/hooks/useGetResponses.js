// import {useEffect, useState} from 'react';
// import { getOrders2 } from '../utils/api/authApi'; // Ensure this path is correct
//
// export const useGetOrders = () => {
//     const [loading, setLoading] = useState(false);
//     const [ordersData, setOrderData] = useState(null);
//     const [errorText, setErrorText] = useState('');
//
//
//     useEffect(()=>{
//         getOrders();
//     }, [])
//     const getOrders = async () => {
//         setLoading(true);
//         setErrorText('');
//
//         try {
//             const data = await getOrders2(); // Fetch categories using API function
//             setOrderData(data);
//             console.log(data, 'get_orders_data______');
//         } catch (error) {
//             setErrorText(error || 'Error loading categories');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return { getOrders, loading, ordersData, errorText };
// };


import { useEffect, useState } from 'react';
import { getResponsesRequest } from '../utils/api/authApi'; // Make sure this path matches your project structure

export const useGetResponses = () => {
    const [loading, setLoading] = useState(false);
    const [responsesData, setResponsesData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const getResponses = async (id) => {
        setLoading(true);
        setErrorText('');
        try {
            const data = await getResponsesRequest(id); // Fetch orders from the API
            console.log(data, 'responses_______responce')
            setResponsesData(data); // Set the data from the API
        } catch (error) {
            setErrorText(error || 'Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    return { getResponses, loading, responsesData,  };
};


