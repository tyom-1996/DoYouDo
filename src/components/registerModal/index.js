import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { FilterCloseIcon } from '../icons/FilterCloseIcon';
import { PasswordShowIcon } from '../icons/PasswordShowIcon';
import { PasswordCloseIcon } from '../icons/PasswordCloseIcon';
import RegisterConfirmationAccountModal from "@/components/registerConfirmationAccountModal";
import LoginModal from "@/components/loginModal";

const RegisterModal = ({ isActive, onClose }) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterConfirmationAccountModal, setShowRegisterConfirmationAccountModal] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    useEffect(() => {
        if (isActive || showLoginModal) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    }, [isActive, showLoginModal]);

    if (!isActive) {
        return null;
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
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

                    <h1 className='login_modal_title'>Регистрация</h1>
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
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder='Имя Фамилия'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder='Номер телефона'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper3 register_modal_item_input_wrapper'>
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
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper4 register_modal_item_input_wrapper'>
                                <input
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder='Повторите пароль'
                                    className='login_modal_item_input_field'
                                />
                                <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                                    {isConfirmPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={() => {
                                    setShowRegisterConfirmationAccountModal(true)
                                }}
                            >
                                Зарегистрироваться
                            </button>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас есть аккаунт?</p>
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                        setShowLoginModal(true)
                                    }}
                                >
                                    Войти
                                </button>
                            </div>
                        </div>



                    )}
                    {showEmailPart && (
                        <div className='login_modal_item'>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder='Имя Фамилия'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper register_modal_item_input_wrapper' >
                                <input
                                    type='text'
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder='Электронная почта'
                                    className='login_modal_item_input_field'
                                />
                            </div>
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper3 register_modal_item_input_wrapper'>
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
                            <div className='login_modal_item_input_wrapper login_modal_item_input_wrapper4 register_modal_item_input_wrapper'>
                                <input
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder='Повторите пароль'
                                    className='login_modal_item_input_field'
                                />
                                <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                                    {isConfirmPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                                </button>
                            </div>
                            <button
                                className='login_modal_button'
                                onClick={() => {
                                    setShowRegisterConfirmationAccountModal(true)

                                }}
                            >
                                Зарегистрироваться
                            </button>
                            <div className='login_modal_register_info_btn_wrapper'>
                                <p className='login_modal_register_info'>У вас есть аккаунт?</p>
                                <button
                                    className='login_modal_register_btn'
                                    onClick={() => {
                                        setShowLoginModal(true)
                                    }}
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <LoginModal
                isActive={showLoginModal}
                onClose={() => {
                    setShowLoginModal(false);
                }}
            />
            <RegisterConfirmationAccountModal
                isActive={showRegisterConfirmationAccountModal}
                onClose={() => {
                    setShowRegisterConfirmationAccountModal(false);
                }}
            />
        </div>
    );
};

export default RegisterModal;
