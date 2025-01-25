import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import ImageUploader from '../../../../includes/ImageUploader'
import FileUploader from '../../../../includes/FileUploader'
import Head from 'next/head';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import {LikesIcon2} from "@/components/icons/LikesIcon2";
import {DisLikesIcon2} from "@/components/icons/DisLikesIcon2";
import {useRouter} from "next/router";
import {useGetSelectedFreelancers} from "@/hooks/useGetSelectedFreelancers";
import {useGetFavorites} from "@/hooks/useGetFavorites";
import {useSelectFreelancer} from "@/hooks/useSelectFreelancer";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}



export default function OrderForClient ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showForEditing, setShowForEditing] = useState(false);
    const [showForResponses, setShowForResponses] = useState(false);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(true);
    const [showForSelectedUser, setShowForSelectedUser] = useState(false);

    const [featuredFreelancersList, setFeaturedFreelancersList] = useState([]);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('featuredFreelancers');
    const { getFavorites,  getFavoritesData } = useGetFavorites();
    const { getSelectedFreelancers,  selectedFreelancersData } = useGetSelectedFreelancers();
    const [showDisableSelectFreelancerButton, setShowDisableSelectFreelancerButton] = useState(false);
    const { selectFreelancer, loadingSelectFreelancer, selectFreelancerData } = useSelectFreelancer();


    useEffect(() => {
        getFavorites(id)
    }, [id]);



    useEffect(() => {
           if (getFavoritesData) {
               setFeaturedFreelancersList(getFavoritesData?.favorites)
           }
    }, [getFavoritesData]);

    useEffect(() => {
        if (getFavoritesData && selectedFreelancersData) {
            // Extract the freelancer ID from selectedFreelancersData
            const selectedFreelancerId = selectedFreelancersData.freelancer?.freelancerId;


            // Check if there is a match in responsesData for selectedFreelancer
            const isFreelancerSelected = responsesData.responses.some(
                response => response.freelancerId === selectedFreelancerId
            );


            // Set the states based on the matches
            setShowDisableSelectFreelancerButton(isFreelancerSelected);
        }
    }, [ selectedFreelancersData, getFavoritesData]);




    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };

    const handleTabClick = (tab, setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu) => {
        setSelectedTab(tab);
        if (tab === 'editing') {
            // setShowForEditing(true);
            // setShowForResponses(false);
            // setShowForFeaturedFreelancers(false);
            // setShowForSelectedUser(false);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/edit`);

        } else if (tab === 'responses') {
            // setShowForEditing(false);
            // setShowForResponses(true);
            // setShowForFeaturedFreelancers(false);
            // setShowForSelectedUser(false);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/responses`);
        } else if (tab === 'featuredFreelancers') {
            setShowForEditing(false);
            setShowForResponses(false);
            setShowForFeaturedFreelancers(true);
            setShowForSelectedUser(false);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/featured-freelancers`);

        } else if (tab === 'selectedUser') {
            setShowForEditing(false);
            setShowForResponses(false);
            setShowForFeaturedFreelancers(false);
            setShowForSelectedUser(true);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/selected-users`);
        }

    };

    const router = useRouter();
    const redirectToResponsesPage = () => {
        router.push(`/my-projects/client/${id}/responses`);
    };
    const redirectToEditPage = () => {
        router.push(`/my-projects/client/${id}/edit`);
    };
    const redirectToSelectedUsersPage = () => {
        router.push(`/my-projects/client/${id}/selected-users`);
    };

    const selectFavFreelancer = async (freelancerId) => {
        await selectFreelancer(id, freelancerId);
    };
    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper my_projects_for_client_page" id="my_projects_for_client_featured_freelancers_page">
                    <Header activePage='my_projects_for_client_page'/>
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>
                        <div className='my_project_single_page_tabs_wrapper'>
                            <button
                                className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForEditing(true)
                                    setShowForSelectedUser(false)
                                    setShowForResponses(false)
                                    setShowForFeaturedFreelancers(false)
                                    redirectToEditPage()

                                }}
                            >
                                Редактирование
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForResponses(true)
                                    setShowForSelectedUser(false)
                                    setShowForEditing(false)
                                    setShowForFeaturedFreelancers(false)
                                    redirectToResponsesPage()
                                }}
                            >
                                Отклики
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForFeaturedFreelancers(true)
                                    setShowForSelectedUser(false)
                                    setShowForEditing(false)
                                    setShowForResponses(false)
                                }}
                            >
                                Избранные фрилансеры
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForSelectedUser(true)
                                    setShowForEditing(false)
                                    setShowForResponses(false)
                                    setShowForFeaturedFreelancers(false)
                                    redirectToSelectedUsersPage()
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
                                    style={showHiddenDropDownMenu ? {transform: 'rotate(180deg)'} : {}}
                                >
                                    <DropDownIcon2/>
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
                            {featuredFreelancersList.length > 0 ? (
                                <div  className="order_single_page_items_wrapper">
                                    {featuredFreelancersList.map((item, index) => {
                                        return (
                                            <div className='order_single_page_item' key={index}>
                                                <div className="order_single_page_item_img_info_wrapper">
                                                    <div className="order_single_page_item_img">
                                                        {/*<Image*/}
                                                        {/*    src={item.user_img}*/}
                                                        {/*    alt="Example Image"*/}
                                                        {/*    layout="fill" // Fill the parent element*/}
                                                        {/*    objectFit="cover" // Cover the area of the parent element*/}
                                                        {/*    quality={100} // Image quality*/}
                                                        {/*/>*/}
                                                    </div>
                                                    <div className="order_single_page_item_info_box">
                                                        <p className="order_single_page_item_user_name">{item?.first_name} {item?.last_name}</p>
                                                        <div className="order_single_page_item_user_country_likes_info_wrapper">
                                                            <p className="order_single_page_item_user_country_name">
                                                                {item.user_country_name}
                                                            </p>
                                                            <div className="order_single_page_item_likes_info_box">
                                                                <div className="order_single_page_item_like_icon_info_wrapper">
                                                                    <LikesIcon2/>
                                                                    <p className="order_single_page_item_like_info">{item.likes}</p>
                                                                </div>
                                                                <div className="order_single_page_item_dislike_icon_info_wrapper">
                                                                    <DisLikesIcon2/>
                                                                    <p className="order_single_page_item_dislike_info">{item.dislikes}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='order_single_page_item_price_deadline_info'>
                                                            <p className="order_single_page_item_price">
                                                                {item.price}
                                                            </p>
                                                            <p className="order_single_page_item_deadline_info">
                                                                {item.deadline}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="order_single_page_item_review">
                                                    {item.review}
                                                </p>

                                                <div className="order_single_page_item_buttons_wrapper">
                                                    {showDisableSelectFreelancerButton ? (
                                                            <button
                                                                className="order_single_page_item_select_user_btn2"
                                                                style={{ opacity: 0.5 }}
                                                                disabled // Add disabled attribute for better UX
                                                            >
                                                                Выбрать исполнителем
                                                            </button>

                                                        )
                                                        : (
                                                            <button
                                                                className="order_single_page_item_select_user_btn2"
                                                                onClick={() => {
                                                                    selectFavFreelancer(item?.freelancerId)
                                                                }}
                                                            >
                                                                Выбрать исполнителем
                                                            </button>

                                                        )

                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                                :
                                (
                                    <p className='not_found_text'>Для этого заказа фрилансер не выбран.</p>

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

