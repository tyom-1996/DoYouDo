import React, {useEffect, useState} from 'react';
import '../../../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import {useSetNewPassword} from "@/hooks/useSetNewPassword";
import {PasswordShowIcon} from "@/components/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/components/icons/PasswordCloseIcon";
import withOutAuth from '../../../../components/withOutAuth';
export async function getServerSideProps(context) {
    const {login} = context.params;

    // Determine if the login value is an email or a phone number
    const isEmail = login.includes('@'); // basic check for email format

    const paramsEmail = isEmail ? login : null;
    const phoneNumber = !isEmail ? login : null;

    return {
        props: {
            paramsEmail,
            phoneNumber
        }
    };
}

const RecoveryAccountConfirmationCodeModal = ({paramsEmail, phoneNumber}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { newPasswordSet, loading, codeErrorText, passwordErrorText, confirmPasswordErrorText, newPasswordData } = useSetNewPassword();

    useEffect(() => {
        console.log(paramsEmail, phoneNumber, 'phone_email_params')
        if (paramsEmail) {
            console.log(paramsEmail)
            setEmail(paramsEmail);
        } else if (phoneNumber) {
            setPhone(phoneNumber);
        }
    }, [paramsEmail, phoneNumber]);

    const router = useRouter();
    useEffect(() => {
        if (newPasswordData) {
            router.push(`/auth/login`);
        }
    }, [newPasswordData]);

    const handleCodeVerify = async (e) => {
        console.log(email, phone, 'phone+email')
        e.preventDefault();
        await newPasswordSet(email ? email : null, phone ? phone : null, code, newPassword, confirmPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    return (
            <div className='recovery_account_modal'>
                <div className='recovery_account_modal_wrapper'>
                    {/*<button*/}
                    {/*    className='recovery_account_modal_close_btn'*/}
                    {/*    onClick={() => {*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <FilterCloseIcon/>*/}
                    {/*</button>*/}

                    <h1 className='recovery_account_modal_title2'>Восстановление аккаунта</h1>
                    <p className='recovery_account_modal_info'>Мы отправим 4-х значный код на вашу эл.почту для подтверждения личности</p>

                    <div className='recovery_account_modal_item'>
                        <div className='recovery_account_modal_item_input_wrapper3'>
                            <input
                                type="number"
                                value={code}
                                onChange={(event) => {
                                    setCode(event.target.value)
                                }}
                                placeholder="Код подтверждения"
                                className='recovery_account_modal_item_input_field'
                            />
                            {codeErrorText &&
                                <p className='error_text'>{codeErrorText}</p>
                            }
                        </div>
                        <div className='recovery_account_modal_item_input_wrapper4' >
                            <input
                                type={isNewPasswordVisible ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(event) => {
                                    setNewPassword(event.target.value)
                                }}
                                placeholder='Новый пароль'
                                className='recovery_account_modal_item_input_field'
                            />
                            {passwordErrorText &&
                                <p className='error_text'>{passwordErrorText}</p>
                            }
                            <button className='password_icon_btn' onClick={toggleNewPasswordVisibility}>
                                {isNewPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                            </button>
                        </div>
                        <div className='recovery_account_modal_item_input_wrapper5' >
                            <input
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value)
                                }}
                                placeholder='Повторите пароль'
                                className='recovery_account_modal_item_input_field'
                            />
                            {confirmPasswordErrorText &&
                             <p className='error_text'>{confirmPasswordErrorText}</p>
                            }
                            <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                                {isConfirmPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                            </button>
                        </div>
                        <button
                            className='recovery_account_modal_button'
                            onClick={(e) => {
                                handleCodeVerify(e)
                            }}
                        >
                            Подтвердить
                        </button>
                    </div>




                </div>

            </div>

    );
};

export default  withOutAuth(RecoveryAccountConfirmationCodeModal);
