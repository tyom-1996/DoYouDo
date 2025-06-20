import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/chat.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from 'next/head';
import {useRouter} from "next/router";
import {useGetChats} from "@/hooks/useGetChats";
import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Chat () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const { getChats, chatsData, totalPages } = useGetChats();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);


    useEffect(() => {
        getChats()
    }, [])





    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const router = useRouter();
    const redirectToChatSinglePage = (id) => {
        router.push(`/chat/${id}`);
    };

   function formatChatDate(dateString) {
       if (!dateString) return '';
        const date = parseISO(dateString);

        if (isToday(date)) {
            return `Сегодня, ${format(date, 'HH:mm')}`;
        }

        if (isThisWeek(date, { weekStartsOn: 1 })) {
            return `${format(date, 'EEEE, HH:mm', { locale: ru })}`;
        }

        if (isThisMonth(date)) {
            return format(date, 'd MMMM', { locale: ru });
        }

        if (!isThisYear(date)) {
            return format(date, 'd LLL yyyy', { locale: ru });
        }

        return format(date, 'd MMMM', { locale: ru });
    }
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

                            {chatsData && chatsData.length > 0 && chatsData.map((item, index) => {
                                return (
                                    <button
                                        className='chat_item' key={index}
                                        onClick={() => {
                                            redirectToChatSinglePage(item?.chat_id)
                                        }}
                                    >
                                        <div className="chat_item_person_img_name_info_wrapper">
                                            <div className="chat_item_person_img">
                                                <Image
                                                    src={item?.participent?.photo ?  `${imagePath}${item?.participent?.photo}` : '/upload_img1.png'}
                                                    alt="Example Image"
                                                    layout="fill" // Fill the parent element
                                                    objectFit="cover" // Cover the area of the parent element
                                                />
                                            </div>
                                            <div className="chat_item_person_info_wrapper">
                                                <p className="chat_item_person_name">{item?.participant?.first_name} {item?.participant?.last_name}</p>
                                                <p className="chat_item_topic_name">{item?.last_message}</p>
                                            </div>
                                        </div>

                                        <div className='chat_item_unread_count_date_infos_wrapper'>
                                            <p className="chat_item_date_info">{formatChatDate(item?.last_message_time)}</p>
                                            <div className='chat_item_unread_count_info_box'>
                                                <p className='chat_item_unread_count_info'>{item?.unread_count}</p>
                                            </div>
                                        </div>
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
