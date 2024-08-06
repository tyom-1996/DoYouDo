import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { FilterCloseIcon } from '../icons/FilterCloseIcon';
import { PasswordShowIcon } from '../icons/PasswordShowIcon';
import { PasswordCloseIcon } from '../icons/PasswordCloseIcon';
import { SocialNetworkIcon1 } from '../icons/SocialNetworkIcon1';
import { SocialNetworkIcon2 } from '../icons/SocialNetworkIcon2';
import { SocialNetworkIcon3 } from '../icons/SocialNetworkIcon3';
import RecoveryAccountMainModal from "@/components/recoveryAccountMainModal";
import RegisterModal from "@/components/registerModal";

const LoginModal = ({ isActive, onClose }) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showRecoveryAccountMainModal, setShowRecoveryAccountMainModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    useEffect(() => {
        if (isActive || showRecoveryAccountMainModal) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    }, [isActive, showRecoveryAccountMainModal]);

    if (!isActive) {
        return null;
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div style={{ width: '100%' }}>
            <div className='login_modal'>
                <div className='login_modal_wrapper'>
                    <button
                        className='login_modal_close_btn'
                        onClick={() => {
                            onClose();
                            enableBodyScroll();
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
                                        setShowRecoveryAccountMainModal(true);
                                    }}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                            <button className='login_modal_button'>Войти</button>
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
                                        setShowRegisterModal(true)
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
                                        setShowRecoveryAccountMainModal(true);
                                    }}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                            <button className='login_modal_button'>Войти</button>
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
                                        setShowRegisterModal(true)
                                    }}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <RecoveryAccountMainModal
                isActive={showRecoveryAccountMainModal}
                onClose={() => {
                    setShowRecoveryAccountMainModal(false);
                }}
            />
            <RegisterModal
                isActive={showRegisterModal}
                onClose={() => {
                    setShowRegisterModal(false);
                }}
            />
        </div>
    );
};

export default LoginModal;
