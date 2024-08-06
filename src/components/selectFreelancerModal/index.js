import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const SelectFreelancerModal = ({isActive, onClose}) => {

    const router = useRouter();


    const redirectToChat = () => {
        router.push(`/chat`);
    };
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    if (!isActive) {
        return null;
    }

    return (
            <div className='add_phone_modal2'>
                <div className='add_phone_modal_wrapper'>
                    <button
                        className='add_phone_modal_close_btn'
                        onClick={() => {
                           onClose()
                            enableBodyScroll()
                        }}
                    >
                        <FilterCloseIcon/>
                    </button>

                    <h1 className='add_phone_modal_title add_phone_modal_title2'>
                        Вы действительно хотите
                        Выбрать исполнителем
                    </h1>
                    {/*<p className='add_phone_modal_info'>После удаления аккаунт будет больше недоступен</p>*/}

                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                           onClose()

                        }}
                    >
                        Выбрать
                    </button>
                    <button
                        className='add_phone_modal_button2'
                         onClick={() => {
                                 onClose()
                             enableBodyScroll()
                         }}
                    >
                        Отменить
                    </button>



                </div>

            </div>

    );
};

export default SelectFreelancerModal;
