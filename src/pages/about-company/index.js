import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/about_company.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import { useRouter } from 'next/router';


export default function AboutCompany () {
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
                <div className="home_general_wrapper" id="about_company">
                    <Header/>
                </div>
                <div className="about_company_main_wrapper">
                    <div className="about_company_top_items_wrapper">
                        <div className="about_company_top_info_item">
                            <h1 className='about_company_top_item_title'><span>DoYouDo</span> освободит вас от забот</h1>
                            <p className='about_company_top_item_info'>Один из крупнейших онлайн-сервисов услуг для решения бытовых и бизнес-задач. Основные направления: маркетплейс и YouDo Бизнес</p>
                        </div>
                        <div className="about_company_top_img_item">
                            <Image
                                src="/about_company_img.png"
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />
                        </div>
                    </div>
                    <div className="about_company_mission_wrapper">
                        <h1 className="about_company_mission_wrapper_title">
                            Миссия DoYouDo
                        </h1>
                        <p className='about_company_mission_wrapper_info'>
                            Помогать людям и компаниям улучшать качество жизни, работы и экономить ресурсы. Стать самым крупным цифровым работодателем, облаком рабочей силы в стране. Стремимся стать для пользователей основным источником дохода, не являясь прямым работодателем.
                        </p>
                        <div className="about_company_mission_img_item1">
                            <Image
                                src="/about_company_img2.png"
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />
                        </div>
                        <div className="about_company_mission_img_item2">
                            <Image
                                src="/about_company_img3.png"
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />
                        </div>
                    </div>
                    {/*<div className="about_company_founders_wrapper">*/}
                    {/*    <h1 className="about_company_founders_wrapper_title">*/}
                    {/*        Основатели YouDo*/}
                    {/*    </h1>*/}
                    {/*   <div className='about_company_founders_wrapper_items_wrapper'>*/}
                    {/*       <div className='about_company_founders_wrapper_item'>*/}
                    {/*           <div className="about_company_founders_wrapper_item_img">*/}
                    {/*               <Image*/}
                    {/*                src="/freelancers_img8.png"*/}
                    {/*                alt="Example Image"*/}
                    {/*                layout="fill" // Fill the parent element*/}
                    {/*                objectFit="cover" // Cover the area of the parent element*/}
                    {/*                quality={100} // Image quality*/}
                    {/*               />*/}
                    {/*           </div>*/}
                    {/*           <div className="about_company_founders_wrapper_item_info_box">*/}
                    {/*               <p className="about_company_founders_wrapper_item_title">Заказчик Evgenia G.</p>*/}
                    {/*               <p className="about_company_founders_wrapper_item_info">Дизайн сайта DoYouDo</p>*/}
                    {/*           </div>*/}
                    {/*       </div>*/}
                    {/*       <div className='about_company_founders_wrapper_item'>*/}
                    {/*           <div className="about_company_founders_wrapper_item_img">*/}
                    {/*                <Image*/}
                    {/*                    src="/freelancers_img3.png"*/}
                    {/*                    alt="Example Image"*/}
                    {/*                    layout="fill" // Fill the parent element*/}
                    {/*                    objectFit="cover" // Cover the area of the parent element*/}
                    {/*                    quality={100} // Image quality*/}
                    {/*                />*/}
                    {/*           </div>*/}
                    {/*           <div className="about_company_founders_wrapper_item_info_box">*/}
                    {/*               <p className="about_company_founders_wrapper_item_title">Заказчик Evgenia G.</p>*/}
                    {/*               <p className="about_company_founders_wrapper_item_info">Дизайн сайта DoYouDo</p>*/}
                    {/*           </div>*/}
                    {/*       </div>*/}
                    {/*   </div>*/}

                    {/*</div>*/}
                    {/*<div className="about_company_awards_wrapper">*/}
                    {/*    <h1 className="about_company_awards_wrapper_title">*/}
                    {/*        Наши награды*/}
                    {/*    </h1>*/}
                    {/*    <div className="about_company_awards_img_item1">*/}
                    {/*        <Image*/}
                    {/*            src="/about_company_img5.png"*/}
                    {/*            alt="Example Image"*/}
                    {/*            layout="fill" // Fill the parent element*/}
                    {/*            objectFit="cover" // Cover the area of the parent element*/}
                    {/*            quality={100} // Image quality*/}
                    {/*        />*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>
                <Footer activePage='about_company'/>
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
