import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '../icons/FilterCloseIcon'
import RecoveryAccountConfirmationCodeModal from "@/components/recoveryAccountConfirmationCodeModal";


const RecoveryAccountMainModal = ({isActive, onClose}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showRecoveryAccountConfirmationCodeModal, setShowRecoveryAccountConfirmationCodeModal] = useState(false);



    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };
    if (!isActive) {
        return null
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    return (
        <div style={{width: '100%'}}>
            <div className='recovery_account_modal'>
                <div className='recovery_account_modal_wrapper'>
                    <button
                        className='recovery_account_modal_close_btn'
                        onClick={() => {
                            onClose()
                            enableBodyScroll()
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
                                    setShowRecoveryAccountConfirmationCodeModal(true)
                                    disableBodyScroll()
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
                                    setShowRecoveryAccountConfirmationCodeModal(true)
                                    disableBodyScroll()
                                }}
                            >
                                Далее
                            </button>

                        </div>
                    )}



                </div>

            </div>
            <RecoveryAccountConfirmationCodeModal
                isActive={showRecoveryAccountConfirmationCodeModal}
                onClose={() => {
                    setShowRecoveryAccountConfirmationCodeModal(false);
                }}
            />
        </div>


    );
};

export default RecoveryAccountMainModal;
