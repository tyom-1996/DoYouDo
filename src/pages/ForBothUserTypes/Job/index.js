import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/home.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Category from '../../includes/Category'
import City from '../../includes/CityComponent'
import Head from 'next/head';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {SearchMobileIcon} from "@/components/icons/SearchMobileIcon";
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {FilterIcon} from "@/components/icons/FilterIcon";
import { useRouter } from 'next/router';

export default function Job () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [servicesList, setServicesList] = useState([
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
    const [recommendationsList, setRecommendationsList] = useState([
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
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 4,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },

    ]);
    const [similarWorksList, setSimilarWorksList] = useState([
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
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 4,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },

    ]);
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
    const router = useRouter();

    const navigateToMapPage = () => {
        router.push('/Map');
    };
    const redirectToOrderPageForFreelancer = () => {
        router.push('/FreelancerPages/OrderPageForFreelancer');
    };


    return (
        <>
            <main className='general_page_wrapper' id='job_page'>
                <Head>
                    <title>Работа</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"job_page"}/>
                </div>
                <div className="services">
                    <div className="services_wrapper">
                        <div className="services_search_box_logo_wrapper">
                            <div className="services_search_box">
                                <div className="services_search_input_field">
                                    <div className='services_search_input_field_icon'>
                                        <SearchIcon/>
                                    </div>
                                    <input type="text" placeholder='Услуга' className='services_search_input'/>
                                </div>
                                <div className='services_search_box_buttons_wrapper'>
                                    <button className='services_search_box_search_button'>
                                        Найти
                                    </button>
                                    <button
                                        className='services_search_box_map_button'
                                        onClick={() => {
                                            navigateToMapPage()
                                        }}
                                    >
                                        Карта
                                    </button>
                                    <button
                                        className='services_search_box_filter_button'
                                    >
                                       <FilterIcon/>
                                    </button>
                                </div>
                            </div>
                            <div className="mobile_services_search_box">
                                <div className='services_search_input_field_btn_wrapper'>
                                    <div className="services_search_input_field">
                                        <div className='services_search_input_field_icon'>
                                            <SearchIcon/>
                                        </div>
                                        <input type="text" placeholder='Услуга' className='services_search_input'/>
                                    </div>
                                    <button className='services_search_box_search_button'>
                                        <SearchMobileIcon/>
                                    </button>
                                </div>

                                <div className='services_search_box_buttons_wrapper'>
                                    <button
                                        className='services_search_box_map_button'
                                        onClick={() => {
                                            navigateToMapPage()
                                        }}
                                    >
                                        Карта
                                    </button>
                                    <button
                                        className='services_search_box_filter_button'
                                        onClick={() => {
                                            setShowFilterMobile(true)
                                            disableBodyScroll()
                                        }}
                                    >
                                        Фильтр
                                    </button>
                                </div>
                            </div>
                            <div className='services_search_box_logo'>
                                <Image
                                    src="/main_logo.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </div>
                        </div>
                        <div className="services_items_filter_main_wrapper">
                            <div className="services_filter_items_wrapper">

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
                            <div className='services_items_wrapper'>
                                {servicesList.map((item, index) => {
                                    return (
                                        <button
                                            className='services_item' key={index}
                                            onClick={() => {
                                                redirectToOrderPageForFreelancer()
                                            }}
                                        >
                                            <div className="services_item_name_address_info_wrapper">
                                                <p className="services_item_name">{item?.service_name}</p>
                                                <p className="services_item_address_info">{item?.service_address}</p>
                                            </div>

                                            <p className="services_item_info">{item?.service_type_info}</p>
                                            <div className='services_item_pirce_date_info_wrapper'>
                                                <div className='services_item_pirce_wrapper'>
                                                    <p className='services_item_pirce_info'>{item?.service_price}</p>
                                                </div>
                                                <div className='services_item_date_hour_wrapper'>
                                                    <div className='services_item_date_hour_title_icon_wrapper'>
                                                        <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                        <DateIcon/>
                                                    </div>
                                                    <div className='services_item_date_hour_info_wrapper'>
                                                        <p className='services_item_date_hour_info1'>{item.service_date},</p>
                                                        <p className='services_item_date_hour_info2'>{item.service_hour}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </button>
                                    )
                                })}
                                <div className="pagination_links_wrapper">
                                    <button className="pagination_link_btn">
                                        <PaginationLeftIcon/>
                                    </button>
                                    <button className="pagination_link">
                                        <p className="pagination_link_title">1</p>
                                    </button>
                                    <button className="pagination_link active">
                                        <p className="pagination_link_title">2</p>
                                    </button>
                                    <button className="pagination_link">
                                        <p className="pagination_link_title">3</p>
                                    </button>
                                    <button className="pagination_link">
                                        <p className="pagination_link_title">4</p>
                                    </button>
                                    <button className="pagination_link">
                                        <p className="pagination_link_title">....</p>
                                    </button>
                                    <button className="pagination_link_btn">
                                        <PaginationRightIcon/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="recommendations">
                    <div className="recommendations_wrapper">
                        <h1 className='recommendations_title'>Рекомендации</h1>
                        <div className='recommendations_items_wrapper'>
                            {recommendationsList.map((item, index) => {
                                return (
                                    <div className='services_item' key={index}>
                                        <div className="services_item_name_address_info_wrapper">
                                            <p className="services_item_name">{item?.service_name}</p>
                                            <p className="services_item_address_info">{item?.service_address}</p>
                                        </div>

                                        <p className="services_item_info">{item?.service_type_info}</p>
                                        <div className='services_item_pirce_date_info_wrapper'>
                                            <div className='services_item_pirce_wrapper'>
                                                <p className='services_item_pirce_info'>{item?.service_price}</p>
                                            </div>
                                            <div className='services_item_date_hour_wrapper'>
                                                <div className='services_item_date_hour_title_icon_wrapper'>
                                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                    <DateIcon/>
                                                </div>
                                                <div className='services_item_date_hour_info_wrapper'>
                                                    <p className='services_item_date_hour_info1'>{item.service_date},</p>
                                                    <p className='services_item_date_hour_info2'>{item.service_hour}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pagination_links_wrapper">
                            <button className="pagination_link_btn">
                                <PaginationLeftIcon/>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">1</p>
                            </button>
                            <button className="pagination_link active">
                                <p className="pagination_link_title">2</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">3</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">4</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">....</p>
                            </button>
                            <button className="pagination_link_btn">
                                <PaginationRightIcon/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="recommendations">
                    <div className="recommendations_wrapper">
                        <h1 className='recommendations_title'>Похожие работы</h1>
                        <div className='recommendations_items_wrapper'>
                            {similarWorksList.map((item, index) => {
                                return (
                                    <div className='services_item' key={index}>
                                        <div className="services_item_name_address_info_wrapper">
                                            <p className="services_item_name">{item?.service_name}</p>
                                            <p className="services_item_address_info">{item?.service_address}</p>
                                        </div>

                                        <p className="services_item_info">{item?.service_type_info}</p>
                                        <div className='services_item_pirce_date_info_wrapper'>
                                            <div className='services_item_pirce_wrapper'>
                                                <p className='services_item_pirce_info'>{item?.service_price}</p>
                                            </div>
                                            <div className='services_item_date_hour_wrapper'>
                                                <div className='services_item_date_hour_title_icon_wrapper'>
                                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                    <DateIcon/>
                                                </div>
                                                <div className='services_item_date_hour_info_wrapper'>
                                                    <p className='services_item_date_hour_info1'>{item.service_date},</p>
                                                    <p className='services_item_date_hour_info2'>{item.service_hour}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pagination_links_wrapper">
                            <button className="pagination_link_btn">
                                <PaginationLeftIcon/>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">1</p>
                            </button>
                            <button className="pagination_link active">
                                <p className="pagination_link_title">2</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">3</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">4</p>
                            </button>
                            <button className="pagination_link">
                                <p className="pagination_link_title">....</p>
                            </button>
                            <button className="pagination_link_btn">
                                <PaginationRightIcon/>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
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
