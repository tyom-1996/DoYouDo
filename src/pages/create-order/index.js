import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/create_order.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ImageUploader from '../includes/ImageUploader';
import FileUploader from '../includes/FileUploader';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateOrderModal from "@/components/createOrderModal";
import InsufficientFundsModal from "@/components/insufficientFundsModal";
import { useMakeOrder } from '../../hooks/useMakeOrder';
import { useGetCategories } from "@/hooks/useGetCategories";
import FilterMap from "src/components/filterMap";

export default function CreateOrder() {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForTypes, setIsOpenForTypes] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [types, setTypes] = useState([
        'Удаленная работа',
        'Работа на месте',
    ]);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState(false);
    const [balance, setBalance] = useState(0);

    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const { getCategories, loadingCategoryInfo, categoriesData } = useGetCategories();
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const {makeOrderData, makeOrder, loadingMakeOrder, errorText} = useMakeOrder();
    const [finalType, setFinalType] = useState('');

    const [categoryError, setCategoryError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [photosError, setPhotosError] = useState('');
    const [filesError, setFilesError] = useState('');


    useEffect(() => {
        if (makeOrderData) {
            console.log(makeOrderData, 'makeOrderData')
            if (makeOrderData?.message == 'Заказ успешно создан') {
                 setShowCreateOrderModal(false)
            }
        }
    }, [makeOrderData]);

    useEffect(() => {
        // Clear fields when the modal closes
        if (!showCreateOrderModal) {
            setAddress('');
            setFiles([]);
            setImages([]);
            setSelectedCategory('');
            setSelectedSubCategory('');
            setSelectedType('');
            setLatitude('');
            setLongitude('');
            setTitle('');
            setDescription('');
            setPrice('');
            setSelectedStartDate('');
            setSelectedEndDate('')
        }
    }, [showCreateOrderModal]);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleImagesUpdate = (uploadedImages) => {
        setImages(uploadedImages); // Update images state with final user images
    };
    const handleFilesUpdate = (uploadedFiles) => {
        setFiles(uploadedFiles); // Update images state with final user images
    };

    // Handle selecting address from FilterMap
    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress.address);  // Set the selected address
        setLatitude(selectedAddress.latitude);  // Set latitude
        setLongitude(selectedAddress.longitude);  // Set longitude
    };

    const handleSelectTypes = (type) => {
        setSelectedType(type)
        if (type === 'Удаленная работа') {
            setFinalType('Remote');
        } else if (type === 'Работа на месте') {
            setFinalType('Offline');
        }
        setIsOpenForTypes(false);
    };

    const handleHeadingChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
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

    const createOrder = () => {
        let hasErrors = false;

        // Error handlers as an array of objects to avoid repetition
        const fieldChecks = [
            { value: selectedSubCategoryId, setError: setCategoryError, message: 'Поле является обязательным.' },
            { value: selectedType, setError: setTypeError, message: 'Поле является обязательным.' },
            { value: address, setError: setAddressError, message: 'Поле является обязательным.' },
            { value: latitude, setError: setLatitudeError, message: 'Поле является обязательным.' },
            { value: longitude, setError: setLongitudeError, message: 'Поле является обязательным.' },
            { value: title, setError: setTitleError, message: 'Поле является обязательным.' },
            { value: description, setError: setDescriptionError, message: 'Поле является обязательным.' },
            { value: price, setError: setPriceError, message: 'Поле является обязательным.' },
            { value: selectedStartDate, setError: setStartDateError, message: 'Поле является обязательным.' },
            { value: selectedEndDate, setError: setEndDateError, message: 'Поле является обязательным.' },
            { value: images, setError: setPhotosError, message: 'Поле является обязательным.' },
            { value: files, setError: setFilesError, message: 'Поле является обязательным.' }
        ];

        // Loop through each field to check for empty values and set errors accordingly
        fieldChecks.forEach(field => {
            if (!field.value || field.value.length === 0) {
                field.setError(field.message);
                hasErrors = true;
            } else {
                field.setError('');
            }
        });

        // If there are no errors, proceed with the order creation
        if (!hasErrors) {
            setShowCreateOrderModal(true)
        }
    };

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Страница создания заказа</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                <div className="home_general_wrapper" id="create_order">
                    <Header activePage='create_order' />
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Cоздание заказа</h1>
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
                                    {categoryError &&
                                        <p className='error_text'>{categoryError}</p>
                                    }
                                </div>

                                {/* Place Dropdown */}
                                <div className="place_dropdown">
                                    <p className='category_dropdown_title'>Место</p>
                                    <div className="create_order_dropdownHeader" onClick={() => setIsOpenForTypes(!isOpenForTypes)}>
                                        <p className='create_order_dropdownHeader_title'>{selectedType || 'Работа на месте'}</p>
                                        <span className="arrow">
                                            {isOpenForTypes ?
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
                                    {isOpenForTypes && (
                                        <div className="dropdownList dropdownList2">
                                            {types.map((type, index) => (
                                                <p key={index} className="dropdownItem" onClick={() => handleSelectTypes(type)}>
                                                    {type}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    {typeError &&
                                        <p className='error_text'>{typeError}</p>
                                    }
                                </div>


                                {/* Map */}
                                <div className='create_order_map_wrapper'>
                                    <FilterMap onSelectAddress={handleAddressSelect} />
                                    {latitudeError && longitudeError &&
                                        <p className='error_text'>{latitudeError}</p>
                                    }

                                </div>

                                {/* Heading Input */}
                                <div className='heading_input_title_wrapper'>
                                    <p className='heading_input_title'>Заголовок</p>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={handleHeadingChange}
                                        className='heading_input_field'
                                        placeholder='Заголовок'
                                    />
                                    {titleError &&
                                        <p className='error_text'>{titleError}</p>
                                    }
                                </div>

                                {/* Image Uploader */}
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <ImageUploader onImagesUpdate={handleImagesUpdate} />
                                    {photosError &&
                                        <p className='error_text'>{photosError}</p>
                                    }
                                </div>

                                {/* File Uploader */}
                                <div className='upload_file_wrapper'>
                                    <p className="upload_file_wrapper_title">Добавить файл</p>
                                    <FileUploader  onFilesUpdate={handleFilesUpdate}/>
                                    {filesError &&
                                        <p className='error_text'>{filesError}</p>
                                    }
                                </div>

                                {/* Description Input */}
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
                                    {descriptionError &&
                                        <p className='error_text'>{descriptionError}</p>
                                    }
                                </div>
                            </div>

                            {/* Budget and Date */}
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
                                    {priceError &&
                                        <p className='error_text'>{priceError}</p>
                                    }
                                </div>
                                <div className="create_order_date_wrapper">
                                    <p className='create_order_date_wrapper_title'>Начать</p>
                                    <DatePicker
                                        selected={selectedStartDate}
                                        onChange={(date) => {
                                            const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
                                            console.log(formattedDate, '-----'); // Log the formatted date for MySQL
                                            setSelectedStartDate(formattedDate);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Выберите дату"
                                    />
                                    {startDateError &&
                                        <p className='error_text'>{startDateError}</p>
                                    }
                                </div>
                                <div className="create_order_date_wrapper">
                                    <p className='create_order_date_wrapper_title'>Дедлайн</p>
                                    <DatePicker
                                        selected={selectedEndDate}
                                        onChange={(date) => {
                                            const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
                                            console.log(formattedDate, '-----'); // Log the formatted date for MySQL
                                            setSelectedEndDate(formattedDate);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Выберите дату"
                                    />
                                    {endDateError &&
                                        <p className='error_text'>{endDateError}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="post_an_order_button"
                            onClick={() => {
                                createOrder()
                            }}
                        >
                            Разместить заказ
                        </button>

                    </div>
                </div>

                {/* Modals */}
                <Footer activePage='create_order' />
                <CreateOrderModal
                    makeOrder={makeOrder}
                    isActive={showCreateOrderModal}
                    categoryId={selectedSubCategoryId}
                    type={finalType}
                    address={address}  // Pass address to modal
                    latitude={latitude}  // Pass latitude to modal
                    longitude={longitude}  // Pass longitude to modal
                    title={title}
                    description={description}
                    price={price}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    photos={images}
                    files={files}
                    onClose={() => setShowCreateOrderModal(false)}
                />
                <InsufficientFundsModal
                    isActive={showInsufficientFundsModal}
                    onClose={() => setShowInsufficientFundsModal(false)}
                />
            </main>
        </>
    );
}
