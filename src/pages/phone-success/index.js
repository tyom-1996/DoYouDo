import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {SuccessIcon} from '@/components/icons/SuccessIcon'
import {useRouter} from "next/router";


const PhoneSuccessModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    const redirectToSettings = () => {
        router.push(`/freelancer-profile-settings`);
    };


    return (
            <div className='add_phone_modal'>
                <div className='add_phone_modal_wrapper'>
                    {/*<button*/}
                    {/*    className='add_phone_modal_close_btn'*/}
                    {/*    onClick={() => {*/}
                    {/*        goBack()*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <FilterCloseIcon/>*/}
                    {/*</button>*/}
                    <div className='add_phone_modal_icon'>
                        <SuccessIcon/>
                    </div>

                    <h1 className='add_phone_modal_title add_phone_modal_title2'>Ваш телефонный номер
                        успешно изменен</h1>

                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                            redirectToSettings()
                        }}
                    >
                        Закрыть
                    </button>



                </div>

            </div>

    );
};

export default PhoneSuccessModal;
