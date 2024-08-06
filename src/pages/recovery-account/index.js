import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const RecoveryAccountMainModal = ({isActive, onClose}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

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
    const redirectToRecoveryAccountConfirmationCode = () => {
            router.push('/recovery-account-confirmation-code');
    }

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
                            className={`recovery_account_modal_tab ${showPhonePart === true ? 'recovery_account_modal_tab_active' : ''}`}
                            onClick={() => {
                                setShowPhonePart(true)
                                setShowEmailPart(false)
                            }}
                        >
                            Номер телефона
                        </button>
                        <button
                            className={`recovery_account_modal_tab ${showEmailPart === true ? 'recovery_account_modal_tab_active' : ''}`}
                            onClick={() => {
                                setShowPhonePart(false)
                                setShowEmailPart(true)
                            }}
                        >
                            Электронная почта
                        </button>
                    </div>

                    {showPhonePart &&
                        <div className='recovery_account_modal_item'>
                            <div className='recovery_account_modal_item_input_wrapper'>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Номер телефона"
                                    className='recovery_account_modal_item_input_field'
                                />
                            </div>
                            <button
                                className='recovery_account_modal_button'
                                onClick={() => {
                                    redirectToRecoveryAccountConfirmationCode()
                                }}
                            >
                                Далее
                            </button>
                        </div>
                    }
                    {showEmailPart && (
                        <div className='recovery_account_modal_item'>
                            <div className='recovery_account_modal_item_input_wrapper'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder='Email'
                                    className='recovery_account_modal_item_input_field'
                                />
                            </div>
                            <button
                                className='recovery_account_modal_button'
                                onClick={() => {
                                    redirectToRecoveryAccountConfirmationCode()
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

export default RecoveryAccountMainModal;
