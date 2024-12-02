import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import { DropDownIcon2 } from "@/components/icons/DropDownIcon2";
import { LikesIcon2 } from "@/components/icons/LikesIcon2";
import { DisLikesIcon2 } from "@/components/icons/DisLikesIcon2";
import { useRouter } from "next/router";
import { useGetResponses } from "@/hooks/useGetResponses";
import { useSelectFreelancer } from "@/hooks/useSelectFreelancer";
import { useAddFavorites } from "@/hooks/useAddFavorites";

export async function getServerSideProps({ params }) {
    const id = params.id;
    return {
        props: {
            id,
        }
    };
}

export default function OrderForClient({ id }) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showForEditing, setShowForEditing] = useState(false);
    const [showForResponses, setShowForResponses] = useState(true);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
    const [showForSelectedUser, setShowForSelectedUser] = useState(false);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [myResponsesList, setMyResponsesList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('responses');
    const [selectedFreelancerId, setSelectedFreelancerId] = useState(null); // Track selected freelancer ID
    const { getResponses, loadingUserInfo, responsesData } = useGetResponses();
    const { selectFreelancer, loadingSelectFreelancer, selectFreelancerData } = useSelectFreelancer();
    const {addFavorites, loadingAddFavorites,addFavoritesData  } = useAddFavorites();

    useEffect(() => {
        if (responsesData) {
            setMyResponsesList(responsesData?.responses);
        }
    }, [responsesData]);

    useEffect(() => {
        if (selectFreelancerData) {
            if (selectFreelancerData?.message == "Freelancer successfully selected as performer") {
                setSelectedFreelancerId(selectFreelancerData?.freelancerId);
            }
        }
    }, [selectFreelancerData]);


    useEffect(() => {
        getResponses(2);
    }, [2]);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };

    const handleTabClick = (tab, setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu) => {
        setSelectedTab(tab);
        const pageId = id;
        if (tab === 'editing') {
            router.push(`/my-projects/client/${pageId}/edit`);
        } else if (tab === 'responses') {
            router.push(`/my-projects/client/${pageId}/responses`);
        } else if (tab === 'featuredFreelancers') {
            router.push(`/my-projects/client/${pageId}/featured-freelancers`);
        } else if (tab === 'selectedUser') {
            router.push(`/my-projects/client/${pageId}/selected-users`);
        }
        setShowHiddenDropDownMenu(false);
    };

    const router = useRouter();
    const redirectToFeaturedFreelancersPage = () => {
        const pageId = id;
        router.push(`/my-projects/client/${pageId}/featured-freelancers`);
    };
    const redirectToEditPage = () => {
        const pageId = id;
        router.push(`/my-projects/client/${pageId}/edit`);
    };
    const redirectToSelectedUsersPage = () => {
        const pageId = id;
        router.push(`/my-projects/client/${pageId}/selected-users`);
    };

    const formattedNumber = (number) => {
        return number.toString().replace(/\.00$/, '');
    };

    const selectFavFreelancer = async (responseId) => {
        const id = 11;
        await selectFreelancer(id, responseId);
    };
    const addToFavoritesList = async (freelancerId) => {
        const id = 11;
        await addFavorites(id, freelancerId);
    };

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                </Head>
                <div className="home_general_wrapper my_projects_for_client_page" id="my_projects_for_client_resposes_page">
                    <Header activePage='my_projects_for_client_page' />
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>
                        <div className='my_project_single_page_tabs_wrapper'>
                            <button
                                className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForEditing(true);
                                    setShowForSelectedUser(false);
                                    setShowForResponses(false);
                                    setShowForFeaturedFreelancers(false);
                                    redirectToEditPage();
                                }}
                            >
                                Редактирование
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForResponses(true);
                                    setShowForSelectedUser(false);
                                    setShowForEditing(false);
                                    setShowForFeaturedFreelancers(false);
                                }}
                            >
                                Отклики
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForFeaturedFreelancers(true);
                                    setShowForSelectedUser(false);
                                    setShowForEditing(false);
                                    setShowForResponses(false);
                                    redirectToFeaturedFreelancersPage();
                                }}
                            >
                                Избранные фрилансеры
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForSelectedUser(true);
                                    setShowForEditing(false);
                                    setShowForResponses(false);
                                    setShowForFeaturedFreelancers(false);
                                    redirectToSelectedUsersPage();
                                }}
                            >
                                Выбранный исполнитель
                            </button>
                        </div>
                        <div className="dropdownWrapper">
                            <div
                                className="dropdownHeader2"
                                onClick={handleDropdownClick}
                            >
                                <p className='dropdownHeader_title'>
                                    {selectedTab === 'editing' && 'Редактирование'}
                                    {selectedTab === 'responses' && 'Отклики'}
                                    {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
                                    {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
                                </p>

                                <button
                                    className='dropdownHeader_icon'
                                    style={showHiddenDropDownMenu ? { transform: 'rotate(180deg)' } : {}}
                                >
                                    <DropDownIcon2 />
                                </button>
                            </div>
                            {showHiddenDropDownMenu && (
                                <div className="tabsWrapper">
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('editing', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Редактирование
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('responses', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Отклики
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('featuredFreelancers', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Избранные фрилансеры
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('selectedUser', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Выбранный исполнитель
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="order_single_page_items_wrapper">
                            {myResponsesList && myResponsesList?.map((item, index) => {
                                return (
                                    <div className='order_single_page_item' key={index}>
                                        <div className="order_single_page_item_img_info_wrapper">
                                            <div className="order_single_page_item_info_box">
                                                <p className="order_single_page_item_user_name">{item?.first_name} {item?.last_name}</p>
                                                <div className='order_single_page_item_price_deadline_info'>
                                                    <p className="order_single_page_item_price">
                                                        {formattedNumber(item?.price)}
                                                    </p>
                                                    <p className="order_single_page_item_deadline_info">
                                                        {item?.days_to_complete}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="order_single_page_item_review">
                                            {item?.response_text}
                                        </p>
                                        <div className="order_single_page_item_buttons_wrapper">
                                            {selectedFreelancerId === item.id ? (
                                                <div className='order_single_page_item_select_user_btn'>
                                                    <p>Выбранный исполнитель</p>
                                                </div>
                                            ) : (
                                                <button
                                                    className="order_single_page_item_select_user_btn"
                                                    onClick={() => {
                                                        selectFavFreelancer(item?.id);
                                                    }}
                                                >
                                                    Выбрать исполнителем
                                                </button>
                                            )}
                                            <button
                                                className="order_single_page_item_add_to_favourites_btn"
                                                onClick={() => {
                                                    addToFavoritesList(item?.id);
                                                }}
                                            >
                                                В избранные
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
                <Footer activePage='my_projects_for_client_page' />

            </main>
        </>
    );
}
