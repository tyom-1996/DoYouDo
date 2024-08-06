import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/freelancers.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {SearchMobileIcon} from "@/components/icons/SearchMobileIcon";
import {DateIcon} from "@/components/icons/DateIcon";
import {FilterIcon} from "@/components/icons/FilterIcon";
import { useRouter } from 'next/router';
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {DropDownIcon3} from "@/components/icons/DropDownIcon3";
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";

export default function Freelancers () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [freelancersList, setFreelancersList] = useState([
        {
            id: 1,
            freelancer_img: '/freelancers_img1.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '\n 💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n' +
                '\n 🛠 Техническая поддержка и вык ... '
        },
        {
            id: 2,
            freelancer_img: '/freelancers_img2.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 3,
            freelancer_img: '/freelancers_img3.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 4,
            freelancer_img: '/freelancers_img4.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 5,
            freelancer_img: '/freelancers_img5.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 6,
            freelancer_img: '/freelancers_img6.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 7,
            freelancer_img: '/freelancers_img7.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 8,
            freelancer_img: '/freelancers_img8.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },
        {
            id: 9,
            freelancer_img: '/freelancers_img9.png',
            freelancer_name: 'Daniela Gallego',
            freelancer_profession: 'Дизайн',
            distance: '466 метров от вас',
            freelancer_rating: '4.8/5',
            freelancer_reviews_quantity: '53',
            freelancer_service_advantages: '📌 Разработка кроссплатформенных приложений "под ключ" \n' +
                '💰 Экономим $$ и время заказчика (пишем 1 код сразу под iOS, Android и Web) \n ' +
                '🛠 Техническая поддержка и вык...'
        },

    ]);
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
    const [showHiddenFilterCategoriesPart, setShowHiddenFilterCategoriesPart] = useState(false);

    const [IsOpenForRadius, setIsOpenForRadius] = useState(false);
    const [selectedRadius, setSelectedRadius] = useState('');
    const [taskCost, setTaskCost] = useState('');
    const [radius, setRadius] = useState([
        '50 км',
        '100 км',
        '200 км',
        '300 км',
        '400 км',
        '500 км',
    ]);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
    const [filters, setFilters] = useState({
        remoteWork: false,
        noResponses: true,
        sortBy: 'urgency',
    });

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSortChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            sortBy: e.target.value,
        }));
    };



    const handleCheckboxChange = () => {
        setIsCheckedAllCategories(!isCheckedAllCategories);
    };



    useEffect(() => {
        handleUseFilter()
    }, [selectedCategories, selectedCities]);

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

    const navigateToMapPage = () => {
        router.push('/map');
    };
    const redirectToFreelancerSinglePage = (id) => {
        router.push(`/freelancers/${id}`);
    }
    const  handleSelectRadius = (item) => {
        setSelectedRadius(item);
        setIsOpenForRadius(false);
    }
    const handleTaskCostChange = (e) => {
        setTaskCost(e.target.value);
    }
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
            <main className='general_page_wrapper' id='freelancers_page'>
                <Head>
                    <title>Фрилансеры</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"freelancers_page"}/>
                    <div className="freelancers">
                        <div className="services_wrapper">
                            <div className="services_search_box_logo_wrapper">
                                <div className="services_search_box">
                                    <div className="services_search_input_field">
                                        <div className='services_search_input_field_icon'>
                                            <SearchIcon/>
                                        </div>
                                        <input type="text" placeholder='Cпециалист' className='services_search_input'/>
                                    </div>
                                    <div className='services_search_box_buttons_wrapper'>
                                        <button className='services_search_box_search_button'>
                                            Найти
                                        </button>
                                        <button
                                            className='services_search_box_map_button'
                                            onClick={() => {
                                                navigateToMapPage()
                                            }}
                                        >
                                            Карта
                                        </button>
                                        <button
                                            className='services_search_box_filter_button'
                                            onClick={() => {
                                               setShowFilterMobile(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            <FilterIcon/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mobile_services_search_box">
                                    <div className='services_search_input_field_btn_wrapper'>
                                        <div className="services_search_input_field">
                                            <div className='services_search_input_field_icon'>
                                                <SearchIcon/>
                                            </div>
                                            <input type="text" placeholder='Услуга' className='services_search_input'/>
                                        </div>
                                        <button className='services_search_box_search_button'>
                                            <SearchMobileIcon/>
                                        </button>
                                    </div>

                                    <div className='services_search_box_buttons_wrapper'>
                                        <button
                                            className='services_search_box_map_button'
                                            onClick={() => {
                                                navigateToMapPage()
                                            }}
                                        >
                                            Карта
                                        </button>
                                        <button
                                            className='services_search_box_filter_button'
                                            onClick={() => {
                                                setShowFilterMobile(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            Фильтр
                                        </button>
                                    </div>
                                </div>
                                <div className='services_search_box_logo'>
                                    <Image
                                        src="/main_logo.png"
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                            </div>
                            <div className="services_items_filter_main_wrapper">
                                <div className="services_filter_items_wrapper">

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
                                <div className='services_items_wrapper'>
                                    <div className='services_items_wrapper_child'>
                                        {freelancersList.map((item, index) => {
                                            return (
                                                <button
                                                    className="freelancers_item" key={index}
                                                    onClick={() => {
                                                        redirectToFreelancerSinglePage(item?.id)
                                                    }}
                                                >
                                                    <div className="freelancers_item_user_img">
                                                        <Image
                                                            src={item.freelancer_img}
                                                            alt="Example Image"
                                                            layout="fill" // Fill the parent element
                                                            objectFit="cover" // Cover the area of the parent element
                                                            quality={100} // Image quality
                                                        />
                                                    </div>
                                                    <div className='freelancers_item_info_box'>
                                                        <p className="freelancers_item_user_name">{item.freelancer_name}</p>
                                                        <div className='freelancers_item_user_header_item'>
                                                            <p className="freelancers_item_user_profession">{item.freelancer_profession}</p>
                                                            <p className="freelancers_item_user_distance_info">{item.distance}</p>
                                                        </div>

                                                        <div className="freelancers_item_user_rating_icon_reviews_info_wrapper">
                                                            <div className="freelancers_item_user_rating_info_wrapper">
                                                                <div className="freelancers_item_user_rating_icon">
                                                                    <Image
                                                                        src={'/stars.png'}
                                                                        alt="Example Image"
                                                                        layout="fill" // Fill the parent element
                                                                        objectFit="cover" // Cover the area of the parent element
                                                                        quality={100} // Image quality
                                                                    />
                                                                </div>
                                                                <p className='freelancers_item_user_rating_info'>{item.freelancer_rating}</p>
                                                            </div>
                                                            <p className='freelancers_item_reviews_info'>{item.freelancer_reviews_quantity} отзыва</p>
                                                        </div>
                                                        <div className="freelancers_item_line"></div>
                                                        <p className='freelancers_item_user_service_info'>
                                                            {item.freelancer_service_advantages}
                                                        </p>
                                                    </div>

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
                    </div>

                    <Footer activePage={"freelancers_page"}/>
                    {showFilterMobile &&
                        <div className='filter_mobile_menu'>
                            <div className='filter_mobile_menu_wrapper'>
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
                                    <div className='filter_task_categories_wrapper'>
                                        <div
                                            className='filter_task_categories_header'
                                            onClick={() => {
                                                setShowHiddenFilterCategoriesPart(!showHiddenFilterCategoriesPart)
                                            }}
                                        >
                                            <p className='filter_task_categories_header_title'>Категории заданий</p>
                                            <button
                                                className={`filter_task_categories_header_icon${showHiddenFilterCategoriesPart ? '2' : ''}`}
                                            >
                                                <DropDownIcon3/>
                                            </button>

                                        </div>
                                        {showHiddenFilterCategoriesPart &&
                                            <div className='filter_task_categories_main'>
                                                <div className="filter_task_categories_input_title_wrapper filter_task_categories_input_title_wrapper2">
                                                    <p className="filter_task_categories_input_title">Город, адрес, метро, район</p>
                                                    <input
                                                        type="text"
                                                        value={address}
                                                        onChange={handleAddressChange}
                                                        placeholder="Город, адрес, метро, район"
                                                        className='filter_task_categories_input_field filter_task_categories_input_field_address'
                                                    />
                                                    {address.length > 0 &&
                                                        <button
                                                            className='delete_input_btn'
                                                            onClick={() => {
                                                                setAddress('')
                                                            }}
                                                        >
                                                            <DeleteAddressIcon/>
                                                        </button>
                                                    }

                                                </div>

                                                <div className="radius_dropdown">
                                                    <p className='radius_dropdown_title'>Радиус поиска</p>
                                                    <div className="radius_dropdownHeader" onClick={() => setIsOpenForRadius(!IsOpenForRadius)}>
                                                        <p className='radius_dropdownHeader_title'>{selectedRadius || 'Радиус поиска'}</p>
                                                        <span className="arrow">
                                            {IsOpenForRadius ?
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
                                                    {IsOpenForRadius && (
                                                        <div className="radius_dropdownList radius_dropdownList2">
                                                            {radius.map((item, index) => (
                                                                <p key={index} className="radius_dropdownItem" onClick={() => handleSelectRadius(item)}>
                                                                    {item}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="filter_task_categories_input_title_wrapper">
                                                    <p className="filter_task_categories_input_title">Стоимость заданий от</p>
                                                    <input
                                                        type="text"
                                                        value={taskCost}
                                                        onChange={handleTaskCostChange}
                                                        placeholder="₽"
                                                        className='filter_task_categories_input_field'
                                                    />
                                                </div>
                                                <div className='filter_option_checkbox_items_wrapper'>
                                                    <div className='filter_option_checkbox_item'>
                                                        <h3 className="filter_option_checkbox_items_wrapper_title">Показывать только задания со статусами</h3>
                                                        <div className="filter-option">
                                                            <label className='filter_option_label'>
                                                                <input
                                                                    type="checkbox"
                                                                    name="remoteWork"
                                                                    checked={filters.remoteWork}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <div className='filter_option_label_title_wrapper'>
                                                                    <span className='filter_option_label_title'>Удалённая работа</span>
                                                                    <span className='filter_option_label_title2'>Никуда не надо ехать</span>
                                                                </div>

                                                            </label>
                                                        </div>
                                                        <div className="filter-option">
                                                            <label className='filter_option_label'>
                                                                <input
                                                                    type="checkbox"
                                                                    name="noResponses"
                                                                    checked={filters.noResponses}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <div className='filter_option_label_title_wrapper'>
                                                                    <span className='filter_option_label_title'>Задания без откликов</span>
                                                                    <span className='filter_option_label_title2'>Откликнитесь первым</span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className='filter_option_checkbox_item'>
                                                        <h3 className="filter_option_checkbox_items_wrapper_title">Сортировать по:</h3>
                                                        <div className="sort-options">
                                                            <label className="sort-option">
                                                                <input
                                                                    type="radio"
                                                                    name="sortBy"
                                                                    value="date"
                                                                    checked={filters.sortBy === 'date'}
                                                                    onChange={handleSortChange}
                                                                />
                                                                <p className='sort_option_title'> Дате публикации</p>

                                                            </label>
                                                            <label className="sort-option">
                                                                <input
                                                                    type="radio"
                                                                    name="sortBy"
                                                                    value="urgency"
                                                                    checked={filters.sortBy === 'urgency'}
                                                                    onChange={handleSortChange}
                                                                />
                                                                <p className='sort_option_title'>Срочности</p>

                                                            </label>
                                                            <label className="sort-option">
                                                                <input
                                                                    type="radio"
                                                                    name="sortBy"
                                                                    value="distance"
                                                                    checked={filters.sortBy === 'distance'}
                                                                    onChange={handleSortChange}
                                                                />
                                                                <p className='sort_option_title'>Удалённости</p>

                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>
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

                </div>

            </main>
        </>
    );
}
