import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/create_order.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import ImageUploader from '../includes/ImageUploader'
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';


export default function AddProject () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([
        'Разработка андроид приложения',
        'Дизайн',
        'Компьютерная помощь',
        'Разработка ПО',
        'Красота и здоровье',
    ]);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setIsOpenForCategories(false);
    };

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
                                <div className='upload_photo_wrapper'>
                                    <p className='upload_photo_wrapper_title'>Добавить фото</p>
                                    <ImageUploader/>
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
                            className="post_an_order_button">
                            Добавить
                        </button>
                    </div>
                </div>
                <Footer />

            </main>
        </>
    );
}
