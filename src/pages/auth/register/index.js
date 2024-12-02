import React, { useState, useEffect } from 'react';
import '../../../assets/css/header.css';
import { FilterCloseIcon } from '@/components/icons/FilterCloseIcon';
import { PasswordShowIcon } from '@/components/icons/PasswordShowIcon';
import { PasswordCloseIcon } from '@/components/icons/PasswordCloseIcon';
import {useRouter} from "next/router";
import { useRegister } from '../../../hooks/useRegister';
import withOutAuth from '../../../components/withOutAuth';

const RegisterModal = ({}) => {
    const [type, setType] = useState('phone');
    const [phone, setPhone] = useState('');
    const [namePhone, setNamePhone] = useState('');
    const [surnamePhone, setSurnamePhone] = useState('');
    const [nameEmail, setNameEmail] = useState('');
    const [surnameEmail, setSurnameEmail] = useState('');
    const [email, setEmail] = useState('');
    const [passwordEmail, setPasswordEmail] = useState('');
    const [passwordPhone, setPasswordPhone] = useState('');
    const [confirmPasswordEmail, setConfirmPasswordEmail] = useState('');
    const [confirmPasswordPhone, setConfirmPasswordPhone] = useState('');
    const [isPasswordEmailVisible, setIsPasswordEmailVisible] = useState(false);
    const [isPasswordPhoneVisible, setIsPasswordPhoneVisible] = useState(false);
    const [isConfirmPasswordEmailVisible, setIsConfirmPasswordEmailVisible] = useState(false);
    const [isConfirmPasswordPhoneVisible, setIsConfirmPasswordPhoneVisible] = useState(false);
    const { register, loading, emailErrorText, phoneNumberErrorText, passwordPhoneErrorText,
        passwordEmailErrorText,
        confirmPasswordPhoneErrorText,
        confirmPasswordEmailErrorText,
        nameEmailErrorText,
        namePhoneErrorText,
        surnameEmailErrorText,
        surnamePhoneErrorText,
        code, } = useRegister();

    const handleRegister = async (e) => {
        e.preventDefault();
        register(email, phone, passwordEmail, passwordPhone, type, confirmPasswordEmail, confirmPasswordPhone, nameEmail, namePhone, surnameEmail, surnamePhone);

    };

    useEffect(() => {
        if (code) {
            if (type == 'email') {
                router.push(`/auth/register/code/${email}`);
            } else if (type == 'phone') {
                router.push(`/auth/register/code/${phone}`);
            }
        }
    }, [code]);


    const togglePasswordEmailVisibility = () => {
        setIsPasswordEmailVisible(!isPasswordEmailVisible);
    };
    const togglePasswordPhoneVisibility = () => {
        setIsPasswordPhoneVisible(!isPasswordPhoneVisible);
    };
    const toggleConfirmPasswordEmailVisibility = () => {
        setIsConfirmPasswordEmailVisible(!isConfirmPasswordEmailVisible);
    };
    const toggleConfirmPasswordPhoneVisibility = () => {
        setIsConfirmPasswordPhoneVisible(!isConfirmPasswordPhoneVisible);
    };

    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    const handleNavigateToLogin = () => {
        router.push('/auth/login');
    };

    function formatPhoneNumber(input) {
        // Удаляем все символы, кроме цифр
        let onlyDigits = input.replace(/\D/g, '');

        // Если строка начинается с '7', удаляем её
        if (onlyDigits.startsWith('7')) {
            onlyDigits = onlyDigits.substring(1);
        }

        // Добавляем '+7' в начало строки
        return '+7' + onlyDigits;
    }


    return (
            <div className='login_modal'>
                <div className='login_modal_wrapper'>
                    <button
                        className='login_modal_close_btn'
                        onClick={() => {
                            goBack()
                        }}
                    >
                        <FilterCloseIcon />
                    </button>

                    <h1 className='login_modal_title'>Регистрация</h1>
                    <div className='login_modal_tabs_wrapper'>
                        <button
                            className={`login_modal_tab ${type == 'phone' ? 'login_modal_tab_active' : ''}`}
                            onClick={() => {
                                setType('phone')
                            }}
                        >
                            Номер телефона
                        </button>
                        <button
                            className={`login_modal_tab ${type == 'email' ? 'login_modal_tab_active' : ''}`}
                            onClick={() => {
                                setType('email')
                            }}
                        >
                            Электронная почта
                        </button>
                    </div>

                    {type == 'phone' && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={namePhone}
                                    onChange={(event) => {
                                        setNamePhone(event.target.value)
                                    }}
                                    placeholder='Имя'
                                    className='login_modal_item_input_field'
                                />
                                {namePhoneErrorText &&
                                    <p className='error_text'>
                                        {namePhoneErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={surnamePhone}
                                    onChange={(event) => {
                                        setSurnamePhone(event.target.value)
                                    }}
                                    placeholder='Фамилия'
                                    className='login_modal_item_input_field'
                                />
                                {surnamePhoneErrorText &&
                                    <p className='error_text'>
                                        {surnamePhoneErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={phone}
                                    onChange={(event) => {
                                        setPhone(formatPhoneNumber(event.target.value))
                                    }}
                                    placeholder='Номер телефона'
                                    className='login_modal_item_input_field'
                                />
                                {phoneNumberErrorText &&
                                    <p className='error_text'>
                                        {phoneNumberErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper3 register_modal_item_input_wrapper'>
                                <input
                                    type={isPasswordPhoneVisible ? 'text' : 'password'}
                                    value={passwordPhone}
                                    onChange={(event) => {
                                        setPasswordPhone(event.target.value)
                                    }}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                {passwordPhoneErrorText &&
                                    <p className='error_text'>
                                        {passwordPhoneErrorText}
                                    </p>
                                }
                                <button className='password_icon_btn' onClick={togglePasswordPhoneVisibility}>
                                    {isPasswordPhoneVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper4 register_modal_item_input_wrapper'>
                                <input
                                    type={isConfirmPasswordPhoneVisible ? 'text' : 'password'}
                                    value={confirmPasswordPhone}
                                    onChange={(event) => {
                                        setConfirmPasswordPhone(event.target.value)
                                    }}
                                    placeholder='Повторите пароль'
                                    className='login_modal_item_input_field'
                                />
                                {confirmPasswordPhoneErrorText &&
                                    <p className='error_text'>
                                        {confirmPasswordPhoneErrorText}
                                    </p>
                                }
                                <button className='password_icon_btn' onClick={toggleConfirmPasswordPhoneVisibility}>
                                    {isConfirmPasswordPhoneVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={(e) => {
                                    handleRegister(e)
                                }}
                            >
                                Зарегистрироваться
                            </button>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас есть аккаунт?</p>
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                        handleNavigateToLogin()
                                    }}
                                >
                                    Войти
                                </button>
                            </div>
                        </div>



                    )}
                    {type == 'email' && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={nameEmail}
                                    onChange={(event) => {
                                        setNameEmail(event.target.value)
                                    }}
                                    placeholder='Имя'
                                    className='login_modal_item_input_field'
                                />
                                {nameEmailErrorText &&
                                    <p className='error_text'>
                                        {nameEmailErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={surnameEmail}
                                    onChange={(event) => {
                                        setSurnameEmail(event.target.value)
                                    }}
                                    placeholder='Фамилия'
                                    className='login_modal_item_input_field'
                                />
                                {surnameEmailErrorText &&
                                    <p className='error_text'>
                                        {surnameEmailErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper' >
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                    placeholder='Электронная почта'
                                    className='login_modal_item_input_field'
                                />
                                {emailErrorText &&
                                    <p className='error_text'>
                                        {emailErrorText}
                                    </p>
                                }
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper3 register_modal_item_input_wrapper'>
                                <input
                                    type={isPasswordEmailVisible ? 'text' : 'password'}
                                    value={passwordEmail}
                                    onChange={(event) => {
                                        setPasswordEmail(event.target.value)
                                    }}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                {passwordEmailErrorText &&
                                    <p className='error_text'>
                                        {passwordEmailErrorText}
                                    </p>
                                }

                                <button className='password_icon_btn' onClick={togglePasswordEmailVisibility}>
                                    {isPasswordEmailVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper4 register_modal_item_input_wrapper'>
                                <input
                                    type={isConfirmPasswordEmailVisible ? 'text' : 'password'}
                                    value={confirmPasswordEmail}
                                    onChange={(event) => {
                                        setConfirmPasswordEmail(event.target.value)
                                    }}
                                    placeholder='Повторите пароль'
                                    className='login_modal_item_input_field'
                                />
                                {confirmPasswordEmailErrorText &&
                                    <p className='error_text'>
                                        {confirmPasswordEmailErrorText}
                                    </p>
                                }
                                <button className='password_icon_btn' onClick={toggleConfirmPasswordEmailVisibility}>
                                    {isConfirmPasswordEmailVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={(e) => {
                                    handleRegister(e)
                                }}
                            >
                                Зарегистрироваться
                            </button>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас есть аккаунт?</p>
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                        handleNavigateToLogin()
                                    }}
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default  withOutAuth(RegisterModal);
