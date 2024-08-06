import React, {useState} from 'react';
import '../../assets/css/freelancers_profile_page.css'
import {FilterCloseIcon} from '@/components/icons/FilterCloseIcon'
import {useRouter} from "next/router";


const AddPhoneModal = ({}) => {
    const [showPhonePart, setShowPhonePart] = useState(true);
    const [showEmailPart, setShowEmailPart] = useState(false);
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const redirectFromAddPhone = () => {
        router.push(`/add-phone-number-confirmation-code`);
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

                    <h1 className='add_phone_modal_title'>Добавление тел. номера</h1>
                    <p className='add_phone_modal_info'>
                        Мы отправим 4-х значный код на ваш тел. номер для подтверждения
                    </p>

                    <div className='add_phone_modal_item_input_wrapper'>
                        <input
                            type="number"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Номер телефона"
                            className='add_phone_modal_item_input_field'
                        />
                    </div>
                    <button
                        className='add_phone_modal_button'
                        onClick={() => {
                            redirectFromAddPhone()

                        }}
                    >
                        Далее
                    </button>



                </div>

            </div>

    );
};

export default AddPhoneModal;
