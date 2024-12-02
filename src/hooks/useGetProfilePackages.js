// import { useState, useEffect } from 'react';
//
// export const useGetProfilePackages = () => {
//     const [loadingProfilePackagesInfo, setLoadingProfilePackagesInfo] = useState(false);
//     const [profilePackagesData, setProfilePackagesData] = useState(null);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//       getProfilePackages()
//     }, []);
//
//     const getProfilePackages = async () => {
//         setLoadingProfilePackagesInfo(true);
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
//             const response = await fetch(`http://localhost:3007/api/profile/packages`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': AuthStr,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             });
//
//             const data = await response.json();
//             console.log(data, 'profile_packages_data')
//             console.log(response.ok, 'response.ok')
//
//
//
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to fetch notifications');
//             }
//
//             setProfilePackagesData(data?.data);
//
//         } catch (err) {
//             console.error('Error fetching notifications:', err.message);
//             setError(err.message);
//         } finally {
//             setLoadingProfilePackagesInfo(false);
//         }
//     };
//
//     return {getProfilePackages, loadingProfilePackagesInfo, profilePackagesData, error };
// };


import { useState, useEffect } from 'react';
import { setProfilePackages } from '../utils/api/authApi'; // Import the API function

export const useGetProfilePackages = () => {
    const [loadingProfilePackagesInfo, setLoadingProfilePackagesInfo] = useState(false);
    const [profilePackagesData, setProfilePackagesData] = useState(null);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        getProfilePackages();
    }, [])

    const getProfilePackages = async () => {
        setLoadingProfilePackagesInfo(true);
        setErrorText('');

        try {
            const data = await setProfilePackages(); // Use the API function to fetch profile packages
            setProfilePackagesData(data);

            console.log(data, 'profile_packages_data');
        } catch (error) {
            setErrorText(error.message || 'Error fetching profile packages');
        } finally {
            setLoadingProfilePackagesInfo(false);
        }
    };

    return { getProfilePackages, loadingProfilePackagesInfo, profilePackagesData, errorText };
};
