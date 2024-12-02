import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/freelancers_profile_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import { useRouter } from 'next/router';
import SettingsImageUploader from '../../includes/SettingsImageUploader'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function FreelancerProfileSettingsPage () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [email, setEmail] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [gender, setGender] = useState([
        'Женщина',
        'Мужчина',
    ]);
    const [isOpenForGender, setIsOpenForGender] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');

    const [city, setCity] = useState([
        'Москва,     Россия',
        'Амстердам,  Нидерланды',
        'Берлин,     Германия',
        'Брюссель,   Бельгия',
        'Берн,       Швейцария',
        'Вена,       Австрия',
        'Мадрид,     Испания',
        'Прага,      Чехия',
        'Рим,        Италия',
        'Таллин,     Эстония',
    ]);
    const [isOpenForCity, setIsOpenForCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const router = useRouter();

    const redirectToAddPhoneNumber = () => {
        router.push(`/add-phone-number`);
    };
    const redirectToChangePassword = () => {
        router.push(`/change-password`);
    };
    const redirectToDeleteAccount = () => {
        router.push(`/delete-account`);
    };
    const redirectToAddPassport = () => {
        router.push(`/add-passport`);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };
    const handleAboutMeChange = (event) => {
        setAboutMe(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSelectGender = (item) => {
        setSelectedGender(item);
        setIsOpenForGender(false);
    };
    const handleSelectCity = (item) => {
        setSelectedCity(item);
        setIsOpenForCity(false);
    };


    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Профиль Исполнителя</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='freelancer_profile_settings'>
                    <Header activePage={"freelancer_profile_settings"}/>
                    <div className="freelancer_single_page_wrapper" id='freelancer_single_page_wrapper_settings'>
                        <div className="freelancer_single_page_user_info_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper_child"></div>
                            <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_item1">
                                    <SettingsImageUploader/>
                                </div>
                                <div className="freelancer_single_page_user_info_wrapper_item2">
                                    <div className="freelancer_single_page_user_info_wrapper_item2_img">
                                        <Image
                                            src="/freelancer_logo_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>
                                    <div className="settings_items_wrapper">
                                        <div className="settings_item">
                                            <p className='settings_item_title'>Личные данные</p>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Имя</p>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={handleNameChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Имя'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Фамилия</p>
                                                <input
                                                    type="text"
                                                    value={surname}
                                                    onChange={handleSurnameChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Фамилия'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Про меня</p>
                                                <textarea
                                                    value={aboutMe}
                                                    onChange={handleAboutMeChange}
                                                    rows="5"
                                                    cols="40"
                                                    placeholder="Про меня"
                                                    className='settings_item_input_field'
                                                />
                                            </div>
                                            <div className='settings_item_add_passport_title_btn_wrapper'>
                                                <p className='settings_item_add_passport_title'>Пасспорт</p>
                                                <button
                                                    className='settings_item_add_passport_btn'
                                                    onClick={() => {
                                                        redirectToAddPassport()
                                                    }}
                                                >
                                                    Добавить
                                                </button>
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Дата рождения</p>
                                                <DatePicker
                                                    selected={selectedStartDate}
                                                    onChange={(date) => setSelectedStartDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    isClearable
                                                    placeholderText="Выберите дату"
                                                    className='settings_item_input_field'
                                                />
                                            </div>
                                            <div className="settings_dropdown settings_dropdown1">
                                                <p className='settings_dropdown_title'>Пол</p>
                                                <div className="settings_dropdownHeader" onClick={() => setIsOpenForGender(!isOpenForGender)}>
                                                    <p className='settings_dropdownHeader_title'>{selectedGender || 'Пол'}</p>
                                                    <span className="arrow">
                                                            {isOpenForGender ?
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
                                                {isOpenForGender && (
                                                    <div className="settings_dropdownList settings_dropdownList1">
                                                        {gender.map((item, index) => (
                                                            <p key={index} className="settings_dropdownItem" onClick={() => handleSelectGender(item)}>
                                                                {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="settings_dropdown settings_dropdown2">
                                                <p className='settings_dropdown_title'>Город</p>
                                                <div className="settings_dropdownHeader" onClick={() => setIsOpenForCity(!isOpenForCity)}>
                                                    <p className='settings_dropdownHeader_title'>{selectedCity || 'Город'}</p>
                                                    <span className="arrow">
                                                            {isOpenForCity ?
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
                                                {isOpenForCity && (
                                                    <div className="settings_dropdownList settings_dropdownList2">
                                                        {city.map((item, index) => (
                                                            <p key={index} className="settings_dropdownItem" onClick={() => handleSelectCity(item)}>
                                                                {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <button className='settings_save_btn'>Сохранить</button>
                                        </div>
                                        <div className="settings_item">
                                            <p className='settings_item_title'>Эл. почта и Номер телефона</p>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Эл. почта</p>
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Эл. почта'
                                                />
                                            </div>
                                            <div className='settings_item_add_passport_title_btn_wrapper'>
                                                <p className='settings_item_add_passport_title'>Номер телефона</p>
                                                <button
                                                    className='settings_item_add_passport_btn'
                                                    onClick={() => {
                                                        redirectToAddPhoneNumber()
                                                    }}
                                                >
                                                    Добавить
                                                </button>
                                            </div>
                                        </div>
                                        <div className='settings_change_password_delete_profile_btns_wrapper'>
                                            <button
                                                className='settings_change_password_delete_profile_btn'
                                                onClick={() => {
                                                    redirectToChangePassword()
                                                }}
                                            >
                                                Изменить пароль
                                            </button>
                                            <button
                                                className='settings_change_password_delete_profile_btn'
                                                onClick={() => {
                                                    redirectToDeleteAccount()
                                                }}

                                            >
                                                Удалить профиль
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer activePage={"freelancer_profile_settings"}/>


                </div>


            </main>
        </>
    );
}
