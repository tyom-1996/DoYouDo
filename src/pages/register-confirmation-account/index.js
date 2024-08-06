import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const RegisterConfirmationAccountModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [code, setCode] = useState('');

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
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
                    {/*      */}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <FilterCloseIcon/>*/}
                    {/*</button>*/}

                    <h1 className='recovery_account_modal_title2'>Подтверждение аккаунта</h1>
                    <p className='recovery_account_modal_info'>
                        Мы отправим 4-х значный код на вашу эл.почту для подтверждения личности
                    </p>

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
                                handleNavigateToLogin()
                            }}
                        >
                            Подтвердить
                        </button>
                    </div>




                </div>

            </div>

    );
};

export default RegisterConfirmationAccountModal;
