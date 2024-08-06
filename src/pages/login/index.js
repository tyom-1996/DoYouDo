import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { FilterCloseIcon } from '@/components/icons/FilterCloseIcon';
import { PasswordShowIcon } from '@/components/icons/PasswordShowIcon';
import { PasswordCloseIcon } from '@/components/icons/PasswordCloseIcon';
import { SocialNetworkIcon1 } from '@/components/icons/SocialNetworkIcon1';
import { SocialNetworkIcon2 } from '@/components/icons/SocialNetworkIcon2';
import { SocialNetworkIcon3 } from '@/components/icons/SocialNetworkIcon3';
import { useRouter } from 'next/router';


export default function Login(props) {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    const handleNavigateToRegister = () => {
        router.push('/register');
    };
    const handleNavigateToRecoveryAccount = () => {
        router.push('/recovery-account');
    };
    const handleNavigateToGeneral = () => {
        router.push('/');
    };
    const handleNavigateToProfile = () => {
        router.push('/freelancer-profile');
    };

    return (
            <div className='login_modal'>
                <div className='login_modal_wrapper'>
                    <button
                        className='login_modal_close_btn'
                        onClick={() => {
                            handleNavigateToGeneral()
                        }}
                    >
                        <FilterCloseIcon />
                    </button>

                    <h1 className='login_modal_title'>Вход</h1>
                    <div className='login_modal_tabs_wrapper'>
                        <button
                            className={`login_modal_tab ${showPhonePart ? 'login_modal_tab_active' : ''}`}
                            onClick={() => {
                                setShowPhonePart(true);
                                setShowEmailPart(false);
                            }}
                        >
                            Номер телефона
                        </button>
                        <button
                            className={`login_modal_tab ${showEmailPart ? 'login_modal_tab_active' : ''}`}
                            onClick={() => {
                                setShowPhonePart(false);
                                setShowEmailPart(true);
                            }}
                        >
                            Электронная почта
                        </button>
                    </div>

                    {showPhonePart && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder='Номер телефона'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper' id='login_modal_item_input_field_password'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                <button className='password_icon_btn' onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='forget_password_btn_wrapper'>
                                <button
                                    className='forget_password_btn'
                                    onClick={() => {
                                        handleNavigateToRecoveryAccount()
                                    }}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={() => {
                                    handleNavigateToProfile()
                                }}
                            >
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
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                       handleNavigateToRegister()
                                    }}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}
                    {showEmailPart && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder='Email'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper' id='login_modal_item_input_field_password'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder='Пароль'
                                    className='login_modal_item_input_field'
                                />
                                <button className='password_icon_btn' onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <div className='forget_password_btn_wrapper'>
                                <button
                                    className='forget_password_btn'
                                    onClick={() => {
                                        handleNavigateToRecoveryAccount()
                                    }}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={() => {
                                    handleNavigateToProfile()
                                }}
                            >
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
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                        handleNavigateToRegister()
                                    }}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};


