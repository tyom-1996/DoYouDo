import React, {useState, useEffect} from 'react';
import '../../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import { useResetPassword } from '../../../hooks/useResetPassword';
import withOutAuth from '../../../components/withOutAuth';
const RecoveryAccountMainModal = ({isActive, onClose}) => {
    const [type, setType] = useState('phone');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const {resetPassword,resetPasswordData, loading, emailErrorText, phoneErrorText } = useResetPassword();


    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    useEffect(() => {
        if (resetPasswordData) {
            if (type == 'email') {
                localStorage.setItem('email', email);
                router.push(`/auth/recovery-account/code/${email}`);
            } else if (type == 'phone') {
                localStorage.setItem('phone', phone);
                router.push(`/auth/recovery-account/code/${phone}`);
            }
        }
    }, [resetPasswordData]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        await resetPassword(email, phone, type);

    };
    return (
        <div style={{width: '100%'}}>
            <div className='recovery_account_modal'>
                <div className='recovery_account_modal_wrapper'>
                    <button
                        className='recovery_account_modal_close_btn'
                        onClick={() => {
                           goBack()
                        }}
                    >
                        <FilterCloseIcon/>
                    </button>

                    <h1 className='recovery_account_modal_title'>Восстановление аккаунта</h1>
                    <div className="recovery_account_modal_tabs_wrapper">
                        <button
                            className={`recovery_account_modal_tab ${type == 'phone' ? 'recovery_account_modal_tab_active' : ''}`}
                            onClick={() => {
                                setType('phone')
                            }}
                        >
                            Номер телефона
                        </button>
                        <button
                            className={`recovery_account_modal_tab ${type == 'email' ? 'recovery_account_modal_tab_active' : ''}`}
                            onClick={() => {
                                setType('email')
                            }}
                        >
                            Электронная почта
                        </button>
                    </div>

                    {type == 'phone' &&
                        <div className='recovery_account_modal_item'>
                            <div className='recovery_account_modal_item_input_wrapper'>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(event) => {
                                        setPhone(event.target.value)
                                    }}
                                    placeholder="Номер телефона"
                                    className='recovery_account_modal_item_input_field'
                                />
                                {phoneErrorText &&
                                    <p className='error_text'>{phoneErrorText}</p>
                                }
                            </div>
                            <button
                                className='recovery_account_modal_button'
                                onClick={(e) => {
                                    handleResetPassword(e)
                                }}
                            >
                                Далее
                            </button>
                        </div>
                    }
                    {type == 'email' && (
                        <div className='recovery_account_modal_item'>
                            <div className='recovery_account_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                    placeholder='Email'
                                    className='recovery_account_modal_item_input_field'
                                />
                                {emailErrorText &&
                                    <p className='error_text'>{emailErrorText}</p>
                                }
                            </div>
                            <button
                                className='recovery_account_modal_button'
                                onClick={(e) => {
                                    handleResetPassword(e)
                                }}
                            >
                                Далее
                            </button>

                        </div>
                    )}



                </div>

            </div>

        </div>


    );
};

export default  withOutAuth(RecoveryAccountMainModal);
