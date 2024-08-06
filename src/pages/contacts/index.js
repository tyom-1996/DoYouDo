import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/contacts.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import { useRouter } from 'next/router';


export default function Contacts () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const [showFilterMobile, setShowFilterMobile] = useState(false);
    const [filterCategoryList, setFilterCategoryList] = useState([
        {
            id: 1,
            filter_category_title: 'Дизайн',
            filter_item_subcategories: [
                {
                    id: 2,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 3,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 4,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 5,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 6,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 7,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 8,
            filter_category_title: 'Дизайн',
            filter_item_subcategories: [
                {
                    id: 9,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 10,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 11,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 12,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 13,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 14,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 15,
            filter_category_title: 'Компьютерная помощь',
            filter_item_subcategories: [
                {
                    id: 16,
                    subcategory_name: 'Ремонт компьютеров',
                },
                {
                    id: 17,
                    subcategory_name: 'Установка и настройка',
                },
                {
                    id: 18,
                    subcategory_name: 'Удаление вирусов',
                },
                {
                    id: 19,
                    subcategory_name: '3d-Настройка интернета',
                },
                {
                    id: 20,
                    subcategory_name: 'Консультация и обучение',
                },

            ]
        },
        {
            id: 21,
            filter_category_title: 'Разработка ПО',
            filter_item_subcategories: [
                {
                    id: 22,
                    subcategory_name: 'Ремонт компьютеров',
                },
                {
                    id: 23,
                    subcategory_name: 'Установка и настройка',
                },
                {
                    id: 24,
                    subcategory_name: 'Удаление вирусов',
                },
                {
                    id: 25,
                    subcategory_name: '3d-Настройка интернета',
                },
                {
                    id: 26,
                    subcategory_name: 'Консультация и обучение',
                },

            ]
        },
        {
            id: 27,
            filter_category_title: 'Фото, видео и аудио',
            filter_item_subcategories: [
                {
                    id: 28,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 29,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 30,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 31,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 32,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 33,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 34,
            filter_category_title: 'Красота и здоровье',
            filter_item_subcategories: [
                {
                    id: 35,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 36,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 37,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 38,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 39,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 40,
                    subcategory_name: 'Анимация',
                },
            ]
        },

    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [citiesList, setCitiesList] = useState([
        {
            id: 1,
            city_name: 'Москва'
        },
        {
            id: 2,
            city_name: 'Санкт-Петербург'
        },
        {
            id: 3,
            city_name: 'Екатеринбург'
        },
        {
            id: 4,
            city_name: 'Новосибирск'
        },
        {
            id: 5,
            city_name: 'Нижний Новгород'
        },
        {
            id: 6,
            city_name: 'Самара'
        },

    ]);
    const [selectedCities, setSelectedCities] = useState([]);



    const handleCheckboxChange = () => {
        setIsCheckedAllCategories(!isCheckedAllCategories);
    };



    useEffect(() => {
       handleUseFilter()
    }, [selectedCategories, selectedCities]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleUseFilter = async () => {
        console.log('use fiter')
    }
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };


    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>О Компании</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="contacts">
                    <Header/>
                    <div className="contacts_wrapper">
                        <h1 className='contacts_wrapper_title'>Контакты</h1>
                        <p className='contacts_wrapper_info1'>
                            Наша служба поддержки работает каждый день.
                            Ответим на любые вопросы и пожелания в чате.
                        </p>
                        <button className='contacts_wrapper_write_to_support_btn'>Написать в поддержку</button>
                        <div className='contacts_wrapper_details_box'>
                            <p className='contacts_wrapper_details_box_title'>Реквизиты</p>
                            <p className='contacts_wrapper_info2'>
                                Общество с ограниченной ответственностью «Киберлогистик»
                            </p>
                            <p className='contacts_wrapper_info3'>
                                Адрес для корреспонденции, направления жалоб и предложений: <br/>119048, Россия, г. Москва, а/я 440 <br/>
                                Юридический адрес: <br/>121205, Россия, г. Москва, Территория Инновационного Центра «Сколково», улица Нобеля 7, помещение 47
                                89851423465 - для корреспонденции <br/> ИНН 7730194136 <br/> КПП 773101001 <br/> ОГРН 5157746302434
                            </p>
                        </div>
                    </div>
                </div>
                <Footer activePage='contacts'/>
                {showFilterMobile &&
                    <div className='filter_mobile_menu'>
                        <div className='filter_mobile_menu_wrapper'>
                            <div className='filter_mobile_menu_title_close_icon_wrapper'>
                                <button
                                    className='filter_mobile_menu_close_btn'
                                    onClick={() => {
                                        setShowFilterMobile(false)
                                        enableBodyScroll()
                                    }}
                                >
                                    <FilterCloseIcon/>
                                </button>
                                <p className='filter_mobile_menu_title'>Фильтр</p>
                            </div>
                            <div className="mobile_services_filter_items_wrapper">

                                <div className='services_filter_item'>
                                    <label className='service_label'>
                                        <input
                                            type="checkbox"
                                            checked={isCheckedAllCategories}
                                            onChange={handleCheckboxChange}
                                            className='service_label_checkbox_input_field checkbox'
                                        />
                                        <span className='service_label_custom_checkbox customCheckbox'></span>
                                        Все категории

                                    </label>
                                </div>

                                <City
                                    cityData={citiesList}
                                    selectedCities={selectedCities}
                                    setNewSelectedCities={(val)=>{
                                        setSelectedCities(val)
                                        console.log(val)
                                    }}
                                />

                                <div className='service_category_items_wrapper'>
                                    {filterCategoryList.map((item, index) => {
                                        return (
                                            <Category
                                                categoryData={item}
                                                selectedCategories={selectedCategories}
                                                setNewSelectedCategories={(val)=>{
                                                    setSelectedCategories(val)
                                                    console.log(val)
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </main>
        </>
    );
}
