import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header';
import Footer from '../../../../../components/footer';
import ImageUploader from '../../../../includes/ImageUploader';
import FileUploader from '../../../../includes/FileUploader';
import Head from 'next/head';
import { useRouter } from "next/router";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { DropDownIcon2 } from "@/components/icons/DropDownIcon2";
import FilterMap from "@/components/FilterMap";

// Hooks
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useEditOrder } from "@/hooks/useEditOrder";

// Server props
export async function getServerSideProps({ params }) {
    const id = params.id;
    return {
        props: { id },
    };
}

// Helper to format a JS Date as YYYY-MM-DD
const formatDate = (dateObj) => {
    if (!dateObj) return '';
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // e.g. "2025-03-14"
};

export default function OrderForClient({ id }) {
    const router = useRouter();
    const { getOrderById, orderByIdData, loading } = useGetOrderById();
    const { getCategories, categoriesData } = useGetCategories();
    const { editOrder, editOrderData } = useEditOrder();

    // State for UI sections/tabs
    const [showForEditing, setShowForEditing] = useState(true);
    const [showForResponses, setShowForResponses] = useState(false);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
    const [showForSelectedUser, setShowForSelectedUser] = useState(false);

    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('editing');

    // Place
    const [isOpenForPlaces, setIsOpenForPlaces] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(''); // UI text: 'Удаленная работа' / 'Работа на месте'
    const [placeValue, setPlaceValue] = useState('remote'); // actual value to send: "remote" or "offline"
    const places = ['Удаленная работа', 'Работа на месте'];

    // Category
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

    // Data from order
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    // Images & files
    const [images, setImages] = useState([]);       // newly added by user
    const [existingImages, setExistingImages] = useState([]); // from server
    const [files, setFiles] = useState([]);         // newly added by user
    const [existingFiles, setExistingFiles] = useState([]);   // from server

    // Lifecycle
    useEffect(() => {
        // fetch order data & categories
        getOrderById(id);
        getCategories();
    }, [id]);

    useEffect(() => {
        if (orderByIdData?.order) {
            const ord = orderByIdData.order;

            // Type: fallback "remote" if null
            const ordType = ord.type || "remote";
            if (ordType === "offline") {
                setSelectedPlace('Работа на месте');
                setPlaceValue('offline');
            } else {
                setSelectedPlace('Удаленная работа');
                setPlaceValue('remote');
            }

            // Address
            setAddress(ord.address || '');
            setLatitude(ord.latitude || '');
            setLongitude(ord.longitude || '');

            // Title/desc/price
            setHeading(ord.title || '');
            setDescription(ord.description || '');
            setPrice(ord.price || '');

            // Start/end dates -> Date objects
            const start = ord.start_date ? new Date(ord.start_date) : null;
            const end = ord.end_date ? new Date(ord.end_date) : null;
            if (start && !isNaN(start.getTime())) {
                setSelectedStartDate(start);
            }
            if (end && !isNaN(end.getTime())) {
                setSelectedEndDate(end);
            }

            // Photos/files
            setExistingImages(ord.photos || []);
            setExistingFiles(ord.files || []);

            // Category/subcategory
            if (categoriesData) {
                const catId = ord.category_id;
                const catObj = categoriesData.find(cat => cat.id === catId);
                if (catObj) {
                    setSelectedCategory(catObj);
                    setSubCategories(catObj.subcategories || []);
                    // Optionally, if you want to auto-select a subcategory, you can do:
                    if (catObj.subcategories && catObj.subcategories.length > 0) {
                        setSelectedSubCategory(catObj.subcategories[0]);
                        setSelectedSubCategoryId(catObj.subcategories[0].id);
                    }
                }
            }

        }
    }, [orderByIdData, categoriesData]);

    // Handling user changes
    const handleSelectPlace = (place) => {
        setIsOpenForPlaces(false);
        if (place === 'Работа на месте') {
            setSelectedPlace('Работа на месте');
            setPlaceValue('offline');
        } else {
            setSelectedPlace('Удаленная работа');
            setPlaceValue('remote');
        }
    };

    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress.address || '');
        setLatitude(selectedAddress.latitude || '');
        setLongitude(selectedAddress.longitude || '');
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setSubCategories(category?.subcategories || []);
        setSelectedSubCategory(null);
        setSelectedSubCategoryId(null);
        setIsOpenForCategories(false);
    };

    const handleSelectSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedSubCategoryId(subCategory?.id);
        setIsOpenForSubCategories(false);
    };

    // For top tabs
    const handleTabClick = (
        tab,
        setSelectedTab,
        setShowForEditing,
        setShowForResponses,
        setShowForFeaturedFreelancers,
        setShowForSelectedUser,
        setShowHiddenDropDownMenu
    ) => {
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

    const redirectToResponsesPage = () => {
        router.push(`/my-projects/client/${id}/responses`);
    };
    const redirectToFeaturedFreelancersPage = () => {
        router.push(`/my-projects/client/${id}/featured-freelancers`);
    };
    const redirectToSelectedUsersPage = () => {
        router.push(`/my-projects/client/${id}/selected-users`);
    };

    const handleDropdownClick = () => {
        setShowHiddenDropDownMenu(!showHiddenDropDownMenu);
    };

    // Edit order function
    const editOrderFunction = async () => {
        const categoryId = selectedCategory?.id || 1; // fallback
        // convert JS Date -> "YYYY-MM-DD"
        const start_date = formatDate(selectedStartDate);
        const end_date = formatDate(selectedEndDate);


        await editOrder(
            id,
            categoryId,
            selectedSubCategoryId,
            placeValue,         // "remote" or "offline"
            address,
            latitude,
            longitude,
            heading,
            description,
            price,
            start_date,         // now a string
            end_date,           // now a string
            images,             // newly uploaded images
            files               // newly uploaded files
        );
    };

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Мои проекты</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                </Head>

                <div className="home_general_wrapper my_projects_for_client_page" id="my_projects_for_client_edit_page">
                    <Header activePage='my_projects_for_client_page' />
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>

                        {/* TABS */}
                        <div className='my_project_single_page_tabs_wrapper'>
                            <button
                                className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForEditing(true);
                                    setShowForResponses(false);
                                    setShowForFeaturedFreelancers(false);
                                    setShowForSelectedUser(false);
                                }}
                            >
                                Редактирование
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForResponses(true);
                                    setShowForEditing(false);
                                    setShowForFeaturedFreelancers(false);
                                    setShowForSelectedUser(false);
                                    redirectToResponsesPage();
                                }}
                            >
                                Отклики
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForFeaturedFreelancers(true);
                                    setShowForEditing(false);
                                    setShowForResponses(false);
                                    setShowForSelectedUser(false);
                                    redirectToFeaturedFreelancersPage();
                                }}
                            >
                                Избранные фрилансеры
                            </button>
                            <button
                                className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                onClick={() => {
                                    setShowForSelectedUser(true);
                                    setShowForEditing(false);
                                    setShowForResponses(false);
                                    setShowForFeaturedFreelancers(false);
                                    redirectToSelectedUsersPage();
                                }}
                            >
                                Выбранный исполнитель
                            </button>
                        </div>

                        {/* Mobile dropdown */}
                        <div className="dropdownWrapper">
                            <div className="dropdownHeader2" onClick={handleDropdownClick}>
                                <p className='dropdownHeader_title'>
                                    {selectedTab === 'editing' && 'Редактирование'}
                                    {selectedTab === 'responses' && 'Отклики'}
                                    {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
                                    {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
                                </p>
                                <button
                                    className='dropdownHeader_icon'
                                    style={showHiddenDropDownMenu ? { transform: 'rotate(180deg)' } : {}}
                                >
                                    <DropDownIcon2 />
                                </button>
                            </div>
                            {showHiddenDropDownMenu && (
                                <div className="tabsWrapper">
                                    <button
                                        className="mobile_tab"
                                        onClick={() =>
                                            handleTabClick(
                                                'editing',
                                                setSelectedTab,
                                                setShowForEditing,
                                                setShowForResponses,
                                                setShowForFeaturedFreelancers,
                                                setShowForSelectedUser,
                                                setShowHiddenDropDownMenu
                                            )
                                        }
                                    >
                                        Редактирование
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() =>
                                            handleTabClick(
                                                'responses',
                                                setSelectedTab,
                                                setShowForEditing,
                                                setShowForResponses,
                                                setShowForFeaturedFreelancers,
                                                setShowForSelectedUser,
                                                setShowHiddenDropDownMenu
                                            )
                                        }
                                    >
                                        Отклики
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() =>
                                            handleTabClick(
                                                'featuredFreelancers',
                                                setSelectedTab,
                                                setShowForEditing,
                                                setShowForResponses,
                                                setShowForFeaturedFreelancers,
                                                setShowForSelectedUser,
                                                setShowHiddenDropDownMenu
                                            )
                                        }
                                    >
                                        Избранные фрилансеры
                                    </button>
                                    <button
                                        className="mobile_tab"
                                        onClick={() =>
                                            handleTabClick(
                                                'selectedUser',
                                                setSelectedTab,
                                                setShowForEditing,
                                                setShowForResponses,
                                                setShowForFeaturedFreelancers,
                                                setShowForSelectedUser,
                                                setShowHiddenDropDownMenu
                                            )
                                        }
                                    >
                                        Выбранный исполнитель
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="create_order_form_items_wrapper">
                            {/* LEFT SIDE */}
                            <div className="create_order_form_item">
                                <h2 className="create_order_form_title">Что нужно сделать</h2>

                                {/* CATEGORY */}
                                <div className="category_dropdown">
                                    <p className='category_dropdown_title'>Категория</p>
                                    <div className="add_category_dropdown add_category_dropdown1">
                                        <div
                                            className="add_category_create_order_dropdownHeader"
                                            onClick={() => setIsOpenForCategories(!isOpenForCategories)}
                                        >
                                            <p className='add_category_create_order_dropdownHeader_title'>
                                                {selectedCategory?.name || 'Категория'}
                                            </p>
                                            <span className="arrow">
                        {isOpenForCategories ? (
                            <div style={{ transform: "rotate(-180deg)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                    <path
                                        stroke="#333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                <path
                                    stroke="#333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                />
                            </svg>
                        )}
                      </span>
                                        </div>
                                        {isOpenForCategories && (
                                            <div className="add_category_dropdownList add_category_dropdownList1">
                                                {categoriesData &&
                                                    categoriesData.map((category) => (
                                                        <p
                                                            key={category?.id}
                                                            className="add_category_dropdownItem"
                                                            onClick={() => handleSelectCategory(category)}
                                                        >
                                                            {category?.name}
                                                        </p>
                                                    ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* SUBCATEGORY */}
                                    <div className="add_category_dropdown add_category_dropdown2">
                                        <div
                                            className="add_category_create_order_dropdownHeader"
                                            onClick={() => setIsOpenForSubCategories(!isOpenForSubCategories)}
                                        >
                                            <p className='add_category_create_order_dropdownHeader_title'>
                                                {selectedSubCategory?.name || 'Подкатегория'}
                                            </p>
                                            <span className="arrow">
                        {isOpenForSubCategories ? (
                            <div style={{ transform: "rotate(-180deg)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                    <path
                                        stroke="#333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                <path
                                    stroke="#333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                />
                            </svg>
                        )}
                      </span>
                                        </div>
                                        {isOpenForSubCategories && (
                                            <div className="add_category_dropdownList add_category_dropdownList2">
                                                {subCategories &&
                                                    subCategories.map((subCat) => (
                                                        <p
                                                            key={subCat?.id}
                                                            className="add_category_dropdownItem"
                                                            onClick={() => handleSelectSubCategory(subCat)}
                                                        >
                                                            {subCat?.name}
                                                        </p>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* PLACE */}
                                <div className="place_dropdown">
                                    <p className='category_dropdown_title'>Место</p>
                                    <div
                                        className="create_order_dropdownHeader"
                                        onClick={() => setIsOpenForPlaces(!isOpenForPlaces)}
                                    >
                                        <p className='create_order_dropdownHeader_title'>
                                            {selectedPlace || 'Можно выполнить удаленно'}
                                        </p>
                                        <span className="arrow">
                      {isOpenForPlaces ? (
                          <div style={{ transform: 'rotate(-180deg)' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                                  <path
                                      stroke="#333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                  />
                              </svg>
                          </div>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                              <path
                                  stroke="#333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="m18 9-6 6-1.5-1.5M6 9l2 2"
                              />
                          </svg>
                      )}
                    </span>
                                    </div>
                                    {isOpenForPlaces && (
                                        <div className="dropdownList dropdownList2">
                                            {places.map((place, index) => (
                                                <p
                                                    key={index}
                                                    className="dropdownItem"
                                                    onClick={() => handleSelectPlace(place)}
                                                >
                                                    {place}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* MAP if offline */}
                                {selectedPlace === 'Работа на месте' && (
                                    <div className='create_order_map_wrapper'>
                                        <FilterMap onSelectAddress={handleAddressSelect} />
                                    </div>
                                )}

                                {/* TITLE */}
                                <div className='heading_input_title_wrapper'>
                                    <p className='heading_input_title'>Заголовок</p>
                                    <input
                                        type="text"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        className='heading_input_field'
                                        placeholder='Заголовок'
                                    />
                                </div>

                                {/* PHOTOS (existing + new) */}
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <div className='uploaded_images_preview'>
                                        {existingImages && existingImages.map((img, i) => (
                                            <div key={i} className='image_preview'>
                                                <img src={img} alt={`existing-${i}`} />
                                            </div>
                                        ))}
                                    </div>
                                    {/* ImageUploader for new images */}
                                    <ImageUploader onImagesUpdate={setImages} />
                                </div>

                                {/* FILES (existing + new) */}
                                <div className='upload_file_wrapper'>
                                    <p className="upload_file_wrapper_title">Добавить файл</p>
                                    <ul className='uploaded_files_list'>
                                        {existingFiles && existingFiles.map((f, i) => (
                                            <li key={i}>
                                                <a href={f} target="_blank" rel="noopener noreferrer">
                                                    {`File ${i + 1}`}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <FileUploader onFilesUpdate={setFiles} />
                                </div>

                                {/* DESCRIPTION */}
                                <div className='create_order_description_wrapper'>
                                    <p className='create_order_description_wrapper_title'>Подробное описание</p>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="5"
                                        cols="40"
                                        placeholder="Описание"
                                        className='create_order_description_wrapper_input_field'
                                    />
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="create_order_form_item">
                                <h2 className="create_order_form_title">Бюджет и срок</h2>

                                <div className='create_order_form_price_wrapper'>
                                    <p className='create_order_form_price_wrapper_title'>Сколько готовы заплатить за работу?</p>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
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

                                <div className='order_page_edit_save_cancel_buttons_wrapper'>
                                    <button
                                        className='order_page_edit_save_btn'
                                        onClick={editOrderFunction}
                                    >
                                        Сохранить
                                    </button>
                                    <button className='order_page_edit_cancel_btn'>
                                        Отменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer activePage='my_projects_for_client_page' />
                </div>
            </main>
        </>
    );
}
