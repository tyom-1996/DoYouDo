import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../assets/css/footer.css';

export default function Footer(props) {
    const [windowHeight, setWindowHeight] = useState(0);


    return (
        <>
            <footer className="footer">
                <div className="footer_wrapper">
                    <div className='footer_first_child'>
                        <div className='footer_img_nav_wrapper'>
                            <div className='footer_img'>
                                <Image
                                    src="/main_logo.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </div>
                            <nav className="footer_nav">
                                <ul className="footer_ul_list_first_list">
                                    <li className="footer_ul_li">
                                        <a href="/projects"
                                           className={`footer_ul_link ${props.activePage === 'job_page' ? 'active_link' : ''}`}
                                        >
                                            Работа
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="/freelancers"
                                           className={`footer_ul_link ${props.activePage === 'freelancers_page' ? 'active_link' : ''}`}
                                        >
                                            Фрилансеры
                                        </a>

                                    </li>
                                    <li className="footer_ul_li">
                                        <a href=""
                                           className="footer_ul_link"
                                        >
                                            Создать задание
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="/my-projects/client" className={`footer_ul_link ${props.activePage === 'my_projects_for_client_page' ? 'active_link' : ''}`}>
                                            Мои Проекты
                                        </a>
                                    </li>
                                </ul>
                                <ul className="footer_ul_list_second_list">
                                    <li className="footer_ul_li">
                                        <a href="/chat"
                                           className={`footer_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                            Чат
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="/how-it-works"
                                           className={`footer_ul_link ${props.activePage === 'how_it_works_page' ? 'active_link' : ''}`}
                                        >
                                            Как это работает?
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="/about-company"
                                           className={`footer_ul_link ${props.activePage === 'about_company' ? 'active_link' : ''}`}
                                        >
                                            О Компании
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="/contacts"
                                           className={`footer_ul_link ${props.activePage === 'contacts' ? 'active_link' : ''}`}>
                                            Контакты
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <nav className="mobile_footer_nav">
                            <ul className="mobile_footer_ul_list1">
                                <li className="footer_ul_li">
                                    <a href="/projects"
                                       className={`footer_ul_link ${props.activePage === 'job_page' ? 'active_link' : ''}`}>
                                        Работа
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="/freelancers"
                                       className={`footer_ul_link ${props.activePage === 'freelancers_page' ? 'active_link' : ''}`}>
                                        Фрилансеры
                                    </a>

                                </li>
                            </ul>
                            <ul className="mobile_footer_ul_list2">
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link">
                                        Создать задание
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="/my-projects/client" className={`footer_ul_link ${props.activePage === 'my_projects_for_client_page' ? 'active_link' : ''}`}>
                                        Мои Проекты
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="/chat"
                                       className={`footer_ul_link ${props.activePage === 'chat' ? 'active_link' : ''}`}>
                                        Чат
                                    </a>
                                </li>

                            </ul>
                            <ul className="mobile_footer_ul_list3">
                                <li className="footer_ul_li">
                                    <a href="/how-it-works"
                                       className={`footer_ul_link ${props.activePage === 'how_it_works_page' ? 'active_link' : ''}`}
                                    >
                                        Как это работает?
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="/about-company"
                                       className={`footer_ul_link ${props.activePage === 'about_company' ? 'active_link' : ''}`}
                                    >
                                        О Компании
                                    </a>
                                </li>

                            </ul>
                            <ul className="mobile_footer_ul_list4">
                                <li className="footer_ul_li">
                                    <a href="/contacts"
                                       className={`footer_ul_link ${props.activePage === 'contacts' ? 'active_link' : ''}`}>
                                        Контакты
                                    </a>
                                </li>

                            </ul>
                        </nav>
                        <div className='footer_app_google_links_wrapper'>
                            <a href="/download-application" className='footer_app_link'>
                                <Image
                                    src="/app_store_img.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </a>
                            <a href="/download-application" className='footer_google_link'>
                                <Image
                                    src="/google_market_img.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </a>
                        </div>
                    </div>
                    <div className="footer_second_child">
                        <p className="footer_second_child_title">
                            © 2024 Do You Do
                        </p>
                        <div className='footer_terms_of_use_privacy_policy_links_wrapper'>
                            <a href="" className='footer_terms_of_use_link'>
                                Пользовательское соглашение
                            </a>
                            <a href="" className='footer_privacy_policy_link'>
                                Политика конфиденциальности
                            </a>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}
