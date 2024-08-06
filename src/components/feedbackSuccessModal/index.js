import React, {useState} from 'react';
import '../../assets/css/leave_feedback.css'
import {FilterCloseIcon} from '../icons/FilterCloseIcon'
import {SuccessIcon} from '../icons/SuccessIcon'


const FeedBackSuccess = ({isActive, onClose}) => {

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    if (!isActive) {
        return null
    }

    return (
        <div className='feedback_success_modal'>
            <div className='feedback_success_modal_wrapper'>
                <button
                    className='feedback_success_modal_close_btn'
                    onClick={() => {
                        onClose()
                        enableBodyScroll()
                    }}
                >
                    <FilterCloseIcon/>
                </button>
                <div className='feedback_success_modal_wrapper_child'>
                    <div className='feedback_success_modal_icon'>
                        <SuccessIcon/>
                    </div>

                    <h1 className='feedback_success_modal_title'>
                        Ваш отзыв <br/> успешно добавлен
                    </h1>
                    <button
                        className='feedback_success_modal_btn'
                        onClick={() => {
                            onClose()
                            enableBodyScroll()
                        }}
                    >
                        Закрыть
                    </button>

                </div>

            </div>

        </div>

    );
};

export default FeedBackSuccess;
