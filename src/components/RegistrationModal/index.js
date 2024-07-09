import React, {useState} from 'react';
import '../../assets/css/registration.css'

const RegistrationModal = ({isActive, onClose}) => {

    if (!isActive) {
        return null
    }

    return (
        <div className='registration_modal'>
            <div className='registration_modal_wrapper'>
                {/*<button*/}
                {/*    className='mission_modal_close_btn'*/}
                {/*    onClick={() => {*/}
                {/*        onClose()*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <CloseMissionModalIcon/>*/}
                {/*</button>*/}
                <h1 className='registration_modal_title'>Регистрация</h1>

            </div>

        </div>

    );
};

export default RegistrationModal;
