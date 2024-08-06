import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import {PasswordShowIcon} from "@/components/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/components/icons/PasswordCloseIcon";


const ChangePasswordModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const toggleOldPasswordVisibility = () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
    };
    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const redirectToPasswordSuccess = () => {
        router.push(`/password-success`);
    };

    return (
            <div className='add_phone_modal'>
                <div className='add_phone_modal_wrapper'>
                    <button
                        className='add_phone_modal_close_btn'
                        onClick={() => {
                            goBack()
                        }}
                    >
                        <FilterCloseIcon/>
                    </button>

                    <h1 className='add_phone_modal_title add_phone_modal_title3'>Изменение пароля</h1>
                    <div className='add_phone_modal_item_input_wrapper2 add_phone_modal_item_input_wrapper3'>
                        <input
                            type={isOldPasswordVisible ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                            placeholder='Старый пароль'
                            className='add_phone_modal_item_input_field'
                        />
                        <button className='password_icon_btn' onClick={toggleOldPasswordVisibility}>
                            {isOldPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                        </button>
                    </div>
                    <div className='add_phone_modal_item_input_wrapper2 add_phone_modal_item_input_wrapper4'>
                        <input
                            type={isNewPasswordVisible ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder='Новый пароль'
                            className='add_phone_modal_item_input_field'
                        />
                        <button className='password_icon_btn' onClick={toggleNewPasswordVisibility}>
                            {isNewPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                        </button>
                    </div>
                    <div className='add_phone_modal_item_input_wrapper2 add_phone_modal_item_input_wrapper5'>
                        <input
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder='Повторите пароль'
                            className='add_phone_modal_item_input_field'
                        />
                        <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                            {isConfirmPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                        </button>
                    </div>
                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                            redirectToPasswordSuccess()

                        }}
                    >
                        Сохранить
                    </button>



                </div>

            </div>

    );
};

export default ChangePasswordModal;
