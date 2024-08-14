import React, {useState} from 'react';
import '../../assets/css/header.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";
import Image from "next/image";


const DownloadApplicationModal = ({}) => {


    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    const handleNavigateToLogin = () => {
        router.push('/login');
    };


    return (
            <div className='recovery_account_modal'>
                <div className='recovery_account_modal_wrapper2'>
                    {/*<button*/}
                    {/*    className='recovery_account_modal_close_btn'*/}
                    {/*    onClick={() => {*/}
                    {/*      */}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <FilterCloseIcon/>*/}
                    {/*</button>*/}

                    <h1 className='recovery_account_modal_title2'>Скачать приложение</h1>
                    <p className='recovery_account_modal_info'>
                        Задача организации, в особенности же синтетическое тестирование выявляет срочную потребность системы массового участия.
                    </p>
                    <div className='qr_img'>
                        <Image
                            src="/qr_img.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                    </div>
                    <div className='recovery_account_modal_item'>

                        <button
                            className='recovery_account_modal_button'
                            onClick={() => {
                                goBack()
                            }}
                        >
                            Закрыть
                        </button>
                    </div>




                </div>

            </div>

    );
};

export default DownloadApplicationModal;
