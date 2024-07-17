import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/how_it_works.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import { useRouter } from 'next/router';


export default function HowItWorks () {
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
                    <title>Как это работает?</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="how_it_works_page">
                    <Header/>
                </div>
                <div className="how_it_works_main_wrapper">
                    <div className="how_it_works_main_wrapper_item">
                        <h1 className="how_it_works_main_wrapper_item_title">Как это работает?</h1>
                        <p className='how_it_works_main_wrapper_item_info'>
                            YouDo — удобный сервис, который позволяет быстро и безопасно находить надежных исполнителей для решения бытовых и бизнес-задач. Достаточно разместить задание на сервисе, и через несколько минут вы начнете получать отклики от исполнителей, которые будут готовы его выполнить.
                        </p>
                        <p className='how_it_works_main_wrapper_item_info'>
                            Исполнители проходят  <span>специальную проверку</span>  администрацией сервиса, поэтому YouDo безопасен для заказчиков.
                        </p>
                    </div>
                    <div className="how_it_works_main_wrapper_item">
                        <h1 className="how_it_works_main_wrapper_item_title">Как создать задание на YouDo?</h1>
                        <div className='how_it_works_main_wrapper_item_child'>
                            <p className='how_it_works_main_wrapper_item_child_title'>Выберите категорию</p>
                            <div className='how_it_works_main_wrapper_item_dropdown'>
                                <p className='how_it_works_main_wrapper_item_dropdown_title'>что нужно сделать</p>
                                <div className='how_it_works_main_wrapper_item_dropdown_child'>
                                    <p className='how_it_works_main_wrapper_item_dropdown_child_title'>категория</p>
                                    <div className='how_it_works_main_wrapper_item_dropdown_child_title_icon_wrapper'>
                                        <p className='how_it_works_main_wrapper_item_dropdown_child_title2'>
                                            разработка андроид приложени
                                        </p>
                                       <DropDownIcon2/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='how_it_works_main_wrapper_item_child'>
                            <p className='how_it_works_main_wrapper_item_child_title'>
                                В свободной форме опишите детали вашего задания
                            </p>
                            <div className='how_it_works_main_wrapper_item_dropdown'>
                                <p className='how_it_works_main_wrapper_item_dropdown_title'>что нужно сделать</p>
                                <div className='how_it_works_main_wrapper_item_dropdown_child'>
                                    <p className='how_it_works_main_wrapper_item_dropdown_child_title'>категория</p>
                                    <div className='how_it_works_main_wrapper_item_dropdown_child_title_icon_wrapper'>
                                        <p className='how_it_works_main_wrapper_item_dropdown_child_title2'>
                                            разработка андроид приложения
                                        </p>
                                       <DropDownIcon2/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="how_it_works_main_wrapper_item">
                        <div className="how_it_works_main_wrapper_item_details_wrapper">
                            <p className="how_it_works_main_wrapper_item_details_wrapper_title">Получайте отклики исполнителей</p>
                            <p className="how_it_works_main_wrapper_item_details_wrapper_info">
                                Сразу после создания задания вам начнут поступать отклики от людей, которые готовы его выполнить.
                            </p>
                        </div>
                        <div className="how_it_works_main_wrapper_item_details_wrapper">
                            <p className="how_it_works_main_wrapper_item_details_wrapper_title">
                                Выберите лучшего исполнителя
                            </p>
                            <p className="how_it_works_main_wrapper_item_details_wrapper_info">
                                Вам остается выбрать среди откликов лучшее по цене или рейтингу исполнителя.
                            </p>
                        </div>
                        <div className="how_it_works_main_wrapper_item_details_wrapper">
                            <p className="how_it_works_main_wrapper_item_details_wrapper_title">
                                Завершение задания
                            </p>
                            <p className="how_it_works_main_wrapper_item_details_wrapper_info">
                                После выполнения задания не забудьте подтвердить, что исполнитель выполнил поручение, и написать отзыв о его работе.
                            </p>
                        </div>
                    </div>
                    <div className="how_it_works_main_wrapper_line"></div>
                    <button className='create_a_task_btn'>
                        Создать задание
                    </button>

                </div>
                <Footer activePage='how_it_works_page'/>
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
