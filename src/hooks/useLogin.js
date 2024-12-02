// import { useState } from 'react';
//
// export const useLogin = () => {
//
//     const [loading, setLoading] = useState(false);
//     const [emailErrorText, setEmailErrorText] = useState('');
//     const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
//     const [passwordEmailErrorText, setPasswordEmailErrorText] = useState('');
//     const [passwordPhoneErrorText, setPasswordPhoneErrorText] = useState('');
//     const [loginData, setLoginData] = useState(null);
//
//     const validateInputs = (email, phoneNumber, passwordEmail, passwordPhone, type) => {
//         let isValid = true;
//
//
//         if (type === 'phone') {
//             if (!phoneNumber) {
//                 setPhoneNumberErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!passwordPhone) {
//                 setPasswordPhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//         } else if (type === 'email') {
//             if (!email) {
//                 setEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!passwordEmail) {
//                 setPasswordEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//         }
//
//
//         return isValid;
//     };
//     const login = async (email, phoneNumber, passwordEmail, passwordPhone, type) => {
//         setLoading(true);
//         setEmailErrorText('');
//         setPhoneNumberErrorText('');
//         setPasswordEmailErrorText('');
//         setPasswordPhoneErrorText('');
//
//         // Отладочная информация
//
//         const isValid = validateInputs(email, phoneNumber, passwordEmail, passwordPhone, type);
//         if (!isValid) {
//             setLoading(false);
//             return false;
//         }
//
//         let body = {
//             type: type
//         };
//
//         if (type === "email") {
//             body.email = email;
//             body.password = passwordEmail;
//         } else if (type === "phone") {
//             body.phone = phoneNumber;
//             body.password = passwordPhone
//         }
//
//         try {
//             const response = await fetch('http://localhost:3007/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });
//
//             const data = await response.json();
//             console.log(data, 'response______________-');
//
//             if (!response.ok) {
//                 setLoginData(data);
//                 if (data.message === 'Не верная почта') {
//                     setEmailErrorText('Не верная почта');
//                 } else if (data.message == 'Пользователь не подтвержден') {
//                       setEmailErrorText('Пользователь не подтвержден')
//                 } else if (data.message === 'Не верный номер телефона') {
//                     setPhoneNumberErrorText('Не верный номер телефона');
//                 } else if (data.message === 'Не верный пароль') {
//                           if (type == 'email') {
//                               setPasswordEmailErrorText('Не верный пароль');
//                           } else if (type == 'phone') {
//                               setPasswordPhoneErrorText('Не верный пароль');
//                           }
//                 } else {
//                     throw new Error(data.message || 'Login failed');
//                 }
//                 setLoading(false);
//                 return false;
//             }
//
//             setLoginData(data);
//             console.log(data, 'login_data');
//             localStorage.setItem('token', data.token); // Сохранение токена в localStorage
//         } catch (err) {
//             console.error(err.message);
//             // Обработка неожиданных ошибок
//             setEmailErrorText('Ошибка при входе');
//             setPasswordPhoneErrorText('Ошибка при входе');
//             setPasswordEmailErrorText('Ошибка при входе');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return { login, loading, emailErrorText, phoneNumberErrorText, passwordPhoneErrorText, passwordEmailErrorText, loginData };
// };



import { useState } from 'react';
import { loginUser } from '../utils/api/authApi'; // Импортируем функцию из файла API

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
    const [passwordEmailErrorText, setPasswordEmailErrorText] = useState('');
    const [passwordPhoneErrorText, setPasswordPhoneErrorText] = useState('');
    const [loginData, setLoginData] = useState(null);

    const validateInputs = (email, phoneNumber, passwordEmail, passwordPhone, type) => {
        let isValid = true;

        if (type === 'phone') {
            if (!phoneNumber) {
                setPhoneNumberErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!passwordPhone) {
                setPasswordPhoneErrorText('Поле является обязательным.');
                isValid = false;
            }
        } else if (type === 'email') {
            if (!email) {
                setEmailErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!passwordEmail) {
                setPasswordEmailErrorText('Поле является обязательным.');
                isValid = false;
            }
        }

        return isValid;
    };

    const login = async (email, phoneNumber, passwordEmail, passwordPhone, type) => {
        setLoading(true);
        setEmailErrorText('');
        setPhoneNumberErrorText('');
        setPasswordEmailErrorText('');
        setPasswordPhoneErrorText('');

        const isValid = validateInputs(email, phoneNumber, passwordEmail, passwordPhone, type);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        try {
            const data = await loginUser(type, email, phoneNumber, passwordEmail, passwordPhone); // Используем API
            setLoginData(data);


            console.log(data, 'login_data____')
            localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
            localStorage.setItem('activeRole', data?.user?.active_role); // Сохраняем токен в localStorage

        } catch (error) {
            // Обрабатываем ошибки
            if (error.message === 'Не верная почта') {
                setEmailErrorText('Не верная почта');
            } else if (error.message === 'Пользователь не подтвержден') {
                setEmailErrorText('Пользователь не подтвержден');
            } else if (error.message === 'Не верный номер телефона') {
                setPhoneNumberErrorText('Не верный номер телефона');
            } else if (error.message === 'Не верный пароль') {
                if (type === 'email') {
                    setPasswordEmailErrorText('Не верный пароль');
                } else if (type === 'phone') {
                    setPasswordPhoneErrorText('Не верный пароль');
                }
            } else {
                setEmailErrorText('Ошибка при входе');
                setPasswordPhoneErrorText('Ошибка при входе');
                setPasswordEmailErrorText('Ошибка при входе');
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, emailErrorText, phoneNumberErrorText, passwordPhoneErrorText, passwordEmailErrorText, loginData };
};
