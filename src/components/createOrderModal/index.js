import React, {useState} from 'react';
import '../../assets/css/create_order.css'
import {FilterCloseIcon} from '../icons/FilterCloseIcon'

const CreateOrderModal = ({isActive, onClose}) => {

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    if (!isActive) {
        return null
    }


    return (
        <div className='create_order_modal'>
            <div className='create_order_modal_wrapper'>
                <button
                    className='create_order_modal_close_btn'
                    onClick={() => {
                        onClose()
                        enableBodyScroll()
                    }}
                >
                    <FilterCloseIcon/>
                </button>
                <div className="create_order_modal_wrapper_child">
                    <h1 className='create_order_modal_title'>Cоздание заказа</h1>
                    <p className='create_order_modal_info'>Создание заказа стоит 10 рублей</p>
                    <button className='create_order_modal_post_btn'>Разместить</button>
                    <button
                        className='create_order_modal_cancel_btn'
                        onClick={() => {
                            onClose()
                            enableBodyScroll()
                        }}
                    >
                        Отменить
                    </button>

                </div>


            </div>

        </div>

    );
};

export default CreateOrderModal;
