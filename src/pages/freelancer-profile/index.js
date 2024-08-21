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
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";

export default function FreelancerProfilePage () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
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

    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([
        'Разработка андроид приложения',
        'Дизайн',
        'Компьютерная помощь',
        'Разработка ПО',
        'Красота и здоровье',
    ]);

    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([
        'Разработка андроид приложения',
        'Дизайн',
        'Компьютерная помощь',
        'Разработка ПО',
        'Красота и здоровье',
    ]);

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
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setIsOpenForCategories(false);
    };
    const handleSelectSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setIsOpenForSubCategories(false);
    };

    const router = useRouter();

    const redirectFromPortfolioSinglePage = (id) => {
        router.push(`/portfolio/${id}`);
    };
    const redirectToAddProjectPage = () => {
        router.push(`/add-project`);
    };
    const redirectToFreelancerSettingsPage = () => {
        router.push(`/freelancer-profile-settings`);
    }

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
                                            src="/freelancer_single_page_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>
                                    <button
                                        className='suggest_task_btn desktop_suggest_add_to_fav_btn'
                                        onClick={() => {
                                           redirectToFreelancerSettingsPage()
                                        }}
                                    >
                                        Настройки
                                    </button>
                                    {/*<button className='add_to_favorites_btn desktop_suggest_add_to_fav_btn'>*/}
                                    {/*    Добавить в избранные*/}
                                    {/*</button>*/}
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
                                            <p className='freelancer_single_page_user_name'>Анастасия Кодаш</p>
                                            <p className='freelancer_single_page_user_age_country_info'>34 года, Москва</p>
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
                                        <button
                                            className='suggest_task_btn mobile_suggest_add_to_fav_btn'
                                            onClick={() => {
                                                redirectToFreelancerSettingsPage()
                                            }}
                                        >
                                            Настройки
                                        </button>
                                        <div className='freelancer_single_page_user_info_professional_information_items_wrapper'>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Опыт:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">12 лет</p>
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Выполнила:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">57 заданий</p>
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    На DoYouDo:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info"> с 6 сентября 2019</p>
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Cоздала:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">2 задания</p>
                                            </div>
                                        </div>
                                        <p className='freelancer_single_page_about_user_info'>
                                            Действующий школьный учитель. Опыт работы в школе 9 лет. Проведение индивидуальных занятий со школьниками  5–11 классов. Профессиональное устранение любых пробелов в знаниях, доходчивое объяснение учебного материала, подготовка к успешной сдаче экзамена.
                                        </p>
                                        <div className='freelancer_single_page_user_hobbies_main_wrapper'>
                                            <div className="freelancer_single_page_user_hobbies_items_wrapper">
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Дизайн</p>
                                                </div>
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Разработка ПО</p>
                                                </div>
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Фото, видео и аудио</p>
                                                </div>
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Красота и здоровье</p>
                                                </div>
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Установка и ремонт техники</p>
                                                </div>
                                                <div className="freelancer_single_page_user_hobbies_item">
                                                    <p className="freelancer_single_page_user_hobbies_item_info">Репетиторы и обучение</p>
                                                </div>
                                            </div>
                                            <button
                                                className='freelancer_single_page_user_hobbies_add_btn'
                                                onClick={() => {
                                                    setShowAddCategoryModal(true)
                                                    disableBodyScroll()
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="freelancer_click_balance_info_wrapper">
                            <div className='freelancer_click_balance_info_header_wrapper'>
                                <p className='freelancer_click_balance_info_header_title'>Баланс кликов</p>
                                <p className='freelancer_click_balance_info_header_balance_quantity'>130</p>
                            </div>
                            <div className='freelancer_click_balance_items_wrapper'>
                                <div className='freelancer_click_balance_item1'>
                                    <div className="freelancer_click_balance_item1_child">
                                        <p className='freelancer_click_balance_item1_child_title'>Цена клика: 10 рублей</p>
                                        <p className='freelancer_click_balance_item1_child_info'>Действующий школьный учитель. Опыт работы в школе 9 лет. Проведение индивидуальных занятий со школьниками </p>
                                    </div>
                                    <div className="freelancer_click_balance_item1_child">
                                        <button className='freelancer_click_balance_buy_balance_btn'>Купить</button>
                                    </div>
                                </div>
                                <div className='freelancer_click_balance_item2'>
                                    <div className="freelancer_click_balance_item2_child">
                                        <div className='freelancer_click_balance_item2_child_box'>
                                            <p className='freelancer_click_balance_item2_child_box_title'>Пакет 200 кликов</p>
                                            <p className='freelancer_click_balance_item2_child_box_info'>1600 рублей</p>
                                        </div>
                                        <div className='freelancer_click_balance_item2_child_box'>
                                            <button className='freelancer_click_balance_item2_child_box_buy_btn'>Купить</button>
                                        </div>
                                    </div>
                                    <div className="freelancer_click_balance_item2_child">
                                        <div className='freelancer_click_balance_item2_child_box'>
                                            <p className='freelancer_click_balance_item2_child_box_title'>Пакет 500 кликов</p>
                                            <p className='freelancer_click_balance_item2_child_box_info'>4500 рублей</p>
                                        </div>
                                        <div className='freelancer_click_balance_item2_child_box'>
                                            <button className='freelancer_click_balance_item2_child_box_buy_btn'>Купить</button>
                                        </div>
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
                        <div className='freelancer_single_page_portfolio_wrapper'>
                            <div className="freelancer_single_page_portfolio_wrapper_header">
                                <h1 className='freelancer_single_page_portfolio_wrapper_header_title'>Портфолио</h1>
                                <p className="freelancer_single_page_portfolio_wrapper_header_info">13 Проектов</p>
                            </div>
                            <div className="portfolio">
                                <div className='portfolio_items_wrapper'>
                                    {portfolioList.map((item, index) => {
                                        return (
                                            <button
                                                className={item?.add_project ? 'portfolio_item2' : 'portfolio_item'}
                                                onClick={() => {
                                                    {item?.add_project ?
                                                        redirectToAddProjectPage()
                                                        :
                                                        redirectFromPortfolioSinglePage(item?.id)
                                                    }

                                                }}
                                            >
                                                {item?.add_project  ?
                                                    <div className='add_project_icon_title_wrapper'>
                                                        <AddProjectIcon/>
                                                        <p className='add_project_icon_title'>Добавить проект</p>
                                                    </div>

                                                    :
                                                    <div style={{width: '100%'}}>
                                                        <div className="portfolio_item_img">
                                                            <Image
                                                                src={item.portfolio_img}
                                                                alt="Example Image"
                                                                layout="fill" // Fill the parent element
                                                                objectFit="cover" // Cover the area of the parent element
                                                                quality={100} // Image quality
                                                            />
                                                        </div>
                                                        <div className='portfolio_item_info_box'>
                                                            <p className='portfolio_item_title'>{item.portfolio_project_name}</p>
                                                            <p className='portfolio_item_info1'>{item.portfolio_field_name}</p>
                                                            <div className="portfolio_item_line"></div>
                                                            <p className='portfolio_item_info2'>{item.portfolio_info}</p>
                                                        </div>
                                                    </div>
                                                }

                                            </button>

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

                    {showAddCategoryModal &&
                        <div className='add_category_modal'>
                            <div className='add_category_modal_wrapper'>
                                <button
                                    className='add_category_modal_close_btn'
                                    onClick={() => {
                                        setShowAddCategoryModal(false)
                                        enableBodyScroll()
                                    }}
                                >
                                    <FilterCloseIcon/>
                                </button>
                                <h1 className='add_category_modal_title'>Добавление категории</h1>
                                <div className="add_category_dropdown add_category_dropdown1">
                                    <div className="add_category_create_order_dropdownHeader" onClick={() => setIsOpenForCategories(!isOpenForCategories)}>
                                        <p className='add_category_create_order_dropdownHeader_title'>{selectedCategory || 'Категория'}</p>
                                        <span className="arrow">
                                            {isOpenForCategories ?
                                                <div style={{ transform: "rotate(-180deg)" }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="#333"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                        />
                                                    </svg>
                                                </div>
                                                :

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                >
                                                    <path
                                                        stroke="#333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                    />
                                                </svg>

                                            }
                                        </span>
                                    </div>
                                    {isOpenForCategories && (
                                        <div className="add_category_dropdownList add_category_dropdownList1">
                                            {categories.map((category, index) => (
                                                <p key={index} className="add_category_dropdownItem" onClick={() => handleSelectCategory(category)}>
                                                    {category}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="add_category_dropdown add_category_dropdown2">
                                    <div className="add_category_create_order_dropdownHeader" onClick={() => setIsOpenForSubCategories(!isOpenForSubCategories)}>
                                        <p className='add_category_create_order_dropdownHeader_title'>{selectedSubCategory || 'Подкатегория'}</p>
                                        <span className="arrow">
                                            {isOpenForSubCategories ?
                                                <div style={{ transform: "rotate(-180deg)" }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="#333"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                        />
                                                    </svg>
                                                </div>
                                                :

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                >
                                                    <path
                                                        stroke="#333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                    />
                                                </svg>

                                            }
                                        </span>
                                    </div>
                                    {isOpenForSubCategories && (
                                        <div className="add_category_dropdownList add_category_dropdownList2">
                                            {subCategories.map((subCategory, index) => (
                                                <p key={index} className="add_category_dropdownItem" onClick={() => handleSelectSubCategory(subCategory)}>
                                                    {subCategory}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className='add_category_modal_save_btn'>Сохранить</button>

                            </div>

                        </div>
                    }
                </div>


            </main>
        </>
    );
}
