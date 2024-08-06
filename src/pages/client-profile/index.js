import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/freelancers_profile_page.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from 'next/head';
import { useRouter } from 'next/router';
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {LikeIcon} from "@/components/icons/LikeIcon";
import {DislikeIcon} from "@/components/icons/DisLikeIcon";
import {AddProjectIcon} from "@/components/icons/AddProjectIcon";
import {DateIcon} from "@/components/icons/DateIcon";

export default function ClientProfilePage () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [reviewsList, setReviewsList] = useState([
        {
            id: 1,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 2,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 3,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },

        {
            id: 4,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 5,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 6,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },

    ]);
    const [portfolioList, setPortfolioList] = useState([

        {
            id: 1,
            portfolio_img: '',
            portfolio_project_name: '',
            portfolio_field_name: '',
            portfolio_info: '',
            add_project: true,
        },
        {
            id: 2,
            add_project: false,
            portfolio_img: '/portfolio_img1.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 3,
            add_project: false,
            portfolio_img: '/portfolio_img2.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 4,
            add_project: false,
            portfolio_img: '/portfolio_img3.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 5,
            add_project: false,
            portfolio_img: '/portfolio_img4.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },

        {
            id: 6,
            add_project: false,
            portfolio_img: '/portfolio_img1.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 7,
            add_project: false,
            portfolio_img: '/portfolio_img2.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 8,
            add_project: false,
            portfolio_img: '/portfolio_img3.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 9,
            add_project: false,
            portfolio_img: '/portfolio_img4.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },


    ]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };


    const router = useRouter();

    const redirectFromPortfolioSinglePage = (id) => {
        router.push(`/portfolio/${id}`);
    };
    const redirectToAddProjectPage = () => {
        router.push(`/add-project`);
    };

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Профиль Исполнителя</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='freelancer_profile'>
                    <Header activePage={"freelancer_profile"}/>
                    <div className="freelancer_single_page_wrapper">
                        <div className="freelancer_single_page_user_info_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper_child"></div>
                            <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_item1">
                                    <div className="freelancer_single_page_user_info_wrapper_item1_image">
                                        <Image
                                            src="/freelancer_single_page_img2.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>

                                </div>
                                <div className="freelancer_single_page_user_info_wrapper_item2">
                                    <div className="freelancer_single_page_user_info_wrapper_item2_img">
                                        <Image
                                            src="/freelancer_logo_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>
                                    <div className='freelancer_single_page_user_info_wrapper_item2_details'>
                                        <div className='freelancer_single_page_user_name_age_country_info_wrapper'>
                                            <p className='freelancer_single_page_user_name'>Алексей Смирнов</p>
                                            <p className='freelancer_single_page_user_age_country_info'>24 года, Москва</p>
                                        </div>
                                        <div className="freelancer_single_page_user_rating_icon_info_wrapper">
                                            <div className="freelancer_single_page_user_rating_icon">
                                                <Image
                                                    src="/star_img2.png"
                                                    alt="Example Image"
                                                    layout="fill" // Fill the parent element
                                                    objectFit="cover" // Cover the area of the parent element
                                                    quality={100} // Image quality
                                                />
                                            </div>
                                            <p className="freelancer_single_page_user_rating_info">
                                                5/5
                                            </p>
                                        </div>

                                        <div className='freelancer_single_page_user_info_professional_information_items_wrapper'>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Cоздал:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">2 задания</p>
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    На DoYouDo:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info"> с 6 сентября 2019</p>
                                            </div>

                                        </div>
                                        <p className='freelancer_single_page_about_user_info'>
                                            А также интерактивные прототипы набирают популярность среди определенных слоев населения, а значит, должны быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. А ещё базовые сценарии поведения пользователей могут быть разоблачены. Банальные, но неопровержимые выводы, а
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="freelancer_click_balance_info_wrapper">
                            <div className='freelancer_click_balance_info_header_wrapper'>
                                <p className='freelancer_click_balance_info_header_title'>Баланс</p>
                            </div>
                            <div className='freelancer_click_balance_items_wrapper'>
                                <div className='freelancer_click_balance_item1'>
                                    <div className="freelancer_click_balance_item1_child">
                                        <p className='freelancer_click_balance_item1_child_title'>Цена размещения: 10 рублей</p>
                                        <p className='freelancer_click_balance_item1_child_info'>Попоните баланс для размещения заказа</p>
                                    </div>
                                    <div className="freelancer_click_balance_item1_child">
                                        <p className='freelancer_click_balance_info_header_balance_quantity'>13.000 Руб.</p>
                                        <button className='freelancer_click_balance_buy_balance_btn'>Пополнить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="freelancer_single_page_ratings_reviews_wrapper">
                            <div className="freelancer_single_page_ratings_reviews_wrapper_header">
                                <div className="freelancer_single_page_rating_info_wrapper">
                                    <p className='freelancer_single_page_rating_info_wrapper_title'>
                                        Средняя оценка
                                    </p>
                                    <p className='freelancer_single_page_rating_info_wrapper_info'>4.9</p>
                                </div>
                                <div className='freelancer_single_page_likes_reviews_info_wrapper'>
                                    <div className='freelancer_single_page_likes_info_icon_wrapper'>
                                        <LikeIcon/>
                                        <p className='freelancer_single_page_likes_info'>43</p>
                                    </div>
                                    <div className='freelancer_single_page_dislikes_info_icon_wrapper'>
                                        <DislikeIcon/>
                                        <p className='freelancer_single_page_dislikes_info'>10</p>
                                    </div>
                                    <p className='freelancer_single_page_reviews_info'>53 отзыва</p>
                                </div>
                            </div>
                            <div className="reviews">
                                <div className='reviews_items_wrapper'>
                                    {reviewsList.map((item, index) => {
                                        return (
                                            <div className='reviews_item'>
                                                <div className="reviews_item_header">
                                                    <div className="reviews_item_header_item">
                                                        <p className="reviews_item_header_date_info">{item.review_date}</p>
                                                        <p className="reviews_item_header_project_name mobile_reviews_item_header_item">{item.project_name}</p>
                                                        <p className="reviews_item_header_client_name_info">{item.client_name}</p>
                                                        <div className='reviews_item_img'>
                                                            <Image
                                                                src={item.star_icon}
                                                                alt="Example Image"
                                                                layout="fill" // Fill the parent element
                                                                objectFit="cover" // Cover the area of the parent element
                                                                quality={100} // Image quality
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="reviews_item_header_item desktop_reviews_item_header_item">
                                                        <p className="reviews_item_header_project_name">{item.project_name}</p>
                                                    </div>
                                                </div>
                                                <p className='reviews_info'>
                                                    {item.review_info}
                                                </p>
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
                    </div>

                    <Footer activePage={"freelancer_profile"}/>
                </div>


            </main>
        </>
    );
}
