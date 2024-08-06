import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/my_projects.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import { useRouter } from 'next/router';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";

export default function MyProjectsForClient () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [myResponsesProjectsList, setMyResponsesProjectsList] = useState([
        {
            id: 1,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: true,
        },
        {
            id: 2,
            service_name: 'Дизайн2',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 3,
            service_name: 'Дизайн3',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 4,
            service_name: 'Дизайн4',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 5,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 6,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
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
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: true,
        },
        {
            id: 2,
            service_name: 'Дизайн25',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 3,
            service_name: 'Дизайн30',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 4,
            service_name: 'Дизайн4',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 5,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 6,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
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
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: true,
        },
        {
            id: 2,
            service_name: 'Дизайн80',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false,
        },
        {
            id: 3,
            service_name: 'Дизайн100',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 4,
            service_name: 'Дизайн4',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 5,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 6,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: false
        },

    ]);
    const [closingProjectsList, setClosingProjectsList] = useState([
        {
            id: 1,
            service_name: 'Дизайн500',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
            make_new_order: true
        },
        {
            id: 2,
            service_name: 'Дизайн3000',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 3,
            service_name: 'Дизайн100',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 4,
            service_name: 'Дизайн45',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 5,
            service_name: 'Дизайн87',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 6,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 7,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 8,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 9,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },
        {
            id: 10,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: 'Адрес: 6666 466 метров от вас',
             make_new_order: false
        },

    ]);
    const [showMyResponsesProjects, setShowMyResponsesProjects] = useState(true);
    const [showInProgressProjects, setShowInProgressProjects] = useState(false);
    const [showForApprovalProjects, setShowForApprovalProjects] = useState(false);
    const [showClosingProjectsList, setShowClosingProjectsList] = useState(false);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('myResponses');


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const router = useRouter();

    const redirectToOrderPageForClient = (id) => {
        router.push(`/my-projects/client/${id}/edit`);
    };
    const redirectToCreateOrderPage = () => {
        router.push('create-order');
    };
    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };
    const handleTabClick = (tab, setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowClosingProjectsList, setShowHiddenDropDownMenu) => {
        setSelectedTab(tab);
        if (tab === 'myResponses') {
            setShowMyResponsesProjects(true);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(false);
            setShowClosingProjectsList(false);
        } else if (tab === 'inProgress') {
            setShowClosingProjectsList(false);
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(true);
            setShowForApprovalProjects(false);
        } else if (tab === 'forApproval') {
            setShowClosingProjectsList(false);
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(true);

        } else if (tab === 'closing') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(false);
            setShowClosingProjectsList(true)
        }
        setShowHiddenDropDownMenu(false);
    };


    return (
        <>
            <main className='general_page_wrapper' id='my_projects_for_client_page'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"my_projects_for_client_page"}/>
                </div>
                <div className="my_projects">
                    <div className="my_projects_wrapper">
                        <div style={{width: '100%'}}>
                            <div className='my_project_tabs_wrapper'>
                                <button
                                    className={`my_project_tab ${showMyResponsesProjects ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowMyResponsesProjects(true)
                                        setShowInProgressProjects(false)
                                        setShowForApprovalProjects(false)
                                        setShowClosingProjectsList(false)
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
                                        setShowClosingProjectsList(false)
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
                                        setShowClosingProjectsList(false)
                                    }}
                                >
                                    На Согласовании
                                </button>
                                <button
                                    className={`my_project_tab ${showClosingProjectsList ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowForApprovalProjects(false)
                                        setShowInProgressProjects(false)
                                        setShowMyResponsesProjects(false)
                                        setShowClosingProjectsList(true)
                                    }}
                                >
                                    Закрытие
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
                                        {selectedTab === 'closing' && 'Закрытие'}
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
                                            onClick={() => handleTabClick('myResponses', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowClosingProjectsList, setShowHiddenDropDownMenu)}
                                        >
                                            Мои отклики
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('inProgress', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowClosingProjectsList, setShowHiddenDropDownMenu)}
                                        >
                                            В работе
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('forApproval', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowClosingProjectsList, setShowHiddenDropDownMenu)}
                                        >
                                            На Согласовании
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('closing', setSelectedTab, setShowMyResponsesProjects, setShowInProgressProjects, setShowForApprovalProjects, setShowClosingProjectsList, setShowHiddenDropDownMenu)}
                                        >
                                            Закрытие
                                        </button>
                                    </div>
                                )}

                            </div>
                            {showMyResponsesProjects &&
                                <div className='my_projects_items_wrapper'>
                                    {myResponsesProjectsList.map((item, index) => {
                                        return (
                                            <button
                                                className={item?.make_new_order ? 'my_projects_item2' : 'my_projects_item'}
                                                    onClick={() => {
                                                        {item?.make_new_order ?
                                                            redirectToCreateOrderPage()
                                                            :
                                                            redirectToOrderPageForClient(item?.id)
                                                        }

                                                    }}
                                                >
                                                {item?.make_new_order  ?
                                                    <p className='make_new_order_title'>Создать новое задание</p>
                                                    :
                                                    <div style={{width: '100%'}}>
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
                                                    </div>
                                                }

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
                                                className={item?.make_new_order ? 'my_projects_item2' : 'my_projects_item'}
                                                onClick={() => {
                                                    {item?.make_new_order ?
                                                        redirectToCreateOrderPage()
                                                        :
                                                        redirectToOrderPageForClient(item?.id)
                                                    }

                                                }}
                                            >
                                                {item?.make_new_order  ?
                                                    <p className='make_new_order_title'>Создать новое задание</p>
                                                    :
                                                    <div style={{width: '100%'}}>
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
                                                    </div>
                                                }

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
                                                className={item?.make_new_order ? 'my_projects_item2' : 'my_projects_item'}
                                                onClick={() => {
                                                    {item?.make_new_order ?
                                                        redirectToCreateOrderPage()
                                                        :
                                                        redirectToOrderPageForClient(item?.id)
                                                    }

                                                }}
                                            >
                                                {item?.make_new_order  ?
                                                    <p className='make_new_order_title'>Создать новое задание</p>
                                                    :
                                                    <div style={{width: '100%'}}>
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
                                                    </div>
                                                }

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
                            {showClosingProjectsList &&
                                <div className='my_projects_items_wrapper'>
                                    {closingProjectsList.map((item, index) => {
                                        return (
                                            <button
                                                className={item?.make_new_order ? 'my_projects_item2' : 'my_projects_item'}
                                                onClick={() => {
                                                    {item?.make_new_order ?
                                                        redirectToCreateOrderPage()
                                                        :
                                                        redirectToOrderPageForClient(item?.id)
                                                    }

                                                }}
                                            >
                                                {item?.make_new_order  ?
                                                    <p className='make_new_order_title'>Создать новое задание</p>
                                                    :
                                                    <div style={{width: '100%'}}>
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
                                                    </div>
                                                }

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
                    </div>
                </div>
                <Footer activePage={"my_projects_for_client_page"}/>

            </main>
        </>
    );
}
