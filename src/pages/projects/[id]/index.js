import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import '../../../assets/css/order_page.css';
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
import {useGetOrderById} from "@/hooks/useGetOrderById";
import {useCreateResponse} from "@/hooks/useCreateResponse";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";
import {useGetOrderCheckStatusInfo} from "@/hooks/useGetOrderCheckStatusInfo";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";


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
    const [date, setDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [price, setPrice] = useState('');
    const [showSuccessResponsePopup, setShowSuccessResponsePopup] = useState(false);
    const { getOrderById, orderByIdData,loading } = useGetOrderById();
    const { createResponse, createResponseData,responseErrorText, balanceErrorText, dateErrorText, priceErrorText } = useCreateResponse();
    const [activeRole, setActiveRole] = useState('');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getOrderCheckStatusInfo,  orderCheckStatusData } = useGetOrderCheckStatusInfo();
    const [isLogged, setIsLogged] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const mapRef = useRef(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}`);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });


    useEffect(() => {
        console.log(id, 'params______id')
        getOrderById(id)
    }, [id])


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);


    useEffect(() => {
        if (isLogged) {
            getOrderCheckStatusInfo(id)
        }
    }, [isLogged, id])


    useEffect(() => {
         if (orderByIdData) {
             setFirstName(orderByIdData?.user?.first_name)
             setLastName(orderByIdData?.user?.last_name)
             setEmail(orderByIdData?.user?.email)
             setOrder(orderByIdData?.order)
         }
    }, [orderByIdData])

    const router = useRouter();

    useEffect(() => {
         if (createResponseData) {
             console.log(createResponseData, 'hhfh  sp12212i12i')
             if (createResponseData?.message == "Отклик успешно создан") {
                 setPrice('');
                 setResponseText('');
                 setDate('');
                 router.reload();
             }

         }
    }, [createResponseData])



    useEffect(() => {
        if (profileInfoData) {

            setActiveRole(profileInfoData?.active_role)
        }
    }, [profileInfoData])


    const formatDate = (isoDate) =>  {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    const makeResponse  = async () => {
         await createResponse(id, responseText, price, date )
    }
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

    useEffect(() => {
        if (orderByIdData?.order?.latitude && orderByIdData?.order?.longitude) {
            setCoordinates({
                lat: parseFloat(orderByIdData.order.latitude),
                lng: parseFloat(orderByIdData.order.longitude),
            });
        }
    }, [orderByIdData]);

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Работа</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                </Head>

                <div className="home_general_wrapper" id='order_page_for_freelancer'>
                    <Header activePage={"job_page"}/>
                </div>

                <div className='order_page'>
                    <div className="order_page_items_wrapper">
                        <div className="order_page_item1">
                            <div className="order_page_item1_child">
                                <div className="order_page_user_img">
                                    <Image
                                        src={orderByIdData?.user?.photo ? `${imagePath}${orderByIdData?.user?.photo }` : '/upload_img1.png'}
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                                <div className='order_page_item1_child_info_wrapper'>
                                    <p className='order_page_user_name'>{firstName} {lastName}</p>
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
                            {order?.type == "offline"  &&
                                <button className='get_direction_button' onClick={() => {
                                    openNavigatorToMoscow(order)
                                }}>
                                    Проложить маршрут
                                </button>
                            }

                        </div>
                        <div className="order_page_item2">
                            <div className="order_page_date_info_icon_wrapper">
                                <div className="order_page_date_icon">
                                    <DateIcon2/>
                                </div>
                                <p className='order_page_date_info'>{formatDate(order?.start_date)}-{formatDate(order?.end_date)}</p>
                            </div>
                            <div className="order_details_items_wrapper">
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Адрес</p>
                                    <p className="order_detail_item_info">{order?.address}</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Начать</p>
                                    <p className="order_detail_item_info">{order?.title}</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Бюджет</p>
                                    <p className="order_detail_item_info">{order?.price} ₽</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Оплата задания</p>
                                    <p className="order_detail_item_info">По договорённости с бизнес-исполнителем</p>
                                </div>
                                <div className="order_detail_item">
                                    <p className="order_detail_item_title">Нужно</p>
                                    <p className="order_detail_item_info">
                                        {order?.description}
                                    </p>
                                </div>

                                {activeRole == 'freelancer' &&
                                    (!orderCheckStatusData?.isResponded &&
                                        !orderCheckStatusData?.isExecutor &&
                                        orderCheckStatusData?.orderStatus !== 'waiting_freelancer_response' &&
                                        orderCheckStatusData?.orderStatus !== 'in_progress') && (
                                        <div className='order_review_date_info_wrapper'>
                                            <div className="order_review_wrapper">
                                                <div className="order_review_wrapper_header">
                                                    <p className="order_review_wrapper_header_title">Ваш отклик</p>
                                                    <p className="order_review_wrapper_header_info">
                                                        Осталось ответов на заказы: 3
                                                    </p>
                                                </div>
                                                <textarea
                                                    className="order_review_textarea"
                                                    value={responseText}
                                                    onChange={(event) => {
                                                        setResponseText(event.target.value);
                                                    }}
                                                    placeholder='- Другие фрилансеры не увидят ваш отклик и ответы на него
                                                        — Опишите суть предложения и что входит в стоимость работы
                                                        - Если мало информации, напишите здесь вопросы, стоимость согласуете потом'
                                                ></textarea>
                                                {responseErrorText && <p className='error_text'>{responseErrorText}</p>}
                                            </div>
                                            <div className="order_date_fee_info_wrapper">

                                                <div className="order_date_fee_input_title_wrapper">
                                                    <p className="order_date_fee_input_title">Срок исполнения в днях</p>

                                                    <input
                                                        type="number"
                                                        onChange={(event) => {
                                                            setDate(event.target.value);
                                                        }}
                                                        className='order_date_fee_input_field'
                                                        placeholder='13'
                                                    />

                                                    {dateErrorText && <p className='error_text'>{dateErrorText}</p>}

                                                </div>

                                                <div className="order_date_fee_input_title_wrapper">
                                                    <p className="order_date_fee_input_title">Ваш гонорар</p>
                                                    <input
                                                        type="number"
                                                        onChange={(event) => {
                                                            setPrice(event.target.value);
                                                        }}
                                                        className='order_date_fee_input_field'
                                                        placeholder='13'
                                                    />
                                                    {priceErrorText && <p className='error_text'>{priceErrorText}</p>}
                                                </div>

                                            </div>

                                            {balanceErrorText && (
                                                <p className='error_text' style={{ marginBottom: 20, fontSize: 16 }}>
                                                    {balanceErrorText}
                                                </p>
                                            )}

                                            {responseError && (
                                                <p className='error_text' style={{ marginBottom: 20, fontSize: 16 }}>
                                                    {responseError}
                                                </p>
                                            )}

                                            <button
                                                className='reply_to_order_btn'
                                                onClick={() => {
                                                    makeResponse();
                                                }}
                                            >
                                                Откликнуться
                                            </button>

                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                </div>
                {order?.type == "offline" &&
                    <div className="map_img2">
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
                <Footer activePage={"job_page"}/>


            </main>
        </>
    );
}
