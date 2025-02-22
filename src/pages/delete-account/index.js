import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {SuccessIcon} from '@/components/icons/SuccessIcon'
import {useRouter} from "next/router";


const DeleteAccountModal = ({}) => {

    const router = useRouter();


    const redirectToSettings = () => {
        router.back()
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

                    <h1 className='add_phone_modal_title'>
                        Вы действительно хотите
                        удалить ваш аккаунт
                    </h1>
                    <p className='add_phone_modal_info'>После удаления аккаунт будет больше недоступен</p>

                    <button
                        className='add_phone_modal_button'
                        // onClick={() => {
                        //     redirectToSettings()
                        // }}
                    >
                        Удалить
                    </button>
                    <button
                        className='add_phone_modal_button2'
                         onClick={() => {
                                 redirectToSettings()
                             }}
                    >
                        Отменить
                    </button>



                </div>

            </div>

    );
};

export default DeleteAccountModal;
