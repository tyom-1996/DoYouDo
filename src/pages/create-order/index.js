import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/create_order.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import ImageUploader from '../includes/ImageUploader'
import FileUploader from '../includes/FileUploader'
import Head from 'next/head';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateOrderModal from "@/components/createOrderModal";
import InsufficientFundsModal from "@/components/insufficientFundsModal";



export default function CreateOrder () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isOpenForPlaces, setIsOpenForPlaces] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [categories, setCategories] = useState([
        'Разработка андроид приложения',
        'Дизайн',
        'Компьютерная помощь',
        'Разработка ПО',
        'Красота и здоровье',
    ]);
    const [places, setPlaces] = useState([
            'Можно выполнить удаленно',
            'Не можно выполнить удаленно',
    ]);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState(false);
    const [balance, setBalance] = useState(0);



    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setIsOpenForCategories(false);
    };
    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
        setIsOpenForPlaces(false);
    };
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };
    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const handleHeadingChange = (event) => {
        setHeading(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);



    const handleAddressChange = async (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);

        if (newAddress.length > 3) {
            // Fetch coordinates from Yandex Geocode API
            const response = await fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=ed170562-fba8-4475-84f5-8940538e66e2&format=json&geocode=${newAddress}`
            );
            const data = await response.json();

            if (data.response.GeoObjectCollection.featureMember.length) {
                const coords =
                    data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number);
                setCoordinates([coords[1], coords[0]]);
            }
        }
    };





    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Страница создания заказа</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="create_order">
                    <Header activePage='create_order'/>
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Cоздание заказа</h1>
                        <div className="create_order_form_items_wrapper">
                            <div className="create_order_form_item">
                                <h2 className="create_order_form_title">Что нужно сделать</h2>
                                <div className="category_dropdown">
                                    <p className='category_dropdown_title'>Категория</p>
                                    <div className="create_order_dropdownHeader" onClick={() => setIsOpenForCategories(!isOpenForCategories)}>
                                        <p className='create_order_dropdownHeader_title'>{selectedCategory || 'Выберите категорию'}</p>
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
                                        <div className="dropdownList dropdownList1">
                                            {categories.map((category, index) => (
                                                <p key={index} className="dropdownItem" onClick={() => handleSelectCategory(category)}>
                                                    {category}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="place_dropdown">
                                    <p className='category_dropdown_title'>Место</p>
                                    <div className="create_order_dropdownHeader" onClick={() => setIsOpenForPlaces(!isOpenForPlaces)}>
                                        <p className='create_order_dropdownHeader_title'>{selectedPlace || 'Можно выполнить удаленно'}</p>
                                        <span className="arrow">
                                            {isOpenForPlaces ?
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
                                    {isOpenForPlaces && (
                                        <div className="dropdownList dropdownList2">
                                            {places.map((place, index) => (
                                                <p key={index} className="dropdownItem" onClick={() => handleSelectPlace(place)}>
                                                    {place}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className='create_order_map_wrapper'>
                                    <div className="create_order_map_input_box">
                                        <p className="create_order_map_input_box_title">Адрес</p>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={handleAddressChange}
                                            placeholder="137219874"
                                            className='create_order_map_input_field'
                                        />
                                    </div>

                                    <YMaps>
                                        <Map
                                            state={{ center: coordinates, zoom: 9 }}
                                            width="100%"
                                            height="518px"
                                            className='create_order_map'
                                        >
                                            <Placemark geometry={coordinates} />
                                        </Map>
                                    </YMaps>
                                </div>
                                <div className='heading_input_title_wrapper'>
                                    <p className='heading_input_title'>Заголовок</p>
                                        <input
                                            type="text"
                                            value={heading}
                                            onChange={handleHeadingChange}
                                            className='heading_input_field'
                                            placeholder='Заголовок'
                                        />
                                </div>
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <ImageUploader/>
                                </div>
                                <div className='upload_file_wrapper'>
                                    <p className="upload_file_wrapper_title">Добавить файл</p>
                                    <FileUploader/>
                                </div>
                                <div className='create_order_description_wrapper'>
                                    <p className='create_order_description_wrapper_title'>Подробное описание</p>
                                    <textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        rows="5"
                                        cols="40"
                                        placeholder="Описание"
                                        className='create_order_description_wrapper_input_field'
                                    />
                                </div>

                            </div>
                            <div className="create_order_form_item">
                                <h2 className="create_order_form_title">Бюджет и срок</h2>
                                <div className='create_order_form_price_wrapper'>
                                    <p className='create_order_form_price_wrapper_title'>Сколько готовы заплатить за работу?</p>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={handlePriceChange}
                                        placeholder="1000 руб."
                                        className='create_order_form_price_wrapper_input_field'
                                    />
                                </div>
                                <div className="create_order_date_wrapper">
                                    <p className='create_order_date_wrapper_title'>Начать</p>
                                    <DatePicker
                                        selected={selectedStartDate}
                                        onChange={(date) => setSelectedStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Выберите дату"
                                    />
                                </div>
                                <div className="create_order_date_wrapper">
                                    <p className='create_order_date_wrapper_title'>Дедлайн</p>
                                    <DatePicker
                                        selected={selectedEndDate}
                                        onChange={(date) => setSelectedEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Выберите дату"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="post_an_order_button"
                            onClick={() => {
                                // {balance == 0 ?
                                //     setShowInsufficientFundsModal(true)
                                //     :
                                //     setShowCreateOrderModal(true)
                                // }
                                setShowCreateOrderModal(true)
                                disableBodyScroll()

                            }}
                        >
                            Разместить заказ
                        </button>
                    </div>
                </div>
                <Footer activePage='create_order'/>
                <CreateOrderModal
                    isActive={showCreateOrderModal}
                    onClose={() => {
                        setShowCreateOrderModal(false)
                    }}
                />
                <InsufficientFundsModal
                    isActive={showInsufficientFundsModal}
                    onClose={() => {
                        setShowInsufficientFundsModal(false)
                    }}
                />

            </main>
        </>
    );
}
