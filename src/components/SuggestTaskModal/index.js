import React, {useState} from 'react';
import '../../assets/css/freelancers_single_page.css'
import {DateIcon} from "@/components/icons/DateIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";


const SuggestTaskModal = ({isActive, onClose}) => {
    const [tasksLilit, setTasksList] = useState([
        {
            id: 1,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 2,
            service_name: 'Дизайн2',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн3',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 4,
            service_name: 'Дизайн4',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 5,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 6,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 11,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 12,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 13,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 14,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 15,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 16,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
    ]);

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    if (!isActive) {
        return null
    }

    return (
        <div className='suggest_task_modal'>
            <div className='suggest_task_modal_wrapper'>
                <button
                    className='suggest_task_modal_close_btn'
                    onClick={() => {
                        onClose()
                        enableBodyScroll()
                    }}
                >
                    <FilterCloseIcon/>
                </button>

                <h1 className='suggest_task_modal_title'>Предложить задание</h1>
                <div className='suggest_tasks_modal_services_items_wrapper'>
                    {tasksLilit.map((item, index) => {
                        return (
                            <button
                                className='task_services_item' key={index}>
                                <div className="task_services_item_name_address_info_wrapper">
                                    <p className="task_services_item_name">{item?.service_name}</p>
                                </div>

                                <p className="task_services_item_info">{item?.service_type_info}</p>
                                <div className='task_services_item_pirce_date_info_wrapper'>
                                    <div className='task_services_item_pirce_wrapper'>
                                        <p className='task_services_item_pirce_info'>{item?.service_price}</p>
                                    </div>
                                    <div className='task_services_item_date_hour_wrapper'>
                                        <div className='task_services_item_date_hour_title_icon_wrapper'>
                                            <p className='task_services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                            <DateIcon/>
                                        </div>
                                        <div className='task_services_item_date_hour_info_wrapper'>
                                            <p className='task_services_item_date_hour_info1'>{item.service_date},</p>
                                            <p className='task_services_item_date_hour_info2'>{item.service_hour}</p>
                                        </div>

                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
                <button className='suggest_task_modal_button'>Предложить</button>

            </div>

        </div>

    );
};

export default SuggestTaskModal;
