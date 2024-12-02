import React, {useState, useEffect} from 'react';
import '../../../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import { useRegisterVerifyCode } from '../../../../hooks/useRegisterVerifyCode';
import withOutAuth from '../../../../components/withOutAuth';
// Your getServerSideProps function
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

// Code Component

const RegisterConfirmationAccountModal = ({paramsEmail, phoneNumber}) => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { registerVerifyCode, loading, codeErrorText, loginData } = useRegisterVerifyCode();

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
        if (loginData) {
            router.push(`/auth/login`);
        }
    }, [loginData]);

    const handleCodeVerify = async (e) => {
        console.log(email, phone, 'phone+email')
        e.preventDefault();
        await registerVerifyCode(email ? email : null, phone ? phone : null, code);
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

export default  withOutAuth(RegisterConfirmationAccountModal);
