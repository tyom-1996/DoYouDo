import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../assets/css/header.css';
import {CloseIcon} from "@/components/icons/CloseIcon";
import {MobileMenuIcon} from "@/components/icons/MobileMenuIcon";
import {useRouter} from "next/router";

export default function Header() {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showMobileMenu, setShowMobileMenu] = useState(false);


    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const router = useRouter();

    const handleNavigateToHome = () => {
        router.push('/');
    };

    return (
        <>
            <header className="header" id='home_page'>
                <div className="header_wrapper">
                    <button
                        className='header_img'
                        onClick={() => {
                            handleNavigateToHome()
                        }}
                    >
                        <Image
                            src="/main_logo.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                    </button>
                    <nav className="header_nav">
                        <ul className="header_ul_list">
                            <li className="header_ul_li">
                                <a href="" className="header_ul_link active_link">
                                    Работа
                                </a>
                            </li>
                            <li className="header_ul_li">
                                <a href="" className="header_ul_link">
                                    Фрилансеры
                                </a>

                            </li>
                            <li className="header_ul_li">
                                <a href="" className="header_ul_link">
                                    Создать задание
                                </a>
                            </li>
                            <li className="header_ul_li">
                                <a href="" className="header_ul_link">
                                    Мои Проекты
                                </a>
                            </li>
                            <li className="header_ul_li">
                                <a href="" className="header_ul_link">
                                    Чат
                                </a>
                            </li>

                        </ul>
                    </nav>
                    <button className='header_login_btn'>
                        Войти
                    </button>
                </div>
                <div className="mobile_header_wrapper">
                    <button
                        className='mobile_menu_btn'
                        onClick={() => {
                            setShowMobileMenu(true)
                            disableBodyScroll()
                        }}
                    >
                        <MobileMenuIcon/>
                    </button>
                    <div className='header_img'>
                        <Image
                            src="/main_logo.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                    </div>
                </div>
                {showMobileMenu &&
                    <div className='mobile_menu'>
                        <div className='mobile_menu_wrapper'>
                            <div className='mobile_menu_close_btn_logo_wrapper'>
                                <button
                                    className='mobile_menu_close_icon'
                                    onClick={() => {
                                        setShowMobileMenu(false)
                                        enableBodyScroll()
                                    }}
                                >
                                    <CloseIcon/>
                                </button>
                                <div className='header_img'>
                                    <Image
                                        src="/main_logo.png"
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                            </div>

                            <nav className="header_nav">
                                <ul className="header_ul_list">
                                    <li className="header_ul_li">
                                        <a href="" className="header_ul_link active_link">
                                            Работа
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="" className="header_ul_link">
                                            Фрилансеры
                                        </a>

                                    </li>
                                    <li className="header_ul_li">
                                        <a href="" className="header_ul_link">
                                            Создать задание
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="" className="header_ul_link">
                                            Мои Проекты
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="" className="header_ul_link">
                                            Чат
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            <button className='header_login_btn'>
                                Войти
                            </button>
                        </div>
                    </div>
                }

            </header>
        </>
    );
}
