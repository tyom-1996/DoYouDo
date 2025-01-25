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
import {useGetSelectedFreelancers} from "@/hooks/useGetSelectedFreelancers";
import {useGetFavorites} from "@/hooks/useGetFavorites";

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
    const { getSelectedFreelancers,  selectedFreelancersData } = useGetSelectedFreelancers();
    const { getFavorites,  getFavoritesData } = useGetFavorites();
    const { selectFreelancer, loadingSelectFreelancer, selectFreelancerData } = useSelectFreelancer();
    const {addFavorites, loadingAddFavorites,addFavoritesData  } = useAddFavorites();
    const [showDisableSelectFreelancerButton, setShowDisableSelectFreelancerButton] = useState(false);
    const [showDisableFavoriteButton, setShowDisableFavoriteButton] = useState(false);

    useEffect(() => {
         getSelectedFreelancers(id)
    }, [id]);

    useEffect(() => {
        getFavorites(id)
    }, [id]);


    useEffect(() => {
        if (responsesData && selectedFreelancersData && getFavoritesData) {
            const selectedFreelancerId = selectedFreelancersData.freelancer?.freelancerId;
            const favoriteFreelancerIds = getFavoritesData.favorites.map(favorite => favorite.freelancerId);

            // Enrich responses data with flags
            const updatedResponses = responsesData.responses.map(response => {
                return {
                    ...response,
                    isWaiting: response.freelancer_id === selectedFreelancerId,
                    isInFavorites: favoriteFreelancerIds.includes(response.freelancer_id),
                };
            });

            setMyResponsesList(updatedResponses);

            // Debugging
            console.log('Updated Responses:', updatedResponses);
            console.log('Selected Freelancer ID:', selectedFreelancerId);
            console.log('Favorite Freelancer IDs:', favoriteFreelancerIds);
        }
    }, [responsesData, selectedFreelancersData, getFavoritesData]);


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
        getResponses(id);
    }, [id]);



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
        if (tab === 'editing') {
            router.push(`/my-projects/client/${id}/edit`);
        } else if (tab === 'responses') {
            router.push(`/my-projects/client/${id}/responses`);
        } else if (tab === 'featuredFreelancers') {
            router.push(`/my-projects/client/${id}/featured-freelancers`);
        } else if (tab === 'selectedUser') {
            router.push(`/my-projects/client/${id}/selected-users`);
        }
        setShowHiddenDropDownMenu(false);
    };

    const router = useRouter();
    const redirectToFeaturedFreelancersPage = () => {
        router.push(`/my-projects/client/${id}/featured-freelancers`);
    };
    const redirectToEditPage = () => {
        router.push(`/my-projects/client/${id}/edit`);
    };
    const redirectToSelectedUsersPage = () => {
        router.push(`/my-projects/client/${id}/selected-users`);
    };

    const formattedNumber = (number) => {
        return number.toString().replace(/\.00$/, '');
    };

    const selectFavFreelancer = async (responseId) => {
        alert('hhh')
        await selectFreelancer(id, responseId);
    };
    const addToFavoritesList = async (freelancerId) => {
        alert('bbb')
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

                        <div style={{width: '100%'}} >
                            {myResponsesList.length > 0 ?  (
                                <div className="order_single_page_items_wrapper">
                                    {myResponsesList?.map((item, index) => {
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
                                                    {/* "Select as Performer" Button */}
                                                    {item.isWaiting ? (
                                                        <button
                                                            className="order_single_page_item_select_user_btn"
                                                            style={{opacity: 1, fontSize: 14}}
                                                            disabled
                                                        >
                                                            Ожидание ответа от исполнителя
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="order_single_page_item_select_user_btn"
                                                            style={{opacity: selectedFreelancersData?.freelancer ? 0.5 : 1}}
                                                            disabled={!!selectedFreelancersData?.freelancer}
                                                            onClick={() => selectFavFreelancer(item.freelancer_id)}
                                                        >
                                                            Выбрать исполнителем
                                                        </button>
                                                    )}

                                                    {/* "Add to Favorites" Button */}
                                                    {item.isInFavorites ? (
                                                        <button
                                                            className="order_single_page_item_add_to_favourites_btn"
                                                            style={{ opacity: 1 }}
                                                            disabled
                                                        >
                                                            В избранных
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="order_single_page_item_add_to_favourites_btn"
                                                            style={{ opacity: selectedFreelancersData?.freelancer ? 0.5 : 1 }}
                                                            disabled={!!selectedFreelancersData?.freelancer}
                                                            onClick={() => addToFavoritesList(item.freelancer_id)}
                                                        >
                                                            В избранные
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className='not_found_text'>Откликов нет</p>

                            )
                            }

                        </div>

                    </div>

                </div>
                <Footer activePage='my_projects_for_client_page'/>

            </main>
        </>
    );
}
