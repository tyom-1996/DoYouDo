import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/my_projects.css';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Head from 'next/head';
import { DateIcon } from "@/components/icons/DateIcon";
import { PaginationLeftIcon } from "@/components/icons/paginationLeftIcon";
import { PaginationRightIcon } from "@/components/icons/paginationRightIcon";
import { useRouter } from 'next/router';
import { DropDownIcon2 } from "@/components/icons/DropDownIcon2";
import { useGetFreelancerResponses } from "@/hooks/useGetFreelancerResponses";

export default function MyProjectsForFreelancer () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showMyResponsesProjects, setShowMyResponsesProjects] = useState(true);
    const [showInProgressProjects, setShowInProgressProjects] = useState(false);
    const [showForApprovalProjects, setShowForApprovalProjects] = useState(false);
    const [showClosingProjectsList, setShowClosingProjectsList] = useState(false);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('myResponses');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { getFreelancerResponses, loading, freelancerResponsesData, totalPages } = useGetFreelancerResponses();
    const router = useRouter();

    useEffect(() => {
        if (selectedTab === 'myResponses') {
            getFreelancerResponses(page, limit);
        } else {
            // For other tabs, retrieve responses based on status
            const statusMap = {
                inProgress: ['in_progress'],
                forApproval: ['waiting_freelancer_response'],
                closed: ['closed']
            };
            getFreelancerResponses(page, limit, statusMap[selectedTab]);
        }
    }, [page, selectedTab]);

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

    const redirectToOrderPageForFreelancer = (id) => {
        router.push(`/my-projects/freelancer/order/${id}`);
    };

    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };

    // Simplified handleTabClick using closure for state setters
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        if (tab === 'myResponses') {
            setShowMyResponsesProjects(true);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(false);
            setShowClosingProjectsList(false);
        } else if (tab === 'inProgress') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(true);
            setShowForApprovalProjects(false);
            setShowClosingProjectsList(false);
        } else if (tab === 'forApproval') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(true);
            setShowClosingProjectsList(false);
        } else if (tab === 'closed') {
            setShowMyResponsesProjects(false);
            setShowInProgressProjects(false);
            setShowForApprovalProjects(false);
            setShowClosingProjectsList(true);
        }
        setShowHiddenDropDownMenu(false);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const month = monthNames[date.getMonth()];
        const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        return `${day}, ${month}, ${time}`;
    };

    return (
        <>
            <main className='general_page_wrapper' id='my_projects_for_freelancer_page'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"my_projects_for_freelancer_page"}/>
                </div>
                <div className="my_projects">
                    <div className="my_projects_wrapper">
                        <div style={{ width: '100%' }}>
                            <div className='my_project_tabs_wrapper'>
                                <button
                                    className={`my_project_tab ${showMyResponsesProjects ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowMyResponsesProjects(true);
                                        setShowInProgressProjects(false);
                                        setShowForApprovalProjects(false);
                                        setShowClosingProjectsList(false);
                                        setSelectedTab('myResponses');
                                    }}
                                >
                                    Мои отклики
                                </button>
                                <button
                                    className={`my_project_tab ${showInProgressProjects ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowInProgressProjects(true);
                                        setShowMyResponsesProjects(false);
                                        setShowForApprovalProjects(false);
                                        setShowClosingProjectsList(false);
                                        setSelectedTab('inProgress');
                                    }}
                                >
                                    В работе
                                </button>
                                <button
                                    className={`my_project_tab ${showForApprovalProjects ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowForApprovalProjects(true);
                                        setShowInProgressProjects(false);
                                        setShowMyResponsesProjects(false);
                                        setShowClosingProjectsList(false);
                                        setSelectedTab('forApproval');
                                    }}
                                >
                                    На Согласовании
                                </button>
                                <button
                                    className={`my_project_tab ${showClosingProjectsList ? 'active_tab' : ''}`}
                                    onClick={() => {
                                        setShowForApprovalProjects(false);
                                        setShowInProgressProjects(false);
                                        setShowMyResponsesProjects(false);
                                        setShowClosingProjectsList(true);
                                        setSelectedTab('closed');
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
                                        {selectedTab === 'closed' && 'Закрытие'}
                                    </p>
                                    <button
                                        className='dropdownHeader_icon'
                                        style={showHiddenDropDownMenu ? { transform: 'rotate(180deg)' } : {}}
                                    >
                                        <DropDownIcon2/>
                                    </button>
                                </div>
                                {showHiddenDropDownMenu && (
                                    <div className="tabsWrapper">
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('myResponses')}
                                        >
                                            Мои отклики
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('inProgress')}
                                        >
                                            В работе
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('forApproval')}
                                        >
                                            На Согласовании
                                        </button>
                                        <button
                                            className="mobile_tab"
                                            onClick={() => handleTabClick('closed')}
                                        >
                                            Закрытие
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='my_projects_items_wrapper2'>
                                {freelancerResponsesData.length > 0 ? (
                                    <div className='my_projects_items_wrapper'>
                                        { freelancerResponsesData.map((item, index) => {
                                            return (
                                                <button
                                                    className='my_projects_item'
                                                    key={index}
                                                    onClick={() => {
                                                        redirectToOrderPageForFreelancer(item?.order_id);
                                                    }}
                                                >
                                                    <div className="my_projects_item_name_address_info_wrapper">
                                                        <p className="my_projects_item_name">{item?.title}</p>
                                                        {item?.type !== 'remote' &&
                                                            <p className="my_projects_item_address_info">{item?.address}</p>
                                                        }
                                                    </div>
                                                    <p className="my_projects_item_info">{item?.description}</p>
                                                    <div className='my_projects_item_pirce_date_info_wrapper'>
                                                        <div className='my_projects_item_pirce_wrapper'>
                                                            <p className='my_projects_item_pirce_info'> {item?.order_price.toString().replace(/\.00$/, '')}</p>


                                                        </div>
                                                        <div className='my_projects_item_date_hour_wrapper'>
                                                            <div className='my_projects_item_date_hour_title_icon_wrapper'>
                                                                <p className='my_projects_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                <DateIcon/>
                                                            </div>
                                                            <div className='my_projects_item_date_hour_info_wrapper'>
                                                                <p className='my_projects_item_date_hour_info1'>{formatDate(item?.start_date)}</p>
                                                                {/*<p className='my_projects_item_date_hour_info2'>{item.service_hour}</p>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className='not_found_text'>Нет проекта</p>
                                )

                                }

                                {/*<div className="pagination_links_wrapper">*/}
                                {/*    <button className="pagination_link_btn">*/}
                                {/*        <PaginationLeftIcon/>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link">*/}
                                {/*        <p className="pagination_link_title">1</p>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link active">*/}
                                {/*        <p className="pagination_link_title">2</p>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link">*/}
                                {/*        <p className="pagination_link_title">3</p>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link">*/}
                                {/*        <p className="pagination_link_title">4</p>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link">*/}
                                {/*        <p className="pagination_link_title">....</p>*/}
                                {/*    </button>*/}
                                {/*    <button className="pagination_link_btn">*/}
                                {/*        <PaginationRightIcon/>*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer activePage={"my_projects_for_freelancer_page"}/>
            </main>
        </>
    );
}
