import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import '../../../../../assets/css/order_page.css';
import '../../../../../assets/css/leave_feedback.css';
import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import Head from 'next/head';
import {DateIcon2} from "@/components/icons/DateIcon2";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import { useRouter } from 'next/router';
import {useGetFreelancerOrderById} from "@/hooks/useGetFreelancerOrderById";
import StarRatingComponent from "react-star-rating-component";
import {useCreateReviews} from "@/hooks/useCreateReviews";
import FeedBackSuccess from "@/components/feedbackSuccessModal";
import {useCheckReviews} from "@/hooks/useCheckReviews";
import {useCreateChat} from "@/hooks/useCreateChat";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import { useGetProfileInfo } from '@/hooks/useGetProfileInfo';

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}


const containerStyle = {
    width: '100%',
    height: '518px',
    borderRadius: '15px',
    overflow: 'hidden',
};

const defaultCenter = {
    lat: 55.7558,
    lng: 37.6176,
};

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
    const [showForClosing, setShowForClosing] = useState(false);
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const { getFreelancerOrderById, freelancerOrderByIddData } = useGetFreelancerOrderById();
    const { createReview, createReviewData } = useCreateReviews();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}`);
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [showFeedbackSuccessModal, setShowFeedbackSuccessModal] = useState(false);
    const [reviewType, setReviewType] = useState('positive');
    const { checkReviews, checkReviewsData, errorText} = useCheckReviews();
    const {createChat, createChatData } = useCreateChat();
    const {profileInfoData, getProfileInfo } = useGetProfileInfo();
    const [showCheckReviewsState, setShowCheckReviewsState] = useState(false);
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const mapRef = useRef(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        if (createChatData) {
            router.push(`/chat/${id}`);
        }
    }, [createChatData]);

    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    };
    useEffect(() => {
        if (createChatData?.message == "Чат успешно создан") {
            router.push(`/chat/${id}`);
        }
    }, [createChatData]);

    useEffect(() => {
        if (id) {
            checkReviews(id);
        }
    }, [id]);




    useEffect(() => {
        if (errorText?.message) {
            console.log(errorText?.message, 'errorText')
            if (errorText?.message == 'Отзыв не найден для данного заказа') {
                setShowCheckReviewsState(true)
            }
        }
    }, [errorText]);



    useEffect(() => {
        if (createReviewData) {
            if (createReviewData?.message == 'Отзыв успешно добавлен') {
                setReviewType('');
                setRating(1);
                setReviewText('');
                setShowReviewPopup(false);
                setShowFeedbackSuccessModal(true)
            }
        }

    }, [createReviewData])

    useEffect(() => {
         getFreelancerOrderById(id)
    }, [id])

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

    const formatDateRussian = (isoDateStr) => {
        const date = new Date(isoDateStr);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    console.log(formatDateRussian("2023-01-15T00:00:00.000Z")); // Outputs: "15 января 2023"

    const makeReview = async () => {
        let clientId = freelancerOrderByIddData?.data[0]?.client_id;
        await createReview(clientId, id, rating, reviewType, reviewText)
    }
    useEffect(() => {
        if (freelancerOrderByIddData?.data?.[0]?.latitude && freelancerOrderByIddData?.data?.[0]?.longitude) {
            setCoordinates({
                lat: parseFloat(freelancerOrderByIddData.data[0].latitude),
                lng: parseFloat(freelancerOrderByIddData.data[0].longitude),
            });
        }

        if (freelancerOrderByIddData?.data[0]?.order_status == 'closed') {
                setShowForClosing(true)
        }
    }, [freelancerOrderByIddData]);
    const openNavigatorToMoscow = (coords) => {
        if (!coords?.latitude || !coords?.longitude) {
            console.warn('Сначала получите координаты пользователя!');
            return;
        }

        // Координаты Москвы
        const moscowLat = 55.755826;
        const moscowLng = 37.6172999;

        // Формируем ссылку для Яндекс.Карт
        const url = `https://yandex.ru/maps/?rtext=${coords?.latitude},${coords?.longitude}~${moscowLat},${moscowLng}&rtt=auto`;

        // Открываем
        window.open(url, '_blank');
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
                <div className="home_general_wrapper" id='order_page_for_freelancer'>
                    <Header activePage={"my_projects_for_freelancer_page"}/>
                </div>
                <div className='order_page'>
                    <div className="order_page_items_wrapper">
                        <div className="order_page_item1">
                            <div className="order_page_item1_child">
                                <div className="order_page_user_img">
                                    <Image
                                        src={freelancerOrderByIddData?.data[0]?.client_photo ? `${imagePath}${freelancerOrderByIddData?.data[0]?.client_photo}` : '/upload_img1.png'}
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                                <div className='order_page_item1_child_info_wrapper'>
                                    <p className='order_page_user_name'>{freelancerOrderByIddData?.data[0]?.client_first_name} {freelancerOrderByIddData?.data[0]?.client_last_name}</p>
                                    <p className='order_page_user_country'>{freelancerOrderByIddData?.data[0]?.client_address}</p>
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
                            {freelancerOrderByIddData?.data?.[0]?.latitude && freelancerOrderByIddData?.data?.[0]?.longitude && (
                                <button
                                    className='get_direction_button'
                                    style={{marginBottom: 10}}
                                    onClick={() => {
                                        openNavigatorToMoscow({
                                            latitude: freelancerOrderByIddData.data[0].latitude,
                                            longitude: freelancerOrderByIddData.data[0].longitude,
                                        });
                                    }}
                                >
                                    Проложить маршрут
                                </button>
                            )}
                            <button
                                className="get_direction_button"
                                onClick={() => {
                                    const isFreelancer = profileInfoData?.id === freelancerOrderByIddData?.data[0]?.freelancer_id;
                                    const receiverId = isFreelancer
                                        ? freelancerOrderByIddData?.data[0]?.client_id
                                        : freelancerOrderByIddData?.data[0]?.freelancer_id;

                                    createChat(id);
                                }}

                            >
                                Написать сообщение
                            </button>

                        </div>
                        <div className="order_page_item2">
                            <div className="order_page_date_info_icon_wrapper">
                                <div className="order_page_date_icon">
                                    <DateIcon2/>
                                </div>
                                <p className='order_page_date_info'>{formatDateRussian(freelancerOrderByIddData?.data[0]?.end_date)}</p>
                            </div>
                            <div className="order_details_items_wrapper">
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Адрес</p>
                                    <p className="order_detail_item_info">{freelancerOrderByIddData?.data[0]?.address}</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Начать</p>
                                    <p className="order_detail_item_info">{formatDateRussian(freelancerOrderByIddData?.data[0]?.start_date)}</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Бюджет</p>
                                    <p className="order_detail_item_info">{freelancerOrderByIddData?.data[0]?.order_price.toString().replace(/\.00$/, '')}</p>
                                </div>
                                {/*<div className="order_detail_item">*/}
                                {/*    <p className="order_detail_item_title">Оплата задания</p>*/}
                                {/*    <p className="order_detail_item_info">По договорённости с бизнес-исполнителем</p>*/}
                                {/*</div>*/}
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Нужно</p>
                                    <p className="order_detail_item_info">
                                        {freelancerOrderByIddData?.data[0]?.description}
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
                            {showForClosing && showCheckReviewsState  &&
                                <button
                                    className='leave_feedback_btn'
                                     onClick={() => {
                                         setShowReviewPopup(true)
                                         disableBodyScroll()
                                     }}
                                >
                                    Оставить отзыв
                                </button>
                            }


                        </div>
                    </div>
                </div>
                {freelancerOrderByIddData?.data?.[0]?.latitude && freelancerOrderByIddData?.data?.[0]?.longitude &&

                    <div className="map_img2">
                        {/*latitude": null,*/}
                        {/*"longitude*/}
                        {isLoaded && coordinates?.lat && coordinates?.lng && !isNaN(coordinates.lat) && !isNaN(coordinates.lng) && (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={coordinates}
                                zoom={12}
                                onLoad={(map) => {
                                    mapRef.current = map;
                                    setIsMapReady(true);
                                }}
                            >
                                <Marker position={coordinates} />
                            </GoogleMap>
                        )}

                    </div>
                }
                {/*<div className="recommendations">*/}
                {/*    <div className="recommendations_wrapper">*/}
                {/*        <h1 className='recommendations_title'>Похожие работы</h1>*/}
                {/*        <div className='recommendations_items_wrapper'>*/}
                {/*            {similarWorksList.map((item, index) => {*/}
                {/*                return (*/}
                {/*                    <div className='services_item' key={index}>*/}
                {/*                        <div className="services_item_name_address_info_wrapper">*/}
                {/*                            <p className="services_item_name">{item?.service_name}</p>*/}
                {/*                            <p className="services_item_address_info">{item?.service_address}</p>*/}
                {/*                        </div>*/}

                {/*                        <p className="services_item_info">{item?.service_type_info}</p>*/}
                {/*                        <div className='services_item_pirce_date_info_wrapper'>*/}
                {/*                            <div className='services_item_pirce_wrapper'>*/}
                {/*                                <p className='services_item_pirce_info'>{item?.service_price}</p>*/}
                {/*                            </div>*/}
                {/*                            <div className='services_item_date_hour_wrapper'>*/}
                {/*                                <div className='services_item_date_hour_title_icon_wrapper'>*/}
                {/*                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>*/}
                {/*                                    <DateIcon/>*/}
                {/*                                </div>*/}
                {/*                                <div className='services_item_date_hour_info_wrapper'>*/}
                {/*                                    <p className='services_item_date_hour_info1'>{item.service_date},</p>*/}
                {/*                                    <p className='services_item_date_hour_info2'>{item.service_hour}</p>*/}
                {/*                                </div>*/}

                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*        </div>*/}
                {/*        <div className="pagination_links_wrapper">*/}
                {/*            <button className="pagination_link_btn">*/}
                {/*                <PaginationLeftIcon/>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link">*/}
                {/*                <p className="pagination_link_title">1</p>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link active">*/}
                {/*                <p className="pagination_link_title">2</p>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link">*/}
                {/*                <p className="pagination_link_title">3</p>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link">*/}
                {/*                <p className="pagination_link_title">4</p>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link">*/}
                {/*                <p className="pagination_link_title">....</p>*/}
                {/*            </button>*/}
                {/*            <button className="pagination_link_btn">*/}
                {/*                <PaginationRightIcon/>*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Footer activePage={"my_projects_for_freelancer_page"}/>

                {showReviewPopup &&
                    <div className="leave_feedback_popup">
                        <div className="leave_feedback_main_wrapper">
                            <button
                                className='leave_feedback_popup_close_icon'
                                onClick={() => {
                                    setShowReviewPopup(false)
                                    enableBodyScroll()
                                }}
                            >
                                <FilterCloseIcon/>
                            </button>
                            <h1 className='leave_feedback_title'>Оставить отзыв</h1>
                            <div className="leave_feedback_textarea_title_main_wrapper">
                                <p className='leave_feedback_textarea_title'>Оценка</p>
                                <div className='leave_feedback_rating_info_stars_wrapper'>
                                    <StarRatingComponent
                                        name="rate1"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={onStarClick}
                                        renderStarIcon={(index, value) => {
                                            return (
                                                <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={28}
                                                height={27}
                                                fill={index <= value ? "#FFC107" : "#D9D9D9"}
                                            >
                                                <path
                                                    d="M27.536 11.082 21.5 17.265l1.42 8.751c.125.698-.633 1.21-1.24.879l-7.421-4.111V0c.315 0 .63.146.766.45l3.728 7.94 8.3 1.262c.694.124.95.94.484 1.43ZM14.258 0v22.784l-7.422 4.11c-.595.335-1.365-.172-1.238-.878l1.419-8.75L.98 11.081a.853.853 0 0 1 .484-1.43l8.3-1.262L13.494.45c.135-.304.45-.45.765-.45Z"
                                                />
                                            </svg>
                                        </span>
                                            );
                                        }}
                                    />
                                    <p className='leave_feedback_rating_info'>3.5/5</p>
                                </div>

                            </div>
                            <div className="radioGroup">
                                <label className="radioLabel">
                                    <input
                                        type="radio"
                                        name="choice"
                                        value="positive"
                                        checked={reviewType === 'positive'}
                                        onChange={(e) => setReviewType(e.target.value)}
                                    />
                                    <span className="radioCustom"></span>
                                    Положительный
                                </label>
                                <label className="radioLabel">
                                    <input
                                        type="radio"
                                        name="choice"
                                        value="negative"
                                        checked={reviewType === 'negative'}
                                        onChange={(e) => setReviewType(e.target.value)}
                                    />
                                    <span className="radioCustom"></span>
                                    Отрицательный
                                </label>
                            </div>
                            <div className="leave_feedback_textarea_title_main_wrapper">
                                <p className='leave_feedback_textarea_title'>Отзыв</p>
                                <textarea
                                    placeholder='Текст'
                                    className='leave_feedback_textarea_field'
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                className='leave_feedback_page_btn'
                                onClick={() => {
                                    makeReview()
                                }}
                            >
                                Отправить
                            </button>

                        </div>
                    </div>

                }

                <FeedBackSuccess
                    isActive={showFeedbackSuccessModal}
                    onClose={() => {
                        setShowFeedbackSuccessModal(false)
                    }}
                />
            </main>
        </>
    );
}
