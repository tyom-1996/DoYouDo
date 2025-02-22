import React, { useState, useEffect } from 'react';
import '../../../assets/css/header.css';
import { FilterCloseIcon } from '@/components/icons/FilterCloseIcon';
import { PasswordShowIcon } from '@/components/icons/PasswordShowIcon';
import { PasswordCloseIcon } from '@/components/icons/PasswordCloseIcon';
import { SocialNetworkIcon1 } from '@/components/icons/SocialNetworkIcon1';
import { SocialNetworkIcon2 } from '@/components/icons/SocialNetworkIcon2';
import { SocialNetworkIcon3 } from '@/components/icons/SocialNetworkIcon3';
import { useRouter } from 'next/router';
import { useLogin } from '../../../hooks/useLogin';
import withOutAuth from '../../../components/withOutAuth';

const Login = (props) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [passwordEmail, setPasswordEmail] = useState('');
    const [passwordPhone, setPasswordPhone] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { login, loading, emailErrorText, phoneNumberErrorText, passwordEmailErrorText, passwordPhoneErrorText, loginData } = useLogin();
    const [type, setType] = useState('phone');

    useEffect(() => {
        if (loginData?.token) {
            router.push('/');
            // if (loginData?.user?.active_role == 'client') {
            //      router.push('/');
            // } else {
            //     router.push('/profile/freelancer-profile');
            // }

        } else if (loginData?.message == 'Пользователь не подтвержден') {
                if (type == 'email') {
                    router.push(`/auth/register/code/${email}`);
                } else if (type == 'phone') {
                    router.push(`/auth/register/code/${phone}`);
                }
            }
    }, [loginData])


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     await login(email, phone, passwordEmail, passwordPhone, type);
    // };

    const formatPhoneNumber = (input) => {
        let onlyDigits = input.replace(/\D/g, '');

        if (onlyDigits.startsWith('7')) {
            onlyDigits = onlyDigits.substring(1);
        }

        return '+7' + onlyDigits;
    };


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    const handleNavigateToRegister = () => {
        router.push('/auth/register');
    };
    const handleNavigateToRecoveryAccount = () => {
        router.push('/auth/recovery-account');
    };
    const handleNavigateToGeneral = () => {
        router.push('/');
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (loading) return; // Prevent multiple submissions

        await login(email, phone, passwordEmail, passwordPhone, type);
    };



    return (
        <div className='login_modal'>
            <div className='login_modal_wrapper'>
                <button className='login_modal_close_btn' onClick={handleNavigateToGeneral}>
                    <FilterCloseIcon />
                </button>

                <h1 className='login_modal_title'>Вход</h1>
                <div className='login_modal_tabs_wrapper'>
                    <button
                        className={`login_modal_tab ${type === 'phone' ? 'login_modal_tab_active' : ''}`}
                        onClick={() => setType('phone')}
                    >
                        Номер телефона
                    </button>
                    <button
                        className={`login_modal_tab ${type === 'email' ? 'login_modal_tab_active' : ''}`}
                        onClick={() => setType('email')}
                    >
                        Электронная почта
                    </button>
                </div>

                {/* ✅ Wrapping inputs inside a <form> */}
                <form onSubmit={handleSubmit}>
                    {type === 'phone' && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={phone}
                                    onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                                    placeholder='Номер телефона'
                                    className='login_modal_item_input_field'
                                />
                                {phoneNumberErrorText && <p className='error_text'>{phoneNumberErrorText}</p>}
                            </div>
                            <div className='login_modal_item_input_wrapper' id='login_modal_item_input_field_password'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={passwordPhone}
                                    onChange={(event) => setPasswordPhone(event.target.value)}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                {passwordPhoneErrorText && <p className='error_text'>{passwordPhoneErrorText}</p>}
                                <button className='password_icon_btn' type="button" onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='forget_password_btn_wrapper'>
                                <button type="button" className='forget_password_btn' onClick={handleNavigateToRecoveryAccount}>
                                    Забыли пароль?
                                </button>
                            </div>
                            <button className='login_modal_button' type="submit">
                                Войти
                            </button>
                            <div className='login_modal_line'></div>
                            <div className='login_with_social_networks_wrapper'>
                                <p className='login_with_social_networks_wrapper_title'>Войти с помощью</p>
                                <div className='login_with_social_networks_links_wrapper'>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon1 />
                                    </a>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon2 />
                                    </a>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon3 />
                                    </a>
                                </div>
                            </div>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас нет аккаунта?</p>
                                <button className='login_modal_register_btn' onClick={handleNavigateToRegister} type="button">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}

                    {type === 'email' && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder='Email'
                                    className='login_modal_item_input_field'
                                />
                                {emailErrorText && <p className='error_text'>{emailErrorText}</p>}
                            </div>
                            <div className='login_modal_item_input_wrapper' id='login_modal_item_input_field_password'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={passwordEmail}
                                    onChange={(event) => setPasswordEmail(event.target.value)}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                {passwordEmailErrorText && <p className='error_text'>{passwordEmailErrorText}</p>}
                                <button className='password_icon_btn' type="button" onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='forget_password_btn_wrapper'>
                                <button type="button" className='forget_password_btn' onClick={handleNavigateToRecoveryAccount}>
                                    Забыли пароль?
                                </button>
                            </div>
                            <button className='login_modal_button' type="submit">
                                Войти
                            </button>
                            <div className='login_modal_line'></div>
                            <div className='login_with_social_networks_wrapper'>
                                <p className='login_with_social_networks_wrapper_title'>Войти с помощью</p>
                                <div className='login_with_social_networks_links_wrapper'>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon1 />
                                    </a>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon2 />
                                    </a>
                                    <a href='' className='login_with_social_networks_link'>
                                        <SocialNetworkIcon3 />
                                    </a>
                                </div>
                            </div>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас нет аккаунта?</p>
                                <button className='login_modal_register_btn' onClick={handleNavigateToRegister} type="button">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );

};


export default withOutAuth(Login)
