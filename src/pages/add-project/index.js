import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/create_order.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import ImageUploader2 from '../includes/ImageUploader2'
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import {useGetCategories} from "@/hooks/useGetCategories";
import {useCreateProfilePortfolio} from "@/hooks/useCreateProfilePortfolio";
import {SuccessIcon} from "@/components/icons/SuccessIcon";


export default function AddProject () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const { getCategories, loadingCategoryInfo, categoriesData } = useGetCategories();
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryError, setCategoryError] = useState('');
    const [images, setImages] = useState([]);
    const [showCreatePortfolioSuccessPopup, setShowCreatePortfolioSuccessPopup] = useState(false);
    const { createProfilePortfolio,  createProfilePortfolioData, imagesErrorText, categoryErrorText, descriptionErrorText, nameErrorText } = useCreateProfilePortfolio();


    useEffect(() => {
        if (createProfilePortfolioData) {
            console.log(createProfilePortfolioData, 'fffff')
            if (createProfilePortfolioData?.message == "Портфолио успешно создано") {
                    setProjectName('');
                    setImages([]);
                    setDescription('');
                    setSelectedCategory('')
                    setSelectedSubCategory('');
                    setShowCreatePortfolioSuccessPopup(true)
            }
        }
    }, [createProfilePortfolioData]);

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    useEffect(() => {

        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);
    const handleSelectCategory = (category) => {
        setSelectedCategory(category); // Store the whole category object
        setSubCategories(category?.subcategories); // Load corresponding subcategories
        setIsOpenForCategories(false);
        setSelectedSubCategory(null); // Reset subcategory when category changes
    };
    const makePortfolio = async () => {
        const formattedImages = images.map((image, index) => ({
            uri: image,  // Image URL
            type: "image/jpeg",  // Ensure correct type
            name: `image_${index}.jpg`
        }));
        await createProfilePortfolio(projectName, description, selectedSubCategoryId, formattedImages);

        setProjectName('');
        setImages([]);
        setDescription('');
        setSelectedCategory('')
        setSelectedSubCategory('');
    }
    const handleImagesUpdate = (uploadedImages) => {
        setImages(uploadedImages); // Update images state with final user images

    };

    const handleSelectSubCategory = (subCategory) => {
        console.log(subCategory, 'subs___')
        setSelectedSubCategory(subCategory);
        setSelectedSubCategoryId(subCategory?.id);
        setIsOpenForSubCategories(false); // Close the dropdown
    };


    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Страница Добавления работы в портфолио</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="add_project_page">
                    <Header/>
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Добавления работы</h1>
                        <div className="create_order_form_items_wrapper">
                            <div className="create_order_form_item">
                                <div className='heading_input_title_wrapper'>
                                    <p className='heading_input_title'>Название проекта</p>
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={handleProjectNameChange}
                                        className='heading_input_field'
                                        placeholder='Название проекта'
                                    />
                                    {nameErrorText &&
                                        <p className='error_text'>{nameErrorText}</p>
                                    }
                                </div>

                                <div className="category_dropdown">
                                    <p className='category_dropdown_title'>Отрасль</p>
                                    <div className="add_category_dropdown add_category_dropdown1">
                                        <div className="add_category_create_order_dropdownHeader"
                                             onClick={() => setIsOpenForCategories(!isOpenForCategories)}>
                                            <p className='add_category_create_order_dropdownHeader_title'>{selectedCategory?.name || 'Категория'}</p>
                                            <span className="arrow">
                                                {isOpenForCategories ?
                                                    <div style={{transform: "rotate(-180deg)"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                             fill="none">
                                                            <path stroke="#333" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth={1.5}
                                                                  d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                        </svg>
                                                    </div>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                         fill="none">
                                                        <path stroke="#333" strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                    </svg>
                                                }
                                            </span>
                                        </div>
                                        {isOpenForCategories && (
                                            <div className="add_category_dropdownList add_category_dropdownList1">
                                                {categoriesData && categoriesData.map((category) => (
                                                    <p key={category?.id} className="add_category_dropdownItem"
                                                       onClick={() => handleSelectCategory(category)}>
                                                        {category?.name}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {/* Subcategory Dropdown */}
                                    <div className="add_category_dropdown add_category_dropdown2">
                                        <div className="add_category_create_order_dropdownHeader"
                                             onClick={() => setIsOpenForSubCategories(!isOpenForSubCategories)}>
                                            <p className='add_category_create_order_dropdownHeader_title'>{selectedSubCategory?.name || 'Подкатегория'}</p>
                                            <span className="arrow">
                                                {isOpenForSubCategories ?
                                                    <div style={{transform: "rotate(-180deg)"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                             fill="none">
                                                            <path stroke="#333" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth={1.5}
                                                                  d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                        </svg>
                                                    </div>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                         fill="none">
                                                        <path stroke="#333" strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={1.5} d="m18 9-6 6-1.5-1.5M6 9l2 2"/>
                                                    </svg>
                                                }
                                            </span>
                                        </div>
                                        {isOpenForSubCategories && (
                                            <div className="add_category_dropdownList add_category_dropdownList2">
                                                {subCategories && subCategories.map((subCategory) => (
                                                    <p key={subCategory?.id} className="add_category_dropdownItem"
                                                       onClick={() => handleSelectSubCategory(subCategory)}>
                                                        {subCategory?.name}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {categoryErrorText &&
                                        <p className='error_text'>{categoryErrorText}</p>
                                    }
                                </div>
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <ImageUploader2 images={images} onImagesUpdate={handleImagesUpdate} />
                                    {imagesErrorText &&
                                        <p className='error_text'>{imagesErrorText}</p>
                                    }
                                </div>

                                <div className='create_order_description_wrapper'>
                                    <p className='create_order_description_wrapper_title'>Описание</p>
                                    <textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        rows="5"
                                        cols="40"
                                        placeholder="Описание"
                                        className='create_order_description_wrapper_input_field'
                                    />
                                    {descriptionErrorText &&
                                        <p className='error_text'>{descriptionErrorText}</p>
                                    }
                                </div>

                            </div>
                        </div>
                        <button
                            className="post_an_order_button"
                            onClick={() => {
                                makePortfolio()
                            }}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
                <Footer/>

                {showCreatePortfolioSuccessPopup &&
                    <div className='add_phone_modal'>
                        <div className='add_phone_modal_wrapper'>
                            <div className='add_phone_modal_icon'>
                                <SuccessIcon/>
                            </div>

                            <h1 className='add_phone_modal_title add_phone_modal_title2'>
                                Портфолио успешно создано
                            </h1>

                            <button
                                className='add_phone_modal_button'
                                onClick={() => {
                                  setShowCreatePortfolioSuccessPopup(false)
                                }}
                            >
                                Закрыть
                            </button>


                        </div>

                    </div>
                }

            </main>
        </>
    );
}
