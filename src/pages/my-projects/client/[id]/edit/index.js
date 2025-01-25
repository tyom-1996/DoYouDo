import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import ImageUploader from '../../../../includes/ImageUploader'
import FileUploader from '../../../../includes/FileUploader'
import Head from 'next/head';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import {LikesIcon2} from "@/components/icons/LikesIcon2";
import {DisLikesIcon2} from "@/components/icons/DisLikesIcon2";
import {useRouter} from "next/router";
import {useGetOrderById} from "@/hooks/useGetOrderById";
import {useGetCategories} from "@/hooks/useGetCategories";
import {useMakeOrder} from "@/hooks/useMakeOrder";
import {useEditOrder} from "@/hooks/useEditOrder";
import FilterMap from "@/components/FilterMap";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}



export default function OrderForClient ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForPlaces, setIsOpenForPlaces] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState('');

    const [places, setPlaces] = useState([
        'Удаленная работа',
        'Работа на месте',
    ]);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [showForEditing, setShowForEditing] = useState(true);
    const [showForResponses, setShowForResponses] = useState(false);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
    const [showForSelectedUser, setShowForSelectedUser] = useState(false);

    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('editing');
    const { getOrderById, orderByIdData,loading } = useGetOrderById();
    const { getCategories, loadingCategoryInfo, categoriesData } = useGetCategories();


    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const {editOrder, editOrderData} = useEditOrder();


    useEffect(() => {
        console.log(id, 'id______')
        getOrderById(id)
    }, [])

    useEffect(() => {
        if (orderByIdData) {
            // Set all the other data as before
            if (orderByIdData?.order?.type === "offline") {
                setSelectedPlace('Удаленная работа');
            } else {
                setSelectedPlace('Работа на месте');
            }
            setAddress(orderByIdData?.order?.address);
            setCoordinates([parseFloat(orderByIdData?.order?.latitude), parseFloat(orderByIdData?.order?.longitude)]);
            setHeading(orderByIdData?.order?.title);
            setDescription(orderByIdData?.order?.description);
            setPrice(parseFloat(orderByIdData?.order?.price).toFixed(2).replace(/\.00$/, ''));
            setImages(orderByIdData.order.photos || []);
            setFiles(orderByIdData.order.files || []);

            // Ensure the dates are valid Date objects
            const startDate = new Date(orderByIdData?.order?.start_date);
            const endDate = new Date(orderByIdData?.order?.end_date);

            if (!isNaN(startDate.getTime())) {
                setSelectedStartDate(startDate);
            } else {
                console.error("Invalid start date:", orderByIdData?.order?.start_date);
            }

            if (!isNaN(endDate.getTime())) {
                setSelectedEndDate(endDate);
            } else {
                console.error("Invalid end date:", orderByIdData?.order?.end_date);
            }

            // Handle category and subcategory selection
            if (categoriesData) {
                const categoryId = orderByIdData.order.category_id;

                const category = categoriesData.find(cat =>
                    cat.subcategories.some(sub => sub.id === categoryId)
                );

                if (category) {
                    const subCategory = category.subcategories.find(sub => sub.id === categoryId);

                    setSelectedCategory(category);
                    setSelectedSubCategory(subCategory);
                }
            }
        }
    }, [orderByIdData, categoriesData]);




    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
        setIsOpenForPlaces(false);
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



    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress.address);  // Set the selected address
        setLatitude(selectedAddress.latitude);  // Set latitude
        setLongitude(selectedAddress.longitude);  // Set longitude
        // if (selectedAddress.address) {
        //     setAddressError('');
        //     setLatitudeError('');
        //     setLongitudeError('');
        // }
        console.log(selectedAddress, 'selected-adress')
    };

    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };

    const handleTabClick = (tab, setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu) => {
        setSelectedTab(tab);
        if (tab === 'editing') {
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/edit`);

        } else if (tab === 'responses') {
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/responses`);
        } else if (tab === 'featuredFreelancers') {
            setShowForEditing(false);
            setShowForResponses(false);
            setShowForFeaturedFreelancers(true);
            setShowForSelectedUser(false);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/featured-freelancers`);

        } else if (tab === 'selectedUser') {
            setShowForEditing(false);
            setShowForResponses(false);
            setShowForFeaturedFreelancers(false);
            setShowForSelectedUser(true);
            setShowHiddenDropDownMenu(false);
            router.push(`/my-projects/client/${id}/selected-users`);
        }

    };

    const router = useRouter();
    const redirectToResponsesPage = () => {
        router.push(`/my-projects/client/${id}/responses`);
    };
    const redirectToFeaturedFreelancersPage = () => {
        router.push(`/my-projects/client/${id}/featured-freelancers`);
    };
    const redirectToSelectedUsersPage = () => {
        router.push(`/my-projects/client/${id}/selected-users`);
    };
    const handleSelectCategory = (category) => {
        setSelectedCategory(category); // Store the whole category object
        setSubCategories(category?.subcategories); // Load corresponding subcategories
        setIsOpenForCategories(false);
        setSelectedSubCategory(null); // Reset subcategory when category changes
    };

    const handleSelectSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedSubCategoryId(subCategory?.id);
        setIsOpenForSubCategories(false); // Close the dropdown
    };
    const editOrderFunction = async () => {
        await editOrder(id,selectedSubCategoryId, selectedPlace, address, latitude, longitude,heading, description, price, selectedStartDate, selectedEndDate, images,files)
    };
    const handleImagesUpdate = (uploadedImages) => {
        setImages(uploadedImages); // Update images state with final user images
    };
    const handleFilesUpdate = (uploadedFiles) => {
        setFiles(uploadedFiles); // Update images state with final user images
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
                <div className="home_general_wrapper my_projects_for_client_page" id="my_projects_for_client_edit_page">
                    <Header activePage='my_projects_for_client_page'/>
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>
                        <div className='my_project_single_page_tabs_wrapper'>
                            <button
                                className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForEditing(true)
                                    setShowForSelectedUser(false)
                                    setShowForResponses(false)
                                    setShowForFeaturedFreelancers(false)

                                }}
                            >
                                Редактирование
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForResponses(true)
                                    setShowForSelectedUser(false)
                                    setShowForEditing(false)
                                    setShowForFeaturedFreelancers(false)
                                    redirectToResponsesPage()

                                }}
                            >
                                Отклики
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForFeaturedFreelancers(true)
                                    setShowForSelectedUser(false)
                                    setShowForEditing(false)
                                    setShowForResponses(false)
                                    redirectToFeaturedFreelancersPage()
                                }}
                            >
                                Избранные фрилансеры
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForSelectedUser(true)
                                    setShowForEditing(false)
                                    setShowForResponses(false)
                                    setShowForFeaturedFreelancers(false)
                                    redirectToSelectedUsersPage()
                                }}
                            >
                                Выбранный исполнитель
                            </button>
                        </div>
                        <div className="dropdownWrapper">
                            <div
                                className="dropdownHeader2"
                                onClick={handleDropdownClick}
                            >
                                <p className='dropdownHeader_title'>
                                    {selectedTab === 'editing' && 'Редактирование'}
                                    {selectedTab === 'responses' && 'Отклики'}
                                    {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
                                    {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
                                </p>

                                <button
                                    className='dropdownHeader_icon'
                                    style={showHiddenDropDownMenu ? {transform: 'rotate(180deg)'} : {}}
                                >
                                    <DropDownIcon2/>
                                </button>
                            </div>
                            {showHiddenDropDownMenu && (
                                <div className="tabsWrapper">
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('editing', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Редактирование
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('responses', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Отклики
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('featuredFreelancers', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Избранные фрилансеры
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() => handleTabClick('selectedUser', setSelectedTab, setShowForEditing, setShowForResponses, setShowForFeaturedFreelancers, setShowForSelectedUser, setShowHiddenDropDownMenu)}
                                    >
                                        Выбранный исполнитель
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="create_order_form_items_wrapper">
                                <div className="create_order_form_item">
                                    <h2 className="create_order_form_title">Что нужно сделать</h2>
                                    {/* Category Dropdown */}
                                    <div className="category_dropdown">
                                        <p className='category_dropdown_title'>Категория</p>
                                        <div className="add_category_dropdown add_category_dropdown1">
                                            <div className="add_category_create_order_dropdownHeader" onClick={() => setIsOpenForCategories(!isOpenForCategories)}>
                                                <p className='add_category_create_order_dropdownHeader_title'>{selectedCategory?.name || 'Категория'}</p>
                                                <span className="arrow">
                                                {isOpenForCategories ?
                                                    <div style={{ transform: "rotate(-180deg)" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                                            <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                        </svg>
                                                    </div>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                                        <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                    </svg>
                                                }
                                            </span>
                                            </div>
                                            {isOpenForCategories && (
                                                <div className="add_category_dropdownList add_category_dropdownList1">
                                                    {categoriesData && categoriesData.map((category) => (
                                                        <p key={category?.id} className="add_category_dropdownItem" onClick={() => handleSelectCategory(category)}>
                                                            {category?.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {/* Subcategory Dropdown */}
                                        <div className="add_category_dropdown add_category_dropdown2">
                                            <div className="add_category_create_order_dropdownHeader" onClick={() => setIsOpenForSubCategories(!isOpenForSubCategories)}>
                                                <p className='add_category_create_order_dropdownHeader_title'>{selectedSubCategory?.name || 'Подкатегория'}</p>
                                                <span className="arrow">
                                                {isOpenForSubCategories ?
                                                    <div style={{ transform: "rotate(-180deg)" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                                            <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                        </svg>
                                                    </div>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                                        <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                    </svg>
                                                }
                                            </span>
                                            </div>
                                            {isOpenForSubCategories && (
                                                <div className="add_category_dropdownList add_category_dropdownList2">
                                                    {subCategories && subCategories.map((subCategory) => (
                                                        <p key={subCategory?.id} className="add_category_dropdownItem" onClick={() => handleSelectSubCategory(subCategory)}>
                                                            {subCategory?.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
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
                                    {/* Map */}
                                    {selectedPlace =='Работа на месте' &&
                                        <div className='create_order_map_wrapper'>
                                            <FilterMap onSelectAddress={handleAddressSelect} />
                                        </div>
                                    }


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
                                    {/* Image Uploader */}
                                    <div className='upload_photo_wrapper'>
                                        <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                        <ImageUploader onImagesUpdate={handleImagesUpdate} />
                                    </div>

                                    {/* File Uploader */}
                                    <div className='upload_file_wrapper'>
                                        <p className="upload_file_wrapper_title">Добавить файл</p>
                                        <FileUploader  onFilesUpdate={handleFilesUpdate}/>

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
                                <div className='order_page_edit_save_cancel_buttons_wrapper'>
                                    <button
                                        className='order_page_edit_save_btn'
                                        onClick={() => {
                                            editOrderFunction()
                                        }}
                                    >
                                        Сохранить
                                    </button>
                                    <button className='order_page_edit_cancel_btn'>Отменить</button>
                                </div>
                            </div>

                    </div>

                </div>
                <Footer activePage='my_projects_for_client_page'/>

            </main>
        </>
    );
}

