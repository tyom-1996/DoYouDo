// import { useState, useEffect } from 'react';
//
// export const useGetProfileInfo = () => {
//     const [loadingUserInfo, setLoadingUserInfo] = useState(false);
//     const [profileInfoData, setProfileInfoData] = useState(null);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//       getProfileInfo()
//     }, []);
//
//     const getProfileInfo = async () => {
//         setLoadingUserInfo(true);
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
//             const response = await fetch(`http://localhost:3007/api/profile`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': AuthStr,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
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
//             setProfileInfoData(data);
//
//         } catch (err) {
//             console.error('Error fetching notifications:', err.message);
//             setError(err.message);
//         } finally {
//             setLoadingUserInfo(false);
//         }
//     };
//
//     return {getProfileInfo, loadingUserInfo, profileInfoData, error };
// };


import { useState, useEffect } from 'react';
import { setProfileInfo } from '../utils/api/authApi'; // Import the API function

export const useGetProfileInfo = () => {
    const [loadingUserInfo, setLoadingUserInfo] = useState(false);
    const [profileInfoData, setProfileInfoData] = useState(null);
    const [errorText, setErrorText] = useState('');

    useEffect(()=>{
        getProfileInfo();
    }, [])
    const getProfileInfo = async () => {
        setLoadingUserInfo(true);
        setErrorText('');

        try {
            // Call the API function to fetch profile info
            const data = await setProfileInfo();
            setProfileInfoData(data);
            console.log(data, 'profile_data___');
        } catch (error) {
            // Handle error: set an appropriate error message
            setErrorText(error.message || 'Error fetching profile info');
        } finally {
            // Always stop loading after the request completes
            setLoadingUserInfo(false);
        }
    };

    // Return the necessary values and functions from the hook
    return { getProfileInfo, loadingUserInfo, profileInfoData, errorText };
};
