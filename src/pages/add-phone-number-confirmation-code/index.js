import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const AddPhoneConfirmationModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [code, setCode] = useState('');

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    const redirectToAddPhoneSuccessPopup = () => {
        router.push(`/phone-success`);
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

                    <h1 className='add_phone_modal_title'>Добавление тел. номера</h1>
                    <p className='add_phone_modal_info'>
                        Введите код подтверждения
                    </p>

                    <div className='add_phone_modal_item_input_wrapper'>
                        <input
                            type="number"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="Код подтверждения"
                            className='add_phone_modal_item_input_field'
                        />
                    </div>
                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                           redirectToAddPhoneSuccessPopup()
                        }}
                    >
                        Далее
                    </button>



                </div>

            </div>

    );
};

export default AddPhoneConfirmationModal;
