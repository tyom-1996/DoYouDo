import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../assets/css/home.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Category from './includes/Category'
import City from './includes/CityComponent'
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
    const [windowHeight, setWindowHeight] = useState(0);
    const [reviewsOfPerformers, setReviewsOfPerformers] = useState([
        {
            id: 1,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
        },
        {
            id: 2,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
        },
        {
            id: 3,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
        },
        {
            id: 4,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
        },
        {
            id: 5,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
        },
        {
            id: 6,
            user_name: 'Sarah Williams',
            user_img: '/user_img.png',
            review_title: 'Выкупить и доставить заказ из аптеки',
            review_info: 'Остался доволен, спасибо. Предложил много идей. Приехал в нужное время. Видно что очень любит своё дело. Насчёт фото не заставил ждать.'
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

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const router = useRouter();

    const navigateToMapPage = () => {
        router.push('/map');
    };
    return (
        <>
            <main className='general_page_wrapper1' id='home_page'>
                <Head>
                    <title>Главная страница</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header/>
                </div>
                <div className="top">
                    <div className="top_wrapper">
                        <div className="top_info_box">
                            <h1 className='top_info_box_title'>
                                Найдите <span>идеального фрилансера</span>  для вашего проекта
                            </h1>
                            <p className='top_info_box_info'>
                                Добро пожаловать на нашу DoYouDo, где лучшие профессионалы и инновационные проекты встречаются для создания выдающихся результатов.Начните свой проект уже сегодня, легко и быстро находя талантливых фрилансеров со всего мира.
                            </p>
                        </div>
                        <div className="top_img_box">
                            <Image
                                src="/top_img.png"
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />
                        </div>
                    </div>
                </div>
                <div className="how_works">
                    <div className="how_works_wrapper">
                        <h1 className='how_works_title'>Как работает <span>DoYouDo</span>?</h1>
                        <div className="how_works_items_wrapper">
                            <div className="how_works_item">
                                <p className="how_works_item_info">
                                    <span className="how_works_item_info_span">Опишите</span>
                                    свою задачу и условия. Это бесплатно и займёт 3‑4 минуты
                                </p>
                            </div>
                            <div className="how_works_item">
                                <p className="how_works_item_info">
                                    <span className="how_works_item_info_span">Получите отклики</span>
                                    с ценами от исполнителей. Обычно они приходят в течение 30 минут
                                </p>
                            </div>
                            <div className="how_works_item">
                                <p className="how_works_item_info">
                                    <span className="how_works_item_info_span">Выберите</span>
                                    подходящего исполнителя и обсудите сроки выполнения
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews_of_performers">
                    <div className="reviews_of_performers_wrapper">
                        <h1 className="reviews_of_performers_title">
                            Отзывы об исполнителях
                        </h1>
                        <div className="reviews_of_performers_items_wrapper">
                            {reviewsOfPerformers.map((item, index) => {
                                return (
                                    <div className="reviews_of_performers_item" key={index}>
                                        <div className="reviews_of_performers_item_user_img_info_wrapper">
                                            <div className="reviews_of_performers_item_user_img">
                                                <Image
                                                    src={item.user_img}
                                                    alt="Example Image"
                                                    layout="fill" // Fill the parent element
                                                    objectFit="cover" // Cover the area of the parent element
                                                    quality={100} // Image quality
                                                />
                                            </div>
                                            <div className="reviews_of_performers_item_user_info_wrapper">
                                                <p className="reviews_of_performers_item_user_name">{item.user_name}</p>
                                                <p className="reviews_of_performers_item_review_title">{item.review_title}</p>
                                            </div>
                                        </div>
                                        <p className='reviews_of_performers_item_review_text'>
                                            {item.review_info}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="download_application">
                    <div className='download_application_wrapper'>
                        <div className='download_application_items_wrapper'>
                            <div className="download_application_info_item">
                                <h1 className='download_application_title'>Скачайте приложение пользуйтесь</h1>
                                <p className='download_application_info'>
                                    Добро пожаловать на нашу DoYouDo, где лучшие профессионалы и инновационные проекты встречаются для создания выдающихся результатов.Начните свой проект уже сегодня, легко и быстро находя талантливых фрилансеров со всего мира.
                                </p>
                                <div className='download_application_app_google_links_wrapper'>
                                    <a href="" className='download_application_app_link'>
                                        <Image
                                            src="/app_store_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </a>
                                    <a href="" className='download_application_google_link'>
                                        <Image
                                            src="/google_market_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="download_application_img_item">
                                <Image
                                    src="/phones_img.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </div>
                            <div className="mobile_download_application_img_item">
                                <Image
                                    src="/download_mobile_img.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </div>

                        </div>

                    </div>
                </div>
                <Footer/>

            </main>
        </>
    );
}
