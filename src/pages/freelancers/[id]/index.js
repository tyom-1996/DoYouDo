import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/freelancers_single_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Category from '../../includes/Category'
import City from '../../includes/CityComponent'
import Head from 'next/head';
import {DateIcon2} from "@/components/icons/DateIcon2";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import { useRouter } from 'next/router';
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {LikeIcon} from "@/components/icons/LikeIcon";
import {DislikeIcon} from "@/components/icons/DisLikeIcon";
import SuggestTaskModal from "../../../components/SuggestTaskModal";
import {SearchIcon} from "@/components/icons/SearchIcon";
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}


export default function FreelancerSinglePage ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
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
            portfolio_img: '/portfolio_img1.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 2,
            portfolio_img: '/portfolio_img2.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 3,
            portfolio_img: '/portfolio_img3.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },
        {
            id: 4,
            portfolio_img: '/portfolio_img4.png',
            portfolio_project_name: 'Passimpay',
            portfolio_field_name: 'Дизайн',
            portfolio_info: 'Разработка кроссплатформенных приложений "под ключ"  Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) ка в сторы  Договор + Поэтапная оплата'
        },


    ]);
    const [showForFreelancer, setShowForFreelancer] = useState(true);
    const [showForClient, setShowForClient] = useState(false);
    const [showSuggestModal, setShowSuggestModal] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');



    const handleCheckboxChange = () => {
        setIsCheckedAllCategories(!isCheckedAllCategories);
    };



    useEffect(() => {
        handleUseFilter()
    }, [selectedCategories, selectedCities]);

    useEffect(() => {
        console.log(id, 'params______id')
    }, [])
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

    const redirectFromPortfolioSinglePage = (id) => {
        router.push(`/portfolio/${id}`);
    };

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Фрилансеры</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='freelancer_single_page'>
                    <Header activePage={"freelancers_page"}/>

                    {showForFreelancer &&
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
                                                setShowSuggestModal(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            Предложить задание
                                        </button>
                                        <button className='add_to_favorites_btn desktop_suggest_add_to_fav_btn'>
                                            Добавить в избранные
                                        </button>
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
                                            <div className='mobile_buttons_wrapper'>
                                                <button className='suggest_task_btn'>
                                                    Предложить задание
                                                </button>
                                                <button className='add_to_favorites_btn'>
                                                    Добавить в избранные
                                                </button>
                                            </div>
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
                                                <div
                                                    className='portfolio_item'
                                                    key={index}
                                                    onClick={() => {
                                                        redirectFromPortfolioSinglePage(item?.id)
                                                    }}
                                                >
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
                    }

                    {showForClient &&
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
                    }


                    <Footer activePage={"freelancers_page"}/>
                    {showFilterMobile &&
                        <div
                            className='filter_mobile_menu'
                            onClick={() => {
                                handleFilterMenuClick()
                            }}
                        >
                            <div
                                className='filter_mobile_menu_wrapper'
                                onClick={(e) => {
                                    stopPropagation(e)
                                }}
                            >
                                <div className='filter_mobile_menu_title_close_icon_wrapper'>
                                    <button
                                        className='filter_mobile_menu_close_btn'
                                        onClick={() => {
                                            setShowFilterMobile(false)
                                            enableBodyScroll()
                                        }}
                                    >
                                        <FilterCloseIcon/>
                                    </button>
                                    <p className='filter_mobile_menu_title'>Фильтр</p>
                                </div>
                                <div className="mobile_services_filter_items_wrapper">

                                    {/*<div className='filter_task_categories_wrapper'>*/}
                                    {/*    <div*/}
                                    {/*        className='filter_task_categories_header'*/}
                                    {/*        onClick={() => {*/}
                                    {/*            setShowHiddenFilterCategoriesPart(!showHiddenFilterCategoriesPart)*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        <p className='filter_task_categories_header_title'>Категории заданий</p>*/}
                                    {/*        <button*/}
                                    {/*            className={`filter_task_categories_header_icon${showHiddenFilterCategoriesPart ? '2' : ''}`}*/}
                                    {/*        >*/}
                                    {/*            <DropDownIcon3/>*/}
                                    {/*        </button>*/}

                                    {/*    </div>*/}
                                    {/*    {showHiddenFilterCategoriesPart &&*/}
                                    {/*        <div className='filter_task_categories_main'>*/}
                                    {/*            <div className="filter_task_categories_input_title_wrapper filter_task_categories_input_title_wrapper2">*/}
                                    {/*                <p className="filter_task_categories_input_title">Город, адрес, метро, район</p>*/}
                                    {/*                <input*/}
                                    {/*                    type="text"*/}
                                    {/*                    value={address}*/}
                                    {/*                    onChange={handleAddressChange}*/}
                                    {/*                    placeholder="Город, адрес, метро, район"*/}
                                    {/*                    className='filter_task_categories_input_field filter_task_categories_input_field_address'*/}
                                    {/*                />*/}
                                    {/*                {address.length > 0 &&*/}
                                    {/*                    <button*/}
                                    {/*                        className='delete_input_btn'*/}
                                    {/*                        onClick={() => {*/}
                                    {/*                            setAddress('')*/}
                                    {/*                        }}*/}
                                    {/*                    >*/}
                                    {/*                        <DeleteAddressIcon/>*/}
                                    {/*                    </button>*/}
                                    {/*                }*/}

                                    {/*            </div>*/}

                                    {/*            <div className="radius_dropdown">*/}
                                    {/*                <p className='radius_dropdown_title'>Радиус поиска</p>*/}
                                    {/*                <div className="radius_dropdownHeader" onClick={() => setIsOpenForRadius(!IsOpenForRadius)}>*/}
                                    {/*                    <p className='radius_dropdownHeader_title'>{selectedRadius || 'Радиус поиска'}</p>*/}
                                    {/*                    <span className="arrow">*/}
                                    {/*            {IsOpenForRadius ?*/}
                                    {/*                <div style={{ transform: "rotate(-180deg)" }}>*/}
                                    {/*                    <svg*/}
                                    {/*                        xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*                        width={24}*/}
                                    {/*                        height={24}*/}
                                    {/*                        fill="none"*/}
                                    {/*                    >*/}
                                    {/*                        <path*/}
                                    {/*                            stroke="#333"*/}
                                    {/*                            strokeLinecap="round"*/}
                                    {/*                            strokeLinejoin="round"*/}
                                    {/*                            strokeWidth={1.5}*/}
                                    {/*                            d="m18 9-6 6-1.5-1.5M6 9l2 2"*/}
                                    {/*                        />*/}
                                    {/*                    </svg>*/}
                                    {/*                </div>*/}
                                    {/*                :*/}

                                    {/*                <svg*/}
                                    {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*                    width={24}*/}
                                    {/*                    height={24}*/}
                                    {/*                    fill="none"*/}
                                    {/*                >*/}
                                    {/*                    <path*/}
                                    {/*                        stroke="#333"*/}
                                    {/*                        strokeLinecap="round"*/}
                                    {/*                        strokeLinejoin="round"*/}
                                    {/*                        strokeWidth={1.5}*/}
                                    {/*                        d="m18 9-6 6-1.5-1.5M6 9l2 2"*/}
                                    {/*                    />*/}
                                    {/*                </svg>*/}

                                    {/*            }*/}
                                    {/*        </span>*/}
                                    {/*                </div>*/}
                                    {/*                {IsOpenForRadius && (*/}
                                    {/*                    <div className="radius_dropdownList radius_dropdownList2">*/}
                                    {/*                        {radius.map((item, index) => (*/}
                                    {/*                            <p key={index} className="radius_dropdownItem" onClick={() => handleSelectRadius(item)}>*/}
                                    {/*                                {item}*/}
                                    {/*                            </p>*/}
                                    {/*                        ))}*/}
                                    {/*                    </div>*/}
                                    {/*                )}*/}
                                    {/*            </div>*/}
                                    {/*            <div className="filter_task_categories_input_title_wrapper">*/}
                                    {/*                <p className="filter_task_categories_input_title">Стоимость заданий от</p>*/}
                                    {/*                <input*/}
                                    {/*                    type="text"*/}
                                    {/*                    value={taskCost}*/}
                                    {/*                    onChange={handleTaskCostChange}*/}
                                    {/*                    placeholder="₽"*/}
                                    {/*                    className='filter_task_categories_input_field'*/}
                                    {/*                />*/}
                                    {/*            </div>*/}
                                    {/*            <div className='filter_option_checkbox_items_wrapper'>*/}
                                    {/*                <div className='filter_option_checkbox_item'>*/}
                                    {/*                    <h3 className="filter_option_checkbox_items_wrapper_title">Показывать только задания со статусами</h3>*/}
                                    {/*                    <div className="filter-option">*/}
                                    {/*                        <label className='filter_option_label'>*/}
                                    {/*                            <input*/}
                                    {/*                                type="checkbox"*/}
                                    {/*                                name="remoteWork"*/}
                                    {/*                                checked={filters.remoteWork}*/}
                                    {/*                                onChange={handleFilterChange}*/}
                                    {/*                            />*/}
                                    {/*                            <div className='filter_option_label_title_wrapper'>*/}
                                    {/*                                <span className='filter_option_label_title'>Удалённая работа</span>*/}
                                    {/*                                <span className='filter_option_label_title2'>Никуда не надо ехать</span>*/}
                                    {/*                            </div>*/}

                                    {/*                        </label>*/}
                                    {/*                    </div>*/}
                                    {/*                    <div className="filter-option">*/}
                                    {/*                        <label className='filter_option_label'>*/}
                                    {/*                            <input*/}
                                    {/*                                type="checkbox"*/}
                                    {/*                                name="noResponses"*/}
                                    {/*                                checked={filters.noResponses}*/}
                                    {/*                                onChange={handleFilterChange}*/}
                                    {/*                            />*/}
                                    {/*                            <div className='filter_option_label_title_wrapper'>*/}
                                    {/*                                <span className='filter_option_label_title'>Задания без откликов</span>*/}
                                    {/*                                <span className='filter_option_label_title2'>Откликнитесь первым</span>*/}
                                    {/*                            </div>*/}
                                    {/*                        </label>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}

                                    {/*                <div className='filter_option_checkbox_item'>*/}
                                    {/*                    <h3 className="filter_option_checkbox_items_wrapper_title">Сортировать по:</h3>*/}
                                    {/*                    <div className="sort-options">*/}
                                    {/*                        <label className="sort-option">*/}
                                    {/*                            <input*/}
                                    {/*                                type="radio"*/}
                                    {/*                                name="sortBy"*/}
                                    {/*                                value="date"*/}
                                    {/*                                checked={filters.sortBy === 'date'}*/}
                                    {/*                                onChange={handleSortChange}*/}
                                    {/*                            />*/}
                                    {/*                            <p className='sort_option_title'> Дате публикации</p>*/}

                                    {/*                        </label>*/}
                                    {/*                        <label className="sort-option">*/}
                                    {/*                            <input*/}
                                    {/*                                type="radio"*/}
                                    {/*                                name="sortBy"*/}
                                    {/*                                value="urgency"*/}
                                    {/*                                checked={filters.sortBy === 'urgency'}*/}
                                    {/*                                onChange={handleSortChange}*/}
                                    {/*                            />*/}
                                    {/*                            <p className='sort_option_title'>Срочности</p>*/}

                                    {/*                        </label>*/}
                                    {/*                        <label className="sort-option">*/}
                                    {/*                            <input*/}
                                    {/*                                type="radio"*/}
                                    {/*                                name="sortBy"*/}
                                    {/*                                value="distance"*/}
                                    {/*                                checked={filters.sortBy === 'distance'}*/}
                                    {/*                                onChange={handleSortChange}*/}
                                    {/*                            />*/}
                                    {/*                            <p className='sort_option_title'>Удалённости</p>*/}

                                    {/*                        </label>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}

                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    }*/}

                                    {/*</div>*/}

                                    <div className="services_search_input_field2">
                                        <div className='services_search_input_field_icon'>
                                            <SearchIcon/>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder='Все категории'
                                            className='services_search_input'
                                            value={searchCategory}
                                            onChange={(e) => {
                                                setSearchCategory(e.target.value)
                                            }}
                                        />
                                        {searchCategory.length > 0 &&
                                            <div
                                                className='input_delete_icon'
                                                onClick={() => {
                                                    setSearchCategory('')
                                                }}

                                            >
                                                <DeleteAddressIcon/>
                                            </div>
                                        }


                                    </div>


                                    <div className='services_filter_item'>
                                        <label className='service_label'>
                                            <input
                                                type="checkbox"
                                                checked={isCheckedAllCategories}
                                                onChange={handleCheckboxChange}
                                                className='service_label_checkbox_input_field checkbox'
                                            />
                                            <span className='service_label_custom_checkbox customCheckbox'></span>
                                            Все категории

                                        </label>
                                    </div>

                                    <City
                                        cityData={citiesList}
                                        selectedCities={selectedCities}
                                        setNewSelectedCities={(val)=>{
                                            setSelectedCities(val)
                                            console.log(val)
                                        }}
                                    />

                                    <div className='service_category_items_wrapper'>
                                        {filterCategoryList.map((item, index) => {
                                            return (
                                                <Category
                                                    categoryData={item}
                                                    selectedCategories={selectedCategories}
                                                    setNewSelectedCategories={(val)=>{
                                                        setSelectedCategories(val)
                                                        console.log(val)
                                                    }}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='apply_reset_filter_btn_wrapper'>
                                    <button className='apply_filter_btn'>Применить</button>
                                    <button className='reset_filter_btn'>Сбросить</button>
                                </div>

                            </div>
                        </div>
                    }
                    <SuggestTaskModal
                        isActive={showSuggestModal}
                        onClose={() => {
                            setShowSuggestModal(false)
                        }}
                    />
                </div>

            </main>
        </>
    );
}
