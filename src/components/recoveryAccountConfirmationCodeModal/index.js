import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '../icons/FilterCloseIcon'
import RecoveryAccountNewPasswordModal from "@/components/recoveryAccountNewPasswordModal";


const RecoveryAccountConfirmationCodeModal = ({isActive, onClose}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [showRecoveryAccountNewPasswordModal, setShowRecoveryAccountNewPasswordModal] = useState(false);
    const [code, setCode] = useState('');



    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    if (!isActive) {
        return null
    }
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
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

                    <h1 className='recovery_account_modal_title2'>Восстановление аккаунта</h1>
                    <p className='recovery_account_modal_info'>Мы отправим 4-х значный код на вашу эл.почту для подтверждения личности</p>

                    <div className='recovery_account_modal_item'>
                        <div className='recovery_account_modal_item_input_wrapper'>
                            <input
                                type="number"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="Код подтверждения"
                                className='recovery_account_modal_item_input_field'
                            />
                        </div>
                        <button
                            className='recovery_account_modal_button'
                            onClick={() => {
                                setShowRecoveryAccountNewPasswordModal(true)
                                disableBodyScroll()
                            }}
                        >
                            Подтвердить
                        </button>
                    </div>




                </div>

            </div>
            <RecoveryAccountNewPasswordModal
                isActive={showRecoveryAccountNewPasswordModal}
                onClose={() => {
                    setShowRecoveryAccountNewPasswordModal(false);
                }}
            />
        </div>

    );
};

export default RecoveryAccountConfirmationCodeModal;
