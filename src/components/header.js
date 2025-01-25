import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../assets/css/header.css';
import {CloseIcon} from "@/components/icons/CloseIcon";
import {LogoutIcon} from "@/components/icons/LogoutIcon";
import {MobileMenuIcon} from "@/components/icons/MobileMenuIcon";
import {useRouter} from "next/router";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";

export default function Header(props) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [activeRole, setActiveRole] = useState('');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    useEffect(() => {

          if (profileInfoData) {
                setUserImage(profileInfoData?.photo)
              console.log(``, 'profileInfoData?.photo_______')
                setActiveRole(profileInfoData?.active_role)
          }
     }, [profileInfoData])


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
    const handleNavigateToLogin = () => {
        router.push('/auth/login');
    };
    const logout = async () => {
        await localStorage.clear()
        router.push('/auth/login');
    }

    return (
        <>
            <header className="header" id='home_page'>
                <div className="header_wrapper">
                    <div className='header_logo_nav_wrapper'>
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
                                    <a href="/projects" className={`header_ul_link ${props.activePage === 'job_page' ? 'active_link' : ''}`}>
                                        Работа
                                    </a>
                                </li>
                                <li className="header_ul_li">
                                    <a href="/freelancers" className={`header_ul_link ${props.activePage === 'freelancers_page' ? 'active_link' : ''}`}>
                                        Фрилансеры
                                    </a>

                                </li>
                                <li className="header_ul_li">
                                    <a href="/create-order" className={`header_ul_link ${props.activePage === 'create_order' ? 'active_link' : ''}`}>
                                        Создать задание
                                    </a>
                                </li>
                                <li className="header_ul_li">
                                    <a
                                        href={activeRole == 'freelancer' ? '/my-projects/freelancer' : activeRole == 'client' ? '/my-projects/client' : ''}
                                        className={`header_ul_link ${props.activePage === 'my_projects_for_freelancer_page' ? 'active_link' : ''}`}
                                    >
                                        Мои Проекты {activeRole}
                                    </a>
                                </li>
                                <li className="header_ul_li">
                                    <a href="/chat" className={`header_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                        Чат
                                    </a>
                                </li>

                            </ul>
                        </nav>
                    </div>

                    {isLogged ?
                        <button
                            className='header_user_btn'
                            onClick={() => {
                                setShowProfilePopup(!showProfilePopup)
                            }}
                        >

                            <Image
                                src={userImage ? `${imagePath}${userImage}` : '/user_img2.png'}
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />

                        </button>
                        :
                        <button
                            className='header_login_btn'
                            onClick={() => {
                                handleNavigateToLogin()
                            }}

                        >

                            Войти

                        </button>
                    }
                    {showProfilePopup &&
                        <div className='profile_popup'>
                            <div className='profile_popup_wrapper'>

                                {activeRole == 'freelancer' &&
                                    <a href="/profile/freelancer-profile" className='profile_popup_link'>Профиль</a>
                                }

                                {activeRole == 'client' &&
                                    <a href="/profile/client-profile" className='profile_popup_link'>Профиль</a>
                                }

                                {activeRole == 'freelancer' &&
                                    <a href="/profile/freelancer-profile-settings" className='profile_popup_link'>Настройки</a>
                                }

                                {activeRole == 'client' &&
                                    <a href="/profile/client-profile-settings" className='profile_popup_link'>Настройки</a>
                                }

                                <a href="/profile/client-profile" className='profile_popup_link'>Войти как заказчик</a>
                                <button
                                    className='profile_logout_btn'
                                    onClick={() => {
                                        logout()
                                    }}
                                >
                                    Выйти из аккаунта
                                    <LogoutIcon/>
                                </button>
                            </div>
                        </div>
                    }


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
                                        <a href="/projects" className={`header_ul_link ${props.activePage === 'job_page' ? 'active_link' : ''}`}>
                                            Работа
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="/freelancers" className={`header_ul_link ${props.activePage === 'freelancers_page' ? 'active_link' : ''}`}>
                                            Фрилансеры
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="/create-order" className={`header_ul_link ${props.activePage === 'create_order' ? 'active_link' : ''}`}>
                                            Создать задание
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="/my-projects/freelancer" className={`header_ul_link ${props.activePage === 'my_projects_for_freelancer_page' ? 'active_link' : ''}`}>
                                            Мои Проекты
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                        <a href="/chat" className={`header_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                            Чат
                                        </a>
                                    </li>

                                    <a href="" className='profile_popup_link'>Настройки</a>
                                    <a href="" className='profile_popup_link'>Войти как заказчик</a>
                                    <a href="" className='profile_popup_link'>Выйти из аккаунта</a>

                                </ul>
                            </nav>
                            <button
                                className='header_login_btn'
                                onClick={() => {
                                    setShowMobileMenu(false)
                                    handleNavigateToLogin()
                                }}
                            >
                                Войти
                            </button>

                        </div>
                    </div>
                }

            </header>
        </>
    );
}
