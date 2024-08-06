import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/chat_single_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import {useRouter} from "next/router";
import SelectFreelancerModal from "@/components/selectFreelancerModal";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}

export default function  Chat  ({id})  {
    const [messages, setMessages] = useState([
        {
            date: 'Вчера',
            messages: [
              {
                  id: 1,
                  text: 'Но постоянный количественный рост и сфера нашей активности предполагает независимые.',
                  sender: 'Daniela',
                  time: '12:33',
                  avatar: '/chat_user_img.png',
                  isSender: true
              },
          ]
        },
        {
            date: 'Сегодня',
            messages: [
              {
                  id: 1,
                  text: 'Равным образом, постоянный.',
                  sender: 'Alexey',
                  time: '12:33',
                  avatar: '/chat_user_img2.png',
                  isSender: false
              },
              {
                  id: 2,
                  text: 'В своём стремлении повысить.',
                  sender: 'Daniela',
                  time: '12:33',
                  avatar: '/chat_user_img.png',
                  isSender: true
              },
              {
                  id: 3,
                  text: 'С учётом сложившейся международной обстановки, убеждённость некоторых оппонентов однозначно.',
                  sender: 'Alexey',
                  time: '12:33',
                  avatar: '/chat_user_img2.png',
                  isSender: false
              },
              {
                  id: 4,
                  text: 'Здравствуйте',
                  sender: 'Daniela',
                  time: '12:33',
                  avatar: '/chat_user_img.png',
                  isSender: true
              }
          ]
        },


    ]);
    const [showForClient, setShowForClient] = useState(true);
    const [chatMessage, setChatMessage] = useState('');
    const [showSelectFreelancerModal, setShowSelectFreelancerModal] = useState(false);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const handleChatMessage = (e) => {
         setChatMessage(e.target.value);
    }

    const router = useRouter();

    const openSelectFreelancerModal = () => {
        router.push('/select-freelancer');
    };
    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Работа</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className='home_general_wrapper' id='chat_single_page'>
                    <Header activePage={"chat"}/>
                    <div className='chat_single_page_box'>
                        <div className='chat_main_wrapper'>
                            <div className="chat_header">
                                <div className="chat_header_user_img_info_wrapper">
                                    <div className="chat_header_user_img">
                                        <Image
                                            src="/chat_user_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>
                                    <div className="chat_header_user_info_wrapper">
                                        <p className="chat_header_user_name">
                                            Daniela Gallego
                                            <div className='chat_header_user_status'>
                                                <span className='chat_header_user_status_icon'></span>
                                                <span className='chat_header_user_status_text'>Онлайн</span>
                                            </div>
                                        </p>
                                        <p className="chat_header_topic_name">Создание сайта DoYouDo</p>
                                    </div>
                                </div>
                                {showForClient &&
                                    <button
                                        className='chat_header_select_freelancer_button  desktop_chat_header_select_freelancer_button'
                                        onClick={() => {
                                            setShowSelectFreelancerModal(true)
                                            disableBodyScroll()
                                        }}
                                    >
                                        Выбрать исполнителем
                                    </button>
                                }

                            </div>
                            <div className='chat_single_page_items_wrapper'>
                                {messages.map((item, index) => {
                                    return (
                                        <div key={index} className='chat_item_box'>
                                            <p className="chat_item_box_title">{item.date}</p>
                                            {item.messages.map((message, index) => {
                                                return (
                                                    <div className="chat_single_page_item" key={index}>
                                                        <div className="chat_single_page_item_user_img_info_wrapper">
                                                            <div className="chat_single_page_item_user_img">
                                                                <Image
                                                                    src={message.avatar}
                                                                    alt="Example Image"
                                                                    layout="fill" // Fill the parent element
                                                                    objectFit="cover" // Cover the area of the parent element
                                                                    quality={100} // Image quality
                                                                />
                                                            </div>
                                                            <div className="chat_single_page_item_user_info_wrapper">
                                                                <p className="chat_item_user_name">
                                                                    {message.sender}
                                                                </p>
                                                                <p className="chat_item_user_message">
                                                                    {message.text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="chat_single_page_item_date_info">
                                                            {message.time}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='chat_input_buttons_wrapper'>
                                <div className='upload_btn'>
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" // Accept specific file types
                                        style={{ display: 'none' }}
                                        id="chat_file-input"
                                    />
                                    <label htmlFor="chat_file-input" className="file_uploadButton">
                                        <span className='file_upload_title'>
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width={24}
                                                  height={24}
                                                  fill="none"
                                              >
                                                <path
                                                    fill="#969696"
                                                    d="M5.66 10.721a.645.645 0 0 1-.459.184.667.667 0 0 1-.458-.184.62.62 0 0 1-.19-.444.62.62 0 0 1 .19-.444l5.676-5.483c1.28-.95 2.567-1.407 3.85-1.344 1.614.079 2.872.667 3.939 1.633C19.296 5.624 20 7.029 20 8.731c0 1.307-.397 2.457-1.236 3.478l-8.003 7.884c-.809.634-1.709.94-2.673.904-1.223-.049-2.133-.427-2.81-1.066C4.486 19.183 4 18.264 4 17.028c0-.983.355-1.89 1.087-2.741l7.044-6.877c.564-.576 1.117-.918 1.682-1a2.441 2.441 0 0 1 1.123.093c.361.119.686.32.947.586.501.506.716 1.138.64 1.857-.052.49-.261.943-.647 1.376L9.4 16.665a.643.643 0 0 1-.457.186.668.668 0 0 1-.46-.181.62.62 0 0 1-.192-.443.62.62 0 0 1 .187-.445l6.444-6.311c.189-.211.287-.425.31-.652.039-.36-.052-.625-.286-.862a1.059 1.059 0 0 0-.43-.266 1.098 1.098 0 0 0-.511-.04c-.229.034-.549.232-.943.634L6.047 15.13c-.505.59-.75 1.215-.75 1.898 0 .859.325 1.473.887 2.003.447.423 1.054.675 1.957.711a2.644 2.644 0 0 0 1.749-.577l7.903-7.785c.607-.745.91-1.62.91-2.649 0-1.334-.543-2.415-1.382-3.175-.856-.776-1.835-1.233-3.118-1.296-.948-.047-1.943.306-2.933 1.031l-5.61 5.43Z"
                                                />
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={handleChatMessage}
                                    placeholder="Введите сообщение"
                                    className='chat_input_field'
                                />

                                <button className='chat_message_send_btn'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        fill="none"
                                    >
                                        <path
                                            fill="#FF6C00"
                                            d="M4.4 19.425a.99.99 0 0 1-.95-.088c-.3-.192-.45-.47-.45-.837v-3.725c0-.233.067-.442.2-.625a.883.883 0 0 1 .55-.35L11 12l-7.25-1.8a.883.883 0 0 1-.55-.35 1.036 1.036 0 0 1-.2-.625V5.5c0-.367.15-.646.45-.838a.987.987 0 0 1 .95-.087l15.4 6.5c.417.183.625.492.625.925 0 .433-.208.742-.625.925l-15.4 6.5Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </div>
                        {showForClient &&
                            <button
                                className='chat_header_select_freelancer_button  mobile_chat_header_select_freelancer_button'
                                onClick={() => {
                                    setShowSelectFreelancerModal(true)
                                    disableBodyScroll()
                                }}
                            >
                                Выбрать исполнителем
                            </button>
                        }
                    </div>
                    <Footer activePage={"chat"}/>
                </div>


                <SelectFreelancerModal
                    isActive={showSelectFreelancerModal}
                    onClose={() => {
                        setShowSelectFreelancerModal(false);
                    }}
                />
            </main>
        </>
    );
};

