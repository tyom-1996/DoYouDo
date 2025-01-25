// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import '../../../../../assets/css/order_for_client.css';
// import Header from '../../../../../components/header'
// import Footer from '../../../../../components/footer'
// import Head from 'next/head';
// import 'react-datepicker/dist/react-datepicker.css';
// import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
// import {LikesIcon2} from "@/components/icons/LikesIcon2";
// import {DisLikesIcon2} from "@/components/icons/DisLikesIcon2";
// import {useRouter} from "next/router";
// import {useGetSelectedFreelancers} from "@/hooks/useGetSelectedFreelancers";
// import {log} from "next/dist/server/typescript/utils";
//
// export async function getServerSideProps({ params }) {
//     const id = params.id;
//     console.log(params, 'params_____')
//     return {
//         props: {
//             id,
//         }
//     };
// }
//
//
//
// export default function OrderForClient (id) {
//     const [windowHeight, setWindowHeight] = useState(0);
//     const [showForEditing, setShowForEditing] = useState(false);
//     const [showForResponses, setShowForResponses] = useState(false);
//     const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
//     const [showForSelectedUser, setShowForSelectedUser] = useState(true);
//     const [selectedUsersList, setSelectedUsersList] = useState([
//         {
//             id: 1,
//             user_img: '/order_page_user_img.png',
//             user_name: 'Sarah Williams',
//             user_country_name: '24 года, Москва',
//             likes: '43',
//             dislikes: '10',
//             price: '1000 руб.',
//             deadline: 'Сделаю 06 июня',
//             review: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.',
//
//         },
//         {
//             id: 2,
//             user_img: '/order_page_user_img.png',
//             user_name: 'Sarah Williams',
//             user_country_name: '24 года, Москва',
//             likes: '43',
//             dislikes: '10',
//             price: '1000 руб.',
//             deadline: 'Сделаю 06 июня',
//             review: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.',
//
//         },
//         {
//             id: 3,
//             user_img: '/order_page_user_img.png',
//             user_name: 'Sarah Williams',
//             user_country_name: '24 года, Москва',
//             likes: '43',
//             dislikes: '10',
//             price: '1000 руб.',
//             deadline: 'Сделаю 06 июня',
//             review: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.',
//
//         },
//     ]);
//     const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
//     const [selectedTab, setSelectedTab] = useState('selectedUser');
//     const [showClosingStateBtn, setShowClosingStateBtn] = useState(true);
//     const [selectedFreelancersList, setSelectedFreelancersList] = useState(null);
//     const { getSelectedFreelancers, loadingSelectedFreelancers, selectedFreelancersData } = useGetSelectedFreelancers();
//
//
//     useEffect(() => {
//         const id = 11;
//         getSelectedFreelancers(id)
//
//     }, []);
//
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             setWindowHeight(window.innerHeight);
//         }
//     }, []);
//
//     const handleDropdownClick = () => {
//         setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
//     };
//
//     const handleTabClick = (tab, setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu) => {
//         setSelectedTab(tab);
//         if (tab === 'editing') {
//             // setShowForEditing(true);
//             // setShowForResponses(false);
//             // setShowForFeaturedFreelancers(false);
//             // setShowForSelectedUser(false);
//             setShowHiddenDropDownMenu(false);
//             let pageId = id?.id;
//             router.push(`/my-projects/client/${pageId}/edit`);
//
//         } else if (tab === 'responses') {
//             // setShowForEditing(false);
//             // setShowForResponses(true);
//             // setShowForFeaturedFreelancers(false);
//             // setShowForSelectedUser(false);
//             setShowHiddenDropDownMenu(false);
//             let pageId = id?.id;
//             router.push(`/my-projects/client/${pageId}/responses`);
//         } else if (tab === 'featuredFreelancers') {
//             setShowForEditing(false);
//             setShowForResponses(false);
//             setShowForFeaturedFreelancers(true);
//             setShowForSelectedUser(false);
//             setShowHiddenDropDownMenu(false);
//             let pageId = id?.id;
//             router.push(`/my-projects/client/${pageId}/featured-freelancers`);
//
//         } else if (tab === 'selectedUser') {
//             setShowForEditing(false);
//             setShowForResponses(false);
//             setShowForFeaturedFreelancers(false);
//             setShowForSelectedUser(true);
//             setShowHiddenDropDownMenu(false);
//             let pageId = id?.id;
//             router.push(`/my-projects/client/${pageId}/selected-users`);
//         }
//
//     };
//     const router = useRouter();
//     const redirectToResponsesPage = () => {
//         let pageId = id?.id;
//         router.push(`/my-projects/client/${pageId}/responses`);
//     };
//     const redirectToFeaturedFreelancersPage = () => {
//         let pageId = id?.id;
//         router.push(`/my-projects/client/${pageId}/featured-freelancers`);
//     };
//     const redirectToEditPage = () => {
//         let pageId = id?.id;
//         router.push(`/my-projects/client/${pageId}/edit`);
//     };
//
//
//
//     return (
//         <>
//             <main className='general_page_wrapper'>
//                 <Head>
//                     <title>Мои проекты</title>
//                     <meta name="dwsdwdwd" content="This is the home page" />
//                     <meta charSet="UTF-8"/>
//                     <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
//                     <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
//
//                 </Head>
//                 <div className="home_general_wrapper my_projects_for_client_page" id="my_projects_for_client_selected_user_page">
//                     <Header activePage='my_projects_for_client_page'/>
//                     <div className="create_order_page_wrapper">
//                         <h1 className="create_order_page_title">Страница заказа</h1>
//                         <div className='my_project_single_page_tabs_wrapper'>
//                             <button
//                                 className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
//                                 onClick={() => {
//                                     setShowForEditing(true)
//                                     setShowForSelectedUser(false)
//                                     setShowForResponses(false)
//                                     setShowForFeaturedFreelancers(false)
//                                     redirectToEditPage()
//
//                                 }}
//                             >
//                                 Редактирование
//                             </button>
//                             <button
//                                 className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
//                                 onClick={() => {
//                                     setShowForResponses(true)
//                                     setShowForSelectedUser(false)
//                                     setShowForEditing(false)
//                                     setShowForFeaturedFreelancers(false)
//                                     redirectToResponsesPage()
//                                 }}
//                             >
//                                 Отклики
//                             </button>
//                             <button
//                                 className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
//                                 onClick={() => {
//                                     setShowForFeaturedFreelancers(true)
//                                     setShowForSelectedUser(false)
//                                     setShowForEditing(false)
//                                     setShowForResponses(false)
//                                     redirectToFeaturedFreelancersPage()
//                                 }}
//                             >
//                                 Избранные фрилансеры
//                             </button>
//                             <button
//                                 className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
//                                 onClick={() => {
//                                     setShowForSelectedUser(true)
//                                     setShowForEditing(false)
//                                     setShowForResponses(false)
//                                     setShowForFeaturedFreelancers(false)
//                                 }}
//                             >
//                                 Выбранный исполнитель
//                             </button>
//                         </div>
//                         <div className="dropdownWrapper">
//                             <div
//                                 className="dropdownHeader2"
//                                 onClick={handleDropdownClick}
//                             >
//                                 <p className='dropdownHeader_title'>
//                                     {selectedTab === 'editing' && 'Редактирование'}
//                                     {selectedTab === 'responses' && 'Отклики'}
//                                     {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
//                                     {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
//                                 </p>
//
//                                 <button
//                                     className='dropdownHeader_icon'
//                                     style={showHiddenDropDownMenu ? {transform: 'rotate(180deg)'} : {}}
//                                 >
//                                     <DropDownIcon2/>
//                                 </button>
//                             </div>
//                             {showHiddenDropDownMenu && (
//                                 <div className="tabsWrapper">
//                                     <button
//                                         className="mobile_tab"
//                                         onClick={() => handleTabClick('editing', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
//                                     >
//                                         Редактирование
//                                     </button>
//                                     <button
//                                         className="mobile_tab"
//                                         onClick={() => handleTabClick('responses', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
//                                     >
//                                         Отклики
//                                     </button>
//                                     <button
//                                         className="mobile_tab"
//                                         onClick={() => handleTabClick('featuredFreelancers', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
//                                     >
//                                         Избранные фрилансеры
//                                     </button>
//                                     <button
//                                         className="mobile_tab"
//                                         onClick={() => handleTabClick('selectedUser', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
//                                     >
//                                         Выбранный исполнитель
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="order_single_page_items_wrapper">
//                                 {/*{selectedUsersList.map((item, index) => {*/}
//                                 {/*    return (*/}
//                                 {/*        <div className='order_single_page_item' key={index}>*/}
//                                 {/*            <div className="order_single_page_item_img_info_wrapper">*/}
//                                 {/*                <div className="order_single_page_item_img">*/}
//                                 {/*                    <Image*/}
//                                 {/*                        src={item.user_img}*/}
//                                 {/*                        alt="Example Image"*/}
//                                 {/*                        layout="fill" // Fill the parent element*/}
//                                 {/*                        objectFit="cover" // Cover the area of the parent element*/}
//                                 {/*                        quality={100} // Image quality*/}
//                                 {/*                    />*/}
//                                 {/*                </div>*/}
//                                 {/*                <div className="order_single_page_item_info_box">*/}
//                                 {/*                    <p className="order_single_page_item_user_name">{item.user_name}</p>*/}
//                                 {/*                    <div className="order_single_page_item_user_country_likes_info_wrapper">*/}
//                                 {/*                        <p className="order_single_page_item_user_country_name">*/}
//                                 {/*                            {item.user_country_name}*/}
//                                 {/*                        </p>*/}
//                                 {/*                        <div className="order_single_page_item_likes_info_box">*/}
//                                 {/*                            <div className="order_single_page_item_like_icon_info_wrapper">*/}
//                                 {/*                                <LikesIcon2/>*/}
//                                 {/*                                <p className="order_single_page_item_like_info">{item.likes}</p>*/}
//                                 {/*                            </div>*/}
//                                 {/*                            <div className="order_single_page_item_dislike_icon_info_wrapper">*/}
//                                 {/*                                <DisLikesIcon2/>*/}
//                                 {/*                                <p className="order_single_page_item_dislike_info">{item.dislikes}</p>*/}
//                                 {/*                            </div>*/}
//                                 {/*                        </div>*/}
//                                 {/*                    </div>*/}
//                                 {/*                    <div className='order_single_page_item_price_deadline_info'>*/}
//                                 {/*                        <p className="order_single_page_item_price">*/}
//                                 {/*                            {item.price}*/}
//                                 {/*                        </p>*/}
//                                 {/*                        <p className="order_single_page_item_deadline_info">*/}
//                                 {/*                            {item.deadline}*/}
//                                 {/*                        </p>*/}
//                                 {/*                    </div>*/}
//                                 {/*                </div>*/}
//                                 {/*            </div>*/}
//                                 {/*            <p className="order_single_page_item_review">*/}
//                                 {/*                {item.review}*/}
//                                 {/*            </p>*/}
//                                 {/*            <div className="order_single_page_item_buttons_wrapper">*/}
//                                 {/*                {showClosingStateBtn &&*/}
//                                 {/*                    <button className="order_single_page_item_waiting_for_a_response_btn">Ожидание ответа от исполнителья</button>*/}
//                                 {/*                }*/}
//                                 {/*                {!showClosingStateBtn &&*/}
//                                 {/*                    <button className="order_single_page_item_chat_btn">В Чат</button>*/}
//                                 {/*                }*/}
//
//                                 {/*            </div>*/}
//                                 {/*        </div>*/}
//                                 {/*    )*/}
//                                 {/*})}*/}
//                                 {selectedFreelancersData && selectedFreelancersData?.freelancer && Object.entries(selectedFreelancersData?.freelancer).map(([index, item]) => (
//
//                                     <div className='order_single_page_item' key={index}>
//                                         <div className="order_single_page_item_img_info_wrapper">
//                                             {/*<div className="order_single_page_item_img">*/}
//                                             {/*    <Image*/}
//                                             {/*        src={item.user_img}*/}
//                                             {/*        alt="Example Image"*/}
//                                             {/*        layout="fill" // Fill the parent element*/}
//                                             {/*        objectFit="cover" // Cover the area of the parent element*/}
//                                             {/*        quality={100} // Image quality*/}
//                                             {/*    />*/}
//                                             {/*</div>*/}
//                                             <div className="order_single_page_item_info_box">
//                                                 {console.log(item, 'iteemmmmmpppppp')}
//                                                 <p className="order_single_page_item_user_name">{item?.first_name} {item?.last_name}</p>
//                                                 {/*<div className="order_single_page_item_user_country_likes_info_wrapper">*/}
//                                                 {/*    <p className="order_single_page_item_user_country_name">*/}
//                                                 {/*        {item.user_country_name}*/}
//                                                 {/*    </p>*/}
//                                                 {/*    <div className="order_single_page_item_likes_info_box">*/}
//                                                 {/*        <div className="order_single_page_item_like_icon_info_wrapper">*/}
//                                                 {/*            <LikesIcon2/>*/}
//                                                 {/*            <p className="order_single_page_item_like_info">{item.likes}</p>*/}
//                                                 {/*        </div>*/}
//                                                 {/*        <div className="order_single_page_item_dislike_icon_info_wrapper">*/}
//                                                 {/*            <DisLikesIcon2/>*/}
//                                                 {/*            <p className="order_single_page_item_dislike_info">{item.dislikes}</p>*/}
//                                                 {/*        </div>*/}
//                                                 {/*    </div>*/}
//                                                 {/*</div>*/}
//                                                 {/*<div className='order_single_page_item_price_deadline_info'>*/}
//                                                 {/*    <p className="order_single_page_item_price">*/}
//                                                 {/*        {item.price}*/}
//                                                 {/*    </p>*/}
//                                                 {/*    <p className="order_single_page_item_deadline_info">*/}
//                                                 {/*        {item.deadline}*/}
//                                                 {/*    </p>*/}
//                                                 {/*</div>*/}
//                                             </div>
//                                         </div>
//                                         {/*<p className="order_single_page_item_review">*/}
//                                         {/*    {item.review}*/}
//                                         {/*</p>*/}
//                                         <div className="order_single_page_item_buttons_wrapper">
//                                             {showClosingStateBtn &&
//                                                 <button className="order_single_page_item_waiting_for_a_response_btn">Ожидание ответа от исполнителья</button>
//                                             }
//                                             {!showClosingStateBtn &&
//                                                 <button className="order_single_page_item_chat_btn">В Чат</button>
//                                             }
//
//                                         </div>
//                                     </div>
//
//                                 ))}
//
//                         </div>
//
//                     </div>
//
//                 </div>
//                 <Footer activePage='my_projects_for_client_page'/>
//
//             </main>
//         </>
//     );
// }


import React, { useEffect, useState } from 'react';
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header';
import Footer from '../../../../../components/footer';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import {useRouter} from "next/router";
import {useGetSelectedFreelancers} from "@/hooks/useGetSelectedFreelancers";

export async function getServerSideProps({ params }) {
    const { id } = params;
    return {
        props: { id },
    };
}

export default function OrderForClient({ id }) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showForEditing, setShowForEditing] = useState(false);
    const [showForResponses, setShowForResponses] = useState(false);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
    const [showForSelectedUser, setShowForSelectedUser] = useState(true);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('selectedUser');
    const [showClosingStateBtn, setShowClosingStateBtn] = useState(true);

    const { getSelectedFreelancers, loadingSelectedFreelancers, selectedFreelancersData } = useGetSelectedFreelancers();

    const router = useRouter();

    useEffect(() => {
        if (id) {
            getSelectedFreelancers(id);
        }
    }, [id]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);

        switch (tab) {
            case 'editing':
                redirectToEditPage();
                break;
            case 'responses':
                redirectToResponsesPage();
                break;
            case 'featuredFreelancers':
                redirectToFeaturedFreelancersPage();
                break;
            case 'selectedUser':
            default:
                router.push(`/my-projects/client/${id}/selected-users`);
                break;
        }
        setShowHiddenDropDownMenu(false);
    };

    const redirectToResponsesPage = () => {
        router.push(`/my-projects/client/${id}/responses`);
    };

    const redirectToFeaturedFreelancersPage = () => {
        router.push(`/my-projects/client/${id}/featured-freelancers`);
    };

    const redirectToEditPage = () => {
        router.push(`/my-projects/client/${id}/edit`);
    };

    return (
        <>
            <main className="general_page_wrapper">
                <Head>
                    <title>Мои проекты</title>
                    <meta name="description" content="Order details page" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                </Head>
                <div className="home_general_wrapper my_projects_for_client_page">
                    <Header activePage='my_projects_for_client_page' />
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>
                        <div className="my_project_single_page_tabs_wrapper">
                            <button className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('editing')}>Редактирование</button>
                            <button className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('responses')}>Отклики</button>
                            <button className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('featuredFreelancers')}>Избранные фрилансеры</button>
                            <button className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('selectedUser')}>Выбранный исполнитель</button>
                        </div>
                        <div className="dropdownWrapper">
                            <div className="dropdownHeader2" onClick={() => setShowHiddenDropDownMenu(!showHiddenDropDownMenu)}>
                                <p className="dropdownHeader_title">
                                    {selectedTab === 'editing' && 'Редактирование'}
                                    {selectedTab === 'responses' && 'Отклики'}
                                    {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
                                    {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
                                </p>
                                <button className="dropdownHeader_icon" style={{ transform: showHiddenDropDownMenu ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    <DropDownIcon2 />
                                </button>
                            </div>
                            {showHiddenDropDownMenu && (
                                <div className="tabsWrapper">
                                    <button className="mobile_tab" onClick={() => handleTabClick('editing')}>Редактирование</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('responses')}>Отклики</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('featuredFreelancers')}>Избранные фрилансеры</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('selectedUser')}>Выбранный исполнитель</button>
                                </div>
                            )}
                        </div>
                        <div className="order_single_page_items_wrapper">
                            {selectedFreelancersData?.freelancer  ? (
                                <div style={{width: '100%'}}>
                                    {selectedFreelancersData?.freelancer && (
                                        <div className="order_single_page_item">
                                            <div className="order_single_page_item_img_info_wrapper">
                                                <div className="order_single_page_item_info_box">
                                                    <p className="order_single_page_item_user_name">
                                                        {selectedFreelancersData.freelancer.first_name} {selectedFreelancersData.freelancer.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="order_single_page_item_buttons_wrapper">
                                                {showClosingStateBtn ? (
                                                    <button className="order_single_page_item_waiting_for_a_response_btn">Ожидание ответа от исполнителя</button>
                                                ) : (
                                                    <button className="order_single_page_item_chat_btn">В Чат</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                                : (

                                    <p className='not_found_text'>Для этого заказа фрилансер не выбран.</p>
                                )

                            }

                        </div>
                    </div>
                </div>
                <Footer activePage='my_projects_for_client_page' />
            </main>
        </>
    );
}
