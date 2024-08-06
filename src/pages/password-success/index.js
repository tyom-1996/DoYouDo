import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {SuccessIcon} from '@/components/icons/SuccessIcon'
import {useRouter} from "next/router";


const PasswordSuccessModal = ({}) => {

    const router = useRouter();


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

                    <h1 className='add_phone_modal_title add_phone_modal_title2'>
                        Ваша пароль успешно изменён
                    </h1>

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

export default PasswordSuccessModal;
