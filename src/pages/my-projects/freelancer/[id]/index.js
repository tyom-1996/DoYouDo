import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../../assets/css/order_page.css';
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Category from '../../../includes/Category'
import City from '../../../includes/CityComponent'
import Head from 'next/head';
import {DateIcon2} from "@/components/icons/DateIcon2";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import { useRouter } from 'next/router';
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}




export default function Order ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
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
    const [showForMyResponses, setShowForMyResponses] = useState(false);
    const [showForInProgress, setShowForInProgress] = useState(false);
    const [showForApproval, setShowForApproval] = useState(false);
    const [showForClosing, setShowForClosing] = useState(true);


    useEffect(() => {
        console.log(id, 'params______id')
    }, [])
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
    const redirectToLeaveFeedbackPage = () => {
        router.push('/leave-feedback');
    }

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
                <div className="home_general_wrapper" id='order_page_for_freelancer'>
                    <Header activePage={"my_projects_for_freelancer_page"}/>
                </div>
                <div className='order_page'>
                    <div className="order_page_items_wrapper">
                        <div className="order_page_item1">
                            <div className="order_page_item1_child">
                                <div className="order_page_user_img">
                                    <Image
                                        src="/freelancers_img1.png"
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                                <div className='order_page_item1_child_info_wrapper'>
                                    <p className='order_page_user_name'>Daniela Gallego</p>
                                    <p className='order_page_user_country'>Москва</p>
                                    <div className="order_page_user_rating_info_wrapper_main">
                                        <div className='order_page_user_rating_icon_info_wrapper'>
                                            <div className="order_page_user_rating_icon">
                                                <Image
                                                    src="/stars.png"
                                                    alt="Example Image"
                                                    layout="fill" // Fill the parent element
                                                    objectFit="cover" // Cover the area of the parent element
                                                    quality={100} // Image quality
                                                />
                                            </div>
                                            <p className='order_page_user_rating_info'>4.8/5</p>
                                        </div>
                                        <p className='order_page_user_reviews_info'>53 отзыва</p>

                                    </div>
                                </div>

                            </div>
                            <button className='get_direction_button'>
                                Проложить маршрут
                            </button>
                        </div>
                        <div className="order_page_item2">
                            <div className="order_page_date_info_icon_wrapper">
                                <div className="order_page_date_icon">
                                    <DateIcon2/>
                                </div>
                                <p className='order_page_date_info'>January 15, 2023</p>
                            </div>
                            <div className="order_details_items_wrapper">
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Адрес</p>
                                    <p className="order_detail_item_info">Виртуальное задание</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Начать</p>
                                    <p className="order_detail_item_info">Виртуальное задание</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Бюджет</p>
                                    <p className="order_detail_item_info">Крупный — до 10000 000 ₽</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Оплата задания</p>
                                    <p className="order_detail_item_info">По договорённости с бизнес-исполнителем</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Нужно</p>
                                    <p className="order_detail_item_info">
                                        В производственной организации из 200 человек используется 1С ERP (последняя версия). Аналитики и программисты должны проанализировать текущие процессы в 1С ERP, описать их, а также реализовать заявки пользователей (решение инциндентов и развитие системы). Проект долгий, постоянный, оплата почасовая, возможно по 100% предоплате. В предложении прошу указать: - аккредитованния ли ИТ компания или нет: да или нет - количество: аналитиков 1С, разработчиков 1С, всего сотрудников в компании (3 цифры) - возможность аналитикам 1С и разработчикам 1С работать полную занятость (проект интенсивный):
                                    </p>
                                </div>
                            </div>
                            {showForMyResponses &&
                                <div className='discuss_btn_wrapper'>
                                    <button className='discuss_btn'>Обсудить</button>
                                </div>
                            }
                            {showForInProgress &&
                                <div className='discuss_btn_wrapper'>
                                    <button className='discuss_btn'>Обсудить</button>
                                </div>
                            }
                            {showForApproval &&
                                <div className='discuss_accept_order_refuse_buttons_main_wrapper'>
                                    <div className='accept_order_refuse_buttons_wrapper'>
                                        <button className='accept_order_btn'>Принять заказ</button>
                                        <button className='refuse_btn'>Отказаться</button>
                                    </div>
                                    <button className='discuss_btn'>Обсудить</button>
                                </div>
                            }
                            {showForClosing &&
                                <button
                                    className='leave_feedback_btn'
                                     onClick={() => {
                                         redirectToLeaveFeedbackPage()
                                     }}
                                >
                                    Оставить отзыв
                                </button>
                            }

                        </div>
                    </div>
                </div>
                <div className="map_img2">
                    <Image
                        src="/map_img.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
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
                <Footer activePage={"my_projects_for_freelancer_page"}/>

            </main>
        </>
    );
}
