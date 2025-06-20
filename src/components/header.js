import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import '../assets/css/header.css';
import {CloseIcon} from "@/components/icons/CloseIcon";
import {LogoutIcon} from "@/components/icons/LogoutIcon";
import {MobileMenuIcon} from "@/components/icons/MobileMenuIcon";
import {useRouter} from "next/router";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";
import {useGetChatUnreadCount} from "@/hooks/useGetChatUnreadCount";
import {useSetProfileToggleRole} from "@/hooks/useSetProfileToggleRole";

export default function Header(props) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [activeRole, setActiveRole] = useState('');
    const [activeRole2, setActiveRole2] = useState('');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getChatsUnreadCountData, getChatUnreadCount } = useGetChatUnreadCount();
    const { profileToggleRole,profileToggleRoleData } = useSetProfileToggleRole();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const popupRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // If popupRef is set and the clicked target is not inside the popup container, close the popup
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowProfilePopup(false);
            }
        };

        if (showProfilePopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfilePopup]);

    useEffect(() => {

          if (profileInfoData) {
                setUserImage(profileInfoData?.photo)
              console.log(``, 'profileInfoData?.photo_______')
                if (profileInfoData?.active_role == 'client') {
                        setActiveRole2('Войти как фрилансер')
                } else  {
                    setActiveRole2('Войти как заказчик')
                }
                setActiveRole(profileInfoData?.active_role)
          }
     }, [profileInfoData])
    const router = useRouter();

    useEffect(() => {
        if (profileToggleRoleData) {
            const newRoleText = profileToggleRoleData?.newRole === 'freelancer'
                ? 'Войти как фрилансер'
                : 'Войти как заказчик';

            // Set local state
            setActiveRole2(newRoleText);

            // Persist to localStorage
            localStorage.setItem('activeRole2', newRoleText);

            // Redirect logic
            if (router.pathname === '/') {
                router.reload();
            } else {
                router.push('/');
            }
        }
    }, [profileToggleRoleData]);
    useEffect(() => {
        const savedRole = localStorage.getItem('activeRole2');
        if (savedRole) {
            setActiveRole2(savedRole);
        }
    }, []);




    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };


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


    useEffect(() => {
        getChatUnreadCount()
    }, [])


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
                        <nav
                            className={
                                !isLogged
                                    ? "header_nav3"
                                    : activeRole === 'freelancer'
                                        ? "header_nav2"
                                        : "header_nav"
                            }
                        >
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
                                {isLogged && activeRole == 'client' &&
                                    <li className="header_ul_li">

                                                <a href="/create-order" className={`header_ul_link ${props.activePage === 'create_order' ? 'active_link' : ''}`}>
                                                    Создать задание
                                                </a>
                                    </li>
                                }
                                <li className="header_ul_li">
                                    {isLogged && (
                                            <a
                                                href={activeRole == 'freelancer' ? '/my-projects/freelancer' : activeRole == 'client' ? '/my-projects/client' : ''}
                                                className={`header_ul_link ${props.activePage === 'my_projects_for_freelancer_page' ? 'active_link' : ''}`}
                                            >
                                                Мои Проекты
                                            </a>
                                        )

                                    }

                                </li>
                                <li className="header_ul_li">
                                    {isLogged && (
                                            <a href="/chat"
                                               className={`header_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                                Чат
                                                {getChatsUnreadCountData && getChatsUnreadCountData?.data.length > 0 && (
                                                   <>
                                                       {getChatsUnreadCountData?.data.map((item, index) => {
                                                           return (
                                                               <div key={index} className='header_chat_unread_count_box'>
                                                                   <p className='header_chat_unread_count_info'>{item?.unread_count}</p>
                                                               </div>
                                                           );
                                                       })}

                                                   </>
                                                )}

                                            </a>
                                        )
                                    }

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
                        <div className='profile_popup'  ref={popupRef}>
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

                                <button className='profile_popup_link'
                                        onClick={() => {
                                            profileToggleRole()
                                        }}
                                >
                                    {activeRole2}
                                </button>
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
                                        <a href="/projects"
                                           className={`header_ul_link ${props.activePage === 'job_page' ? 'active_link' : ''}`}>
                                            Работа
                                        </a>
                                    </li>
                                    <li className="header_ul_li">
                                            <a href="/freelancers"
                                               className={`header_ul_link ${props.activePage === 'freelancers_page' ? 'active_link' : ''}`}>
                                                Фрилансеры
                                            </a>
                                    </li>
                                    <li className="header_ul_li">
                                        {isLogged && activeRole == 'client' && (
                                                <a href="/create-order"
                                                   className={`header_ul_link ${props.activePage === 'create_order' ? 'active_link' : ''}`}>
                                                    Создать задание
                                                </a>
                                            )
                                        }

                                    </li>
                                    <li className="header_ul_li">
                                        {isLogged && (
                                                <a
                                                    href={activeRole == 'freelancer' ? '/my-projects/freelancer' : activeRole == 'client' ? '/my-projects/client' : ''}
                                                    className={`header_ul_link ${props.activePage === 'my_projects_for_freelancer_page' ? 'active_link' : ''}`}
                                                >
                                                    Мои Проекты
                                                </a>
                                            )
                                        }

                                    </li>
                                    <li className="header_ul_li">
                                        {isLogged && (
                                                <a href="/chat"
                                                   className={`header_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                                    Чат
                                                    {getChatsUnreadCountData && getChatsUnreadCountData?.data.length > 0 && (
                                                        <>
                                                            {getChatsUnreadCountData?.data.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='header_chat_unread_count_box'>
                                                                        <p className='header_chat_unread_count_info'>{item?.unread_count}</p>
                                                                    </div>
                                                                );
                                                            })}

                                                        </>
                                                    )}
                                                </a>
                                            )
                                        }

                                    </li>

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
