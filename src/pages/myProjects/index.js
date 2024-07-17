import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/my_projects.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from 'next/head';
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import { useRouter } from 'next/router';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";

export default function MyProjects () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [myResponsesProjectsList, setMyResponsesProjectsList] = useState([
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
    ]);
    const [inProgressProjectsList, setInProgressProjectsList] = useState([
        {
            id: 1,
            service_name: 'Дизайн20',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 2,
            service_name: 'Дизайн25',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн30',
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

    ]);
    const [forApprovalProjectsList, setForApprovalProjectsList] = useState([
        {
            id: 1,
            service_name: 'Дизайн60',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 2,
            service_name: 'Дизайн80',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн100',
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

    ]);
    const [clientProjectsList, setClientProjectsList] = useState([
        {
            id: 1,
            service_name: '',
            service_type_info: '',
            service_price: '',
            service_date: '',
            service_hour: '',
            service_state: '',
            canceled: true,
            new_order_info: 'Создать новое задание',
            make_new_order: true,
        },
        {
            id: 2,
            service_name: 'Дизайн60',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Отменен',
            canceled: true,
            make_new_order: false,
        },
        {
            id: 3,
            service_name: 'Дизайн60',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Отменен',
            canceled: true,
            make_new_order: false,
        },
        {
            id: 4,
            service_name: 'Дизайн80',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Открыт для Откликов',
            canceled: false,
            make_new_order: false,
        },
        {
            id: 5,
            service_name: 'Дизайн100',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Открыт для Откликов',
            canceled: false,
            make_new_order: false,
        },
        {
            id: 6,
            service_name: 'Дизайн4',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Отменен',
            canceled: true,
            make_new_order: false,
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Отменен',
            canceled: true,
            make_new_order: false,
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Открыт для Откликов',
            canceled: false,
            make_new_order: false,
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Открыт для Откликов',
            canceled: false,
            make_new_order: false,
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_state: 'Отменен',
            canceled: true,
            make_new_order: false,
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
    const [showMyResponsesProjects, setShowMyResponsesProjects] = useState(true);
    const [showInProgressProjects, setShowInProgressProjects] = useState(false);
    const [showForApprovalProjects, setShowForApprovalProjects] = useState(false);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [showForFreelancer, setShowForFreelancer] = useState(false);
    const [showForClient, setShowForClient] = useState(true);
    const [selectedTab, setSelectedTab] = useState('myResponses');

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
        router.push('/map');
    };

    const redirectToOrderPageForFreelancer = (id) => {
        router.push(`/myProjects/${id}`);
    };
    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };
    const handleTabClick = (tab, setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowHiddenDropDownMenu) => {
        setSelectedTab(tab);
        if (tab === 'myResponses') {
            setShowMyResponsesProjects(true);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(false);
        } else if (tab === 'inProgress') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(true);
            setShowForApprovalProjects(false);
        } else if (tab === 'forApproval') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(true);
        }
        setShowHiddenDropDownMenu(false);
    };


    return (
        <>
            <main className='general_page_wrapper' id='my_projects_page'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"my_project_page"}/>
                </div>
                <div className="my_projects">
                    <div className="my_projects_wrapper">
                        {showForFreelancer  &&
                            <div style={{width: '100%'}}>
                                <div className='my_project_tabs_wrapper'>
                                    <button
                                        className={`my_project_tab ${showMyResponsesProjects ? 'active_tab' : ''}`}
                                        onClick={() => {
                                            setShowMyResponsesProjects(true)
                                            setShowInProgressProjects(false)
                                            setShowForApprovalProjects(false)
                                        }}
                                    >
                                        Мои отклики
                                    </button>
                                    <button
                                        className={`my_project_tab ${showInProgressProjects ? 'active_tab' : ''}`}
                                        onClick={() => {
                                            setShowInProgressProjects(true)
                                            setShowMyResponsesProjects(false)
                                            setShowForApprovalProjects(false)
                                        }}
                                    >
                                        В работе
                                    </button>
                                    <button
                                        className={`my_project_tab ${showForApprovalProjects ? 'active_tab' : ''}`}
                                        onClick={() => {
                                            setShowForApprovalProjects(true)
                                            setShowInProgressProjects(false)
                                            setShowMyResponsesProjects(false)
                                        }}
                                    >
                                        На Согласовании
                                    </button>
                                </div>
                                <div className="dropdownWrapper">
                                    <div
                                        className="dropdownHeader"
                                        onClick={handleDropdownClick}
                                    >
                                        <p className='dropdownHeader_title'>
                                            {selectedTab === 'myResponses' && 'Мои отклики'}
                                            {selectedTab === 'inProgress' && 'В работе'}
                                            {selectedTab === 'forApproval' && 'На Согласовании'}
                                        </p>

                                        <button
                                            className='dropdownHeader_icon'
                                            style={showHiddenDropDownMenu ? {transform: 'rotate(180deg)'} : {}}
                                        >
                                            <DropDownIcon2/>
                                        </button>
                                    </div>
                                    {showHiddenDropDownMenu && (
                                        <div className="tabsWrapper">
                                            <button
                                                className="mobile_tab"
                                                onClick={() => handleTabClick('myResponses', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowHiddenDropDownMenu)}
                                            >
                                                Мои отклики
                                            </button>
                                            <button
                                                className="mobile_tab"
                                                onClick={() => handleTabClick('inProgress', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowHiddenDropDownMenu)}
                                            >
                                                В работе
                                            </button>
                                            <button
                                                className="mobile_tab"
                                                onClick={() => handleTabClick('forApproval', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowHiddenDropDownMenu)}
                                            >
                                                На Согласовании
                                            </button>
                                        </div>
                                    )}

                                </div>
                                {showMyResponsesProjects &&
                                    <div className='my_projects_items_wrapper'>
                                        {myResponsesProjectsList.map((item, index) => {
                                            return (
                                                <button
                                                    className='my_projects_item' key={index}
                                                    onClick={() => {
                                                        redirectToOrderPageForFreelancer(item?.id)
                                                    }}
                                                >
                                                    <div className="my_projects_item_name_address_info_wrapper">
                                                        <p className="my_projects_item_name">{item?.service_name}</p>
                                                        <p className="my_projects_item_address_info">{item?.service_address}</p>
                                                    </div>

                                                    <p className="my_projects_item_info">{item?.service_type_info}</p>
                                                    <div className='my_projects_item_pirce_date_info_wrapper'>
                                                        <div className='my_projects_item_pirce_wrapper'>
                                                            <p className='my_projects_item_pirce_info'>{item?.service_price}</p>
                                                        </div>
                                                        <div className='my_projects_item_date_hour_wrapper'>
                                                            <div className='my_projects_item_date_hour_title_icon_wrapper'>
                                                                <p className='my_projects_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                <DateIcon/>
                                                            </div>
                                                            <div className='my_projects_item_date_hour_info_wrapper'>
                                                                <p className='my_projects_item_date_hour_info1'>{item.service_date},</p>
                                                                <p className='my_projects_item_date_hour_info2'>{item.service_hour}</p>
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
                                }
                                {showInProgressProjects &&
                                    <div className='my_projects_items_wrapper'>
                                        {inProgressProjectsList.map((item, index) => {
                                            return (
                                                <button
                                                    className='my_projects_item' key={index}
                                                    onClick={() => {
                                                        redirectToOrderPageForFreelancer(item?.id)
                                                    }}
                                                >
                                                    <div className="my_projects_item_name_address_info_wrapper">
                                                        <p className="my_projects_item_name">{item?.service_name}</p>
                                                        <p className="my_projects_item_address_info">{item?.service_address}</p>
                                                    </div>

                                                    <p className="my_projects_item_info">{item?.service_type_info}</p>
                                                    <div className='my_projects_item_pirce_date_info_wrapper'>
                                                        <div className='my_projects_item_pirce_wrapper'>
                                                            <p className='my_projects_item_pirce_info'>{item?.service_price}</p>
                                                        </div>
                                                        <div className='my_projects_item_date_hour_wrapper'>
                                                            <div className='my_projects_item_date_hour_title_icon_wrapper'>
                                                                <p className='my_projects_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                <DateIcon/>
                                                            </div>
                                                            <div className='my_projects_item_date_hour_info_wrapper'>
                                                                <p className='my_projects_item_date_hour_info1'>{item.service_date},</p>
                                                                <p className='my_projects_item_date_hour_info2'>{item.service_hour}</p>
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
                                }
                                {showForApprovalProjects &&
                                    <div className='my_projects_items_wrapper'>
                                        {forApprovalProjectsList.map((item, index) => {
                                            return (
                                                <button
                                                    className='my_projects_item' key={index}
                                                    onClick={() => {
                                                        redirectToOrderPageForFreelancer(item?.id)
                                                    }}
                                                >
                                                    <div className="my_projects_item_name_address_info_wrapper">
                                                        <p className="my_projects_item_name">{item?.service_name}</p>
                                                        <p className="my_projects_item_address_info">{item?.service_address}</p>
                                                    </div>

                                                    <p className="my_projects_item_info">{item?.service_type_info}</p>
                                                    <div className='my_projects_item_pirce_date_info_wrapper'>
                                                        <div className='my_projects_item_pirce_wrapper'>
                                                            <p className='my_projects_item_pirce_info'>{item?.service_price}</p>
                                                        </div>
                                                        <div className='my_projects_item_date_hour_wrapper'>
                                                            <div className='my_projects_item_date_hour_title_icon_wrapper'>
                                                                <p className='my_projects_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                <DateIcon/>
                                                            </div>
                                                            <div className='my_projects_item_date_hour_info_wrapper'>
                                                                <p className='my_projects_item_date_hour_info1'>{item.service_date},</p>
                                                                <p className='my_projects_item_date_hour_info2'>{item.service_hour}</p>
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
                                }
                            </div>
                        }

                        {showForClient &&
                            <div className='my_projects_items_wrapper'>
                                    {clientProjectsList.map((item, index) => {
                                        return (
                                            <button
                                                className={item?.make_new_order ? 'my_projects_item2' : 'my_projects_item'}
                                                onClick={() => {
                                                    redirectToOrderPageForFreelancer(item?.id)
                                                }}
                                            >
                                                {item?.make_new_order  ?
                                                    <p className='make_new_order_title'>Создать новое задание</p>
                                                    :
                                                    <div style={{width: '100%'}}>
                                                        <div className="my_projects_item_name_address_info_wrapper">
                                                            <p className="my_projects_item_name">{item?.service_name}</p>
                                                            <p className="my_projects_item_state_info" style={{color: item?.canceled ? '#757575' : '#008000'}}>{item?.service_state}</p>
                                                        </div>
                                                        <p className="my_projects_item_info">{item?.service_type_info}</p>
                                                        <div className='my_projects_item_pirce_date_info_wrapper'>
                                                            <div className='my_projects_item_pirce_wrapper'>
                                                                <p className='my_projects_item_pirce_info'>{item?.service_price}</p>
                                                            </div>
                                                            <div className='my_projects_item_date_hour_wrapper'>
                                                                <div className='my_projects_item_date_hour_title_icon_wrapper'>
                                                                    <p className='my_projects_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                    <DateIcon/>
                                                                </div>
                                                                <div className='my_projects_item_date_hour_info_wrapper'>
                                                                    <p className='my_projects_item_date_hour_info1'>{item.service_date},</p>
                                                                    <p className='my_projects_item_date_hour_info2'>{item.service_hour}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                            </button>
                                        );
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
                        }


                    </div>
                </div>
                <Footer activePage={"my_project_page"}/>

            </main>
        </>
    );
}
