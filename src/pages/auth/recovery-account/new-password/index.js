import React, {useState} from 'react';
import '../../../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {PasswordShowIcon} from "@/components/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/components/icons/PasswordCloseIcon";
import {useRouter} from "next/router";


const RecoveryAccountNewPasswordModal = ({isActive, onClose}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [code, setCode] = useState('');


    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    const router = useRouter();
    const handleNavigateToLogin = () => {
        router.push('/login');
    };
    return (
        <div className='recovery_account_modal'>
            <div className='recovery_account_modal_wrapper'>
                {/*<button*/}
                {/*    className='recovery_account_modal_close_btn'*/}
                {/*    onClick={() => {*/}
                {/*        onClose()*/}
                {/*        enableBodyScroll()*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <FilterCloseIcon/>*/}
                {/*</button>*/}

                <h1 className='recovery_account_modal_title2'>Восстановление аккаунта</h1>
                <p className='recovery_account_modal_info'>Придумайте сложный пароль,содержащий
                    строчные и прописные буквы,а так же цифры и символы</p>

                <div className='recovery_account_modal_item'>
                    <div className='recovery_account_modal_item_input_wrapper2' >
                        <input
                            type={isNewPasswordVisible ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder='Новый пароль'
                            className='recovery_account_modal_item_input_field'
                        />
                        <button className='password_icon_btn' onClick={toggleNewPasswordVisibility}>
                            {isNewPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                        </button>
                    </div>
                    <div className='recovery_account_modal_item_input_wrapper2' >
                        <input
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder='Повторите пароль'
                            className='recovery_account_modal_item_input_field'
                        />
                        <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                            {isConfirmPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                        </button>
                    </div>
                        <button
                            className='recovery_account_modal_button'
                            onClick={() => {
                               handleNavigateToLogin()
                            }}
                        >
                            Сохранить
                        </button>
                    </div>




            </div>

        </div>

    );
};

export default RecoveryAccountNewPasswordModal;
