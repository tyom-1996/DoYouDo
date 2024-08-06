import React, {useState} from 'react';
import '../../assets/css/create_order.css'
import {FilterCloseIcon} from '../icons/FilterCloseIcon'
import {FundsModalIcon} from '../icons/FundsModalIcon'

const InsufficientFundsModal = ({isActive, onClose}) => {

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    if (!isActive) {
        return null
    }

    return (
        <div className='insufficient_funds_modal'>
            <div className='insufficient_funds_modal_wrapper'>
                <button
                    className='insufficient_funds_modal_close_btn'
                    onClick={() => {
                        onClose()
                        enableBodyScroll()
                    }}
                >
                    <FilterCloseIcon/>
                </button>
                    <div className='insufficient_funds_modal_icon'>
                        <FundsModalIcon/>
                    </div>

                    <h1 className='insufficient_funds_modal_title'>Недостаточно средств для размещения заказа</h1>
                    <button
                        className='insufficient_funds_modal_top_up_balance_btn'
                        onClick={() => {
                            onClose()
                        }}
                    >
                        Пополнить баланс
                    </button>

            </div>

        </div>

    );
};

export default InsufficientFundsModal;
