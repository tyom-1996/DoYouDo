import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/chat.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {useRouter} from "next/router";

;


export default function Chat () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const [chatList, setChatList] = useState([
        {
            id: 1,
            chat_person_img: '/texpadderjka_img.png',
            chat_person_name: 'Техническая поддержка',
            chat_date: 'Сегодня, 17:40'
        },
        {
            id: 1,
            chat_person_img: '/chat_person_img.png',
            chat_person_name: 'Daniela Gallego',
            chat_topic_name: 'Создание сайта DoYouDo',
            chat_date: 'Сегодня, 17:40'
        },
        {
            id: 2,
            chat_person_img: '/chat_person_img.png',
            chat_person_name: 'Daniela Gallego',
            chat_topic_name: 'Создание сайта DoYouDo',
            chat_date: 'Сегодня, 17:40'
        },
        {
            id: 3,
            chat_person_img: '/chat_person_img.png',
            chat_person_name: 'Daniela Gallego',
            chat_topic_name: 'Создание сайта DoYouDo',
            chat_date: 'Сегодня, 17:40'
        },
        {
            id: 4,
            chat_person_img: '/chat_person_img.png',
            chat_person_name: 'Daniela Gallego',
            chat_topic_name: 'Создание сайта DoYouDo',
            chat_date: 'Сегодня, 17:40'
        },
        {
            id: 5,
            chat_person_img: '/chat_person_img.png',
            chat_person_name: 'Daniela Gallego',
            chat_topic_name: 'Создание сайта DoYouDo',
            chat_date: 'Сегодня, 17:40'
        },

    ]);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const router = useRouter();
    const redirectToChatSinglePage = (id) => {
        router.push(`/chat/${id}`);
    };


    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>О Компании</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="chat">
                    <Header activePage='chat'/>
                    <div className="chat_wrapper">
                        <h1 className="chat_title">Чаты</h1>
                        <div className="chat_items_wrapper">
                            {chatList.map((item, index) => {
                                return (
                                    <button
                                        className='chat_item' key={index}
                                        onClick={() => {
                                            redirectToChatSinglePage(item?.id)
                                        }}
                                    >
                                        <div className="chat_item_person_img_name_info_wrapper">
                                            <div className="chat_item_person_img">
                                                <Image
                                                    src={item.chat_person_img}
                                                    alt="Example Image"
                                                    layout="fill" // Fill the parent element
                                                    objectFit="cover" // Cover the area of the parent element
                                                    quality={100} // Image quality
                                                />
                                            </div>
                                            <div className="chat_item_person_info_wrapper">
                                                <p className="chat_item_person_name">{item.chat_person_name}</p>
                                                <p className="chat_item_topic_name">{item.chat_topic_name}</p>
                                            </div>
                                        </div>
                                        <p className="chat_item_date_info">{item.chat_date}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Footer activePage='chat'/>

            </main>
        </>
    );
}
