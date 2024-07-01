import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../assets/css/footer.css';

export default function Footer() {
    const [windowHeight, setWindowHeight] = useState(0);


    return (
        <>
            <footer className="footer">
                <div className="footer_wrapper">
                    <div className='footer_first_child'>
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
                            <ul className="footer_ul_list">
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link active_link">
                                        Работа
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link">
                                        Фрилансеры
                                    </a>

                                </li>
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link">
                                        Создать задание
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link">
                                        Мои Проекты
                                    </a>
                                </li>
                                <li className="footer_ul_li">
                                    <a href="" className="footer_ul_link">
                                        Чат
                                    </a>
                                </li>

                            </ul>
                        </nav>
                        <nav className="mobile_footer_nav">
                            <ul className="footer_ul_list">
                                <div className='mobile_footer_nav_child1'>
                                    <li className="footer_ul_li">
                                        <a href="" className="footer_ul_link active_link">
                                            Работа
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="" className="footer_ul_link">
                                            Фрилансеры
                                        </a>

                                    </li>
                                </div>
                                <div className='mobile_footer_nav_child2'>
                                    <li className="footer_ul_li">
                                        <a href="" className="footer_ul_link">
                                            Создать задание
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="" className="footer_ul_link">
                                            Мои Проекты
                                        </a>
                                    </li>
                                    <li className="footer_ul_li">
                                        <a href="" className="footer_ul_link">
                                            Чат
                                        </a>
                                    </li>
                                </div>



                            </ul>
                        </nav>
                        <div className='footer_app_google_links_wrapper'>
                            <a href="" className='footer_app_link'>
                                <Image
                                    src="/app_store_img.png"
                                    alt="Example Image"
                                    layout="fill" // Fill the parent element
                                    objectFit="cover" // Cover the area of the parent element
                                    quality={100} // Image quality
                                />
                            </a>
                            <a href="" className='footer_google_link'>
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
