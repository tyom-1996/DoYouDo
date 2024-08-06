import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const RecoveryAccountConfirmationCodeModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [code, setCode] = useState('');

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };
    const router = useRouter();
    const redirectToRecoveryAccountNewPassword = () => {
        router.push('/recovery-account-new-password');
    }
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
                                redirectToRecoveryAccountNewPassword()
                            }}
                        >
                            Подтвердить
                        </button>
                    </div>




                </div>

            </div>

    );
};

export default RecoveryAccountConfirmationCodeModal;
