import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import PassportImageUploader from '../includes/PassportImageUploader'
import SelfiePassportImageUploader from '../includes/SelfiePassportImageUploader'


const AddPassportModal = ({}) => {

    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const redirectToPassportSuccess = () => {
        router.push(`/passport-success`);
    };

    return (
            <div className='add_phone_modal'>
                <div className='add_phone_modal_wrapper'>
                    <button
                        className='add_phone_modal_close_btn'
                        onClick={() => {
                            goBack()
                        }}
                    >
                        <FilterCloseIcon/>
                    </button>

                    <h1 className='add_phone_modal_title'>Добавление паспорта</h1>
                    <p className='add_phone_modal_info'>
                        Мы отправим 4-х значный код на ваш тел. номер для подтверждения
                    </p>
                    <div className='add_scan_passport_items_wrapper'>
                        <div className="add_scan_passport_item">
                            <PassportImageUploader/>
                        </div>
                        <div className="add_scan_passport_item">
                            <SelfiePassportImageUploader/>
                        </div>

                    </div>



                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                            redirectToPassportSuccess()

                        }}
                    >
                        Сохранить
                    </button>



                </div>

            </div>

    );
};

export default AddPassportModal;
