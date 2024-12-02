import apiClient from '../apiClient'; // Импортируем axios клиент с настройками

// Функция для выполнения логина
export const loginUser = async (type, email, phone, passwordEmail, passwordPhone) => {
    const body = {
        type: type,
    };

    if (type === 'email') {
        body.email = email;
        body.password = passwordEmail;
    } else if (type === 'phone') {
        body.phone = phone;
        body.password = passwordPhone;
    }

    try {
        // Выполняем запрос с помощью axios
        const response = await apiClient.post('/auth/login', body);
        return response.data; // Возвращаем данные от сервера
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
// Функция для регистрации пользователя
export const registerUser = async (body) => {
    try {
        const response = await apiClient.post('/auth/register', body);
        return response.data; // Возвращаем данные от сервера
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const verifyRegisterCode = async (email, phone, code) => {
    const body = {
        code,
        ...(email && { email }), // Add email if it exists
        ...(phone && { phone }), // Add phone if it exists
    };

    try {
        // API call to verify the code
        const response = await apiClient.post('/auth/verify-code', body);
        return response.data; // Return the API response data
    } catch (error) {
        // Improved error handling with better readability
        const errorMessage = error.response?.data?.message || 'Ошибка при подтверждении кода';
        throw new Error(errorMessage);
    }
};
export const getCategories2 = async () => {
    try {
        // Make the request with axios (no need to add token manually as it's handled by apiClient)
        const response = await apiClient.get('/categories');

        // Return the categories data from the response
        return response.data;
    } catch (error) {
        // Handle the error and throw it
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
};

export const setProfileInfo = async () => {
    try {
        // No need to manually get token; it will be handled by axios interceptors
        const response = await apiClient.get('/profile'); // axios already includes the token

        // Return the profile data from the response
        return response.data;
    } catch (error) {
        // Throw a detailed error message
        throw error.response?.data?.message || error.message;
    }
};
export const setProfilePackages = async () => {
    try {
        // Make the request with the pre-configured apiClient
        const response = await apiClient.get('/profile/packages');

        // Return the profile packages data from the response
        return response.data?.data;
    } catch (error) {
        // Handle the error and throw it for the hook to catch
        throw error.response?.data || new Error('Error fetching profile packages');
    }
};

export const setResetPassword = async (email, phone, type) => {
    try {
        let body = {};

        if (type === 'email') {
            body.email = email;
        } else if (type === 'phone') {
            body.phone = phone;
        }

        // Make the request with axios
        const response = await apiClient.post('/auth/reset-password', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw the error
        throw error.response?.data?.message || error.message;
    }
};

export const setCategories2 = async (selectedSubCategoryIds) => {
    try {
        // Make the request with axios
        const response = await apiClient.post(
            '/profile/categories',
            {
                category_ids: selectedSubCategoryIds,
            }
        );

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};
export const setNewPassword2 = async (email, phone, code, newPassword, confirmPassword) => {
    try {
        let body = {
            code,
            password: newPassword,
            confirm_password: confirmPassword,
        };

        // Add email or phone to body based on which is provided
        if (email) {
            body.email = email;
        } else if (phone) {
            body.phone = phone;
        }

        // Make the API call using the axios instance
        const response = await apiClient.post('/auth/verify-reset-code', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};




export const makeOrderRequest = async (categoryId, type, address, latitude, longitude, title, description, price, startDate, endDate, photos, files) => {
    try {
        // Create a new FormData object
        const formData = new FormData();

        // Append fields to formData
        formData.append('category_id', categoryId);
        formData.append('type', type);
        formData.append('address', address);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);

        // Append photos if they exist
        if (photos && photos.length > 0) {
            photos.forEach((photo, index) => {
                formData.append(`photos[${index}]`, {
                    uri: photo.uri,
                    type: photo.type || 'image/jpeg', // Set type if available, otherwise default to image/jpeg
                    name: photo.name || `photo_${index}.jpg`, // Set name if available, otherwise default name
                });
            });
        }

        // Append files if they exist
        if (files && files.length > 0) {
            files.forEach((file, index) => {
                formData.append(`files[${index}]`, {
                    uri: file.uri,
                    type: file.type || 'application/octet-stream', // Set type if available, otherwise default to binary data
                    name: file.name || `file_${index}`, // Set name if available, otherwise default name
                });
            });
        }

        // Make the API call using the axios instance with formData
        const response = await apiClient.post('/orders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for formData
            },
        });

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw the specific error message or general error
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Error creating order:', errorMessage);
        throw new Error(errorMessage);
    }
};


// export const getOrders2 = async (body = {}, page = 1, limit) => {
//     try {
//         // Make the request with axios
//         // const response = await apiClient.post('/orders/search', {
//         //     page, // Send the current page to the backend
//         // });
//
//         const response = await apiClient.post(
//             '/orders/search', // URL для запроса
//             body,
//             { // Конфигурация запроса
//                 params: { // GET-параметры
//                     page: page,
//                     limit: limit,
//                 },
//             }
//         );
//
//
//         // Return the response data
//         return response.data;
//     } catch (error) {
//         // Handle and rethrow the error
//         throw error.response?.data || error.message;
//     }
// };

export const getOrders2 = async (body = {}, page = 1, limit = 10) => {
    try {
        // Send POST request with filter body and GET parameters (page and limit)
        const response = await apiClient.post(
            '/orders/search',
            body,
            {
                params: {
                    page: page,
                    limit: limit,
                },
            }
        );
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data || error.message; // Handle and rethrow the error
    }
};


export const getOrderByIdApi = async (id) => {
    try {
        // Make a GET request to fetch order by ID
        const response = await apiClient.get(`/orders/${id}`);
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};

export const getSelectedFreelancers2 = async (id) => {
    try {
        const response = await apiClient.get(`/orders/${id}/freelancer`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



export const createResponseRequest = async (id, responseText, price, date) => {
    try {
        // Make the request with axios
        const response = await apiClient.post(
            '/orders/responses',
            {
                order_id: id,
                response_text: responseText,
                price: price,
                days_to_complete: date
            }
        );

        // Return the response data
        return response?.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};
export const selectFreelancerRequest = async (id, responseId) => {
    try {
        // Make the request with axios
        const response = await apiClient.post(
            '/orders/select-freelancer',
            {
                orderId: id,
                responseId: responseId
            }
        );

        console.log(id, responseId, 'id_responc_iiidiid1111')
        // Return the response data
        return response?.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};

export const addFavoritesRequest = async (id, responseId) => {
    try {
        // Make the request with axios
        const response = await apiClient.post(
            '/orders/favorites/add',
            {
                orderId: id,
                freelancerId: responseId
            }
        );

        console.log(id, responseId, 'id_responc_iiidiid1111')
        // Return the response data
        return response?.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};


export const getResponsesRequest = async (id) => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
            throw new Error('No token found');
        }

        // Make a GET request with the token in the Authorization header
        const response = await apiClient.get(`/orders/${id}/responses`, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token
            }
        });

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and rethrow the error
        throw error.response?.data || error.message;
    }
};