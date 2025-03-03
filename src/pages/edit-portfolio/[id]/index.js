import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/create_order.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import ImageUploader3 from '../../includes/ImageUploader3'
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import {useGetCategories} from "@/hooks/useGetCategories";
import {SuccessIcon} from "@/components/icons/SuccessIcon";
import {useGetPortfolioById} from "@/hooks/useGetPortfolioById";
import {useUpdatePortfolioById} from "@/hooks/useUpdatePortfolioById";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}

export default function EditPortfolio ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [showUpdatePortfolioSuccessPopup, setShowUpdatePortfolioSuccessPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const { getCategories, loadingCategoryInfo, categoriesData } = useGetCategories();
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [images, setImages] = useState([]);
    const { getPortfolioById, portfolioByIdData } = useGetPortfolioById();
    const { updatePortfolioById, updatePortfolioByIdData } = useUpdatePortfolioById();


    useEffect(() => {
        if (portfolioByIdData?.data) {
            setProjectName(portfolioByIdData.data.project_name);
            setDescription(portfolioByIdData.data.description);

            const subCategory = portfolioByIdData.data.category;
            console.log("Категория из API:", subCategory);
            setSelectedSubCategory(subCategory);
            setSelectedSubCategoryId(subCategory?.id || null); // Now initialized correctly

            if (categoriesData?.length && subCategory?.parent_id) {
                const parentCategory = categoriesData.find(cat => cat.id === subCategory.parent_id);
                setSelectedCategory(parentCategory || null);
            }

            const parsedImages = JSON.parse(portfolioByIdData.data.image_url || "[]");
            setImages(parsedImages);
        }
    }, [portfolioByIdData, categoriesData]);

    useEffect(() => {
        if (updatePortfolioByIdData) {
            if (updatePortfolioByIdData?.message == 'Портфолио успешно обновлено') {
                 setShowUpdatePortfolioSuccessPopup(true)
                 getPortfolioById(id)
            }
        }
    }, [updatePortfolioByIdData]);

    useEffect(() => {
        getPortfolioById(id)
    }, [])

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

    const handleImagesUpdate = (uploadedImages) => {
        setImages(uploadedImages); // Update images state with final user images

    };

    const updatePortfolio = async () => {
        // Use existing category_id if no new subcategory is selected
        const finalCategoryId = selectedSubCategoryId || portfolioByIdData?.data?.category?.id;

        console.log("Отправка данных в API:", {
            id,
            projectName,
            category_id: finalCategoryId,
            description,
            images
        });

        if (!projectName || !finalCategoryId || !description) {
            alert('Заполните все обязательные поля');
            return;
        }

        await updatePortfolioById(id, projectName, finalCategoryId, description, images);
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
                                </div>
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <ImageUploader3 images={images} onImagesUpdate={handleImagesUpdate} />
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
                                </div>

                            </div>
                        </div>
                        <button
                            className="post_an_order_button"
                            onClick={() => {
                                updatePortfolio()
                            }}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
                <Footer/>


                {showUpdatePortfolioSuccessPopup &&
                    <div className='add_phone_modal'>
                        <div className='add_phone_modal_wrapper'>
                            <div className='add_phone_modal_icon'>
                                <SuccessIcon/>
                            </div>

                            <h1 className='add_phone_modal_title add_phone_modal_title2'>
                                Портфолио успешно обновлено
                            </h1>

                            <button
                                className='add_phone_modal_button'
                                onClick={() => {
                                    setShowUpdatePortfolioSuccessPopup(false)
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
