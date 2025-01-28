import { useState } from 'react';
import { makeFiltersSave2 } from '../utils/api/authApi'; // Ensure the path is correct

export const useFiltersSave = () => {
    const [loadingAddFavorites, setLoadingAddFavorites] = useState(false);
    const [filtersSaveData, setFiltersSaveData] = useState(null);
    const [errorText, setErrorText] = useState('');

    const makeFiltersSave = async (filterData) => {
        setLoadingAddFavorites(true);
        setErrorText('');

        try {
            // Call the API function with the filter data
            const data = await makeFiltersSave2(filterData);
            setFiltersSaveData(data);
            console.log(data, 'Filters saved successfully');
        } catch (error) {
            console.log(error, 'Error while saving filters');
            setErrorText(error);
        } finally {
            setLoadingAddFavorites(false);
        }
    };

    return { makeFiltersSave, loadingAddFavorites, filtersSaveData, errorText };
};
