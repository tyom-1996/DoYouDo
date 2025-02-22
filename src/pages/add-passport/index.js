import React, {useEffect, useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import PassportImageUploader from '../includes/PassportImageUploader'
import SelfiePassportImageUploader from '../includes/SelfiePassportImageUploader'
import {SuccessIcon} from "@/components/icons/SuccessIcon";
import {useUploadPassportPhoto} from "@/hooks/useUploadPassportPhoto";

const AddPassportModal = ({}) => {
    const [passportImage, setPassportImage] = useState('');
    const [passportSelfieImage, setPassportSelfieImage] = useState('');
    const [showPasswordSuccessPopup, setShowPasswordSuccessPopup] = useState('');
    const { uploadPassportPhoto,  uploadPassportPhotoData } = useUploadPassportPhoto();

    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    useEffect(() => {
        if (uploadPassportPhotoData) {
            setShowPasswordSuccessPopup(true)
        }
    }, [uploadPassportPhotoData])

    const redirectToPassportSuccess = async () => {
        await uploadPassportPhoto(passportImage, passportSelfieImage)
    };

    return (
            <>
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
                                <PassportImageUploader setPassportImage={setPassportImage}/>
                            </div>
                            <div className="add_scan_passport_item">
                                <SelfiePassportImageUploader setPassportSelfieImage={setPassportSelfieImage}/>
                            </div>

                        </div>


                        {!passportImage || !passportSelfieImage ?
                            <button
                                className='add_phone_modal_button'
                                disabled
                                style={{opacity: 0.5}}

                            >
                                Сохранить
                            </button>
                            :
                            <button
                                className='add_phone_modal_button'
                                onClick={() => {
                                    redirectToPassportSuccess()

                                }}

                            >
                                Сохранить
                            </button>
                        }


                    </div>

                </div>
                {showPasswordSuccessPopup &&
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
                                Ваш пасспорт будет добавлен в течении 2 часов
                            </h1>

                            <button
                                className='add_phone_modal_button'
                                onClick={() => {
                                    goBack()
                                }}
                            >
                                Закрыть
                            </button>


                        </div>

                    </div>
                }
            </>


        )
    ;
};

export default AddPassportModal;
