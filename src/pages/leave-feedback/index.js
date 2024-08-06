import React, { useEffect, useState } from 'react';
import '../../assets/css/leave_feedback.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from 'next/head';
import StarRatingComponent from 'react-star-rating-component';
import  FeedBackSuccess from "@/components/feedbackSuccessModal";

export default function LeaveFeedback () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [rating, setRating] = useState(3.5);
    const [showFeedbackSuccessModal, setShowFeedbackSuccessModal] = useState(false);

    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    };

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

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Оставить отзыв</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                </Head>
                <div className="home_general_wrapper" id="leave_feedback">
                    <Header/>
                    <div className="leave_feedback_main_wrapper">
                        <h1 className='leave_feedback_title'>Оставить отзыв</h1>
                        <div className="leave_feedback_textarea_title_main_wrapper">
                            <p className='leave_feedback_textarea_title'>Оценка</p>
                            <div className='leave_feedback_rating_info_stars_wrapper'>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={rating}
                                    onStarClick={onStarClick}
                                    renderStarIcon={(index, value) => {
                                        return (
                                            <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={28}
                                                height={27}
                                                fill={index <= value ? "#FFC107" : "#D9D9D9"}
                                            >
                                                <path
                                                    d="M27.536 11.082 21.5 17.265l1.42 8.751c.125.698-.633 1.21-1.24.879l-7.421-4.111V0c.315 0 .63.146.766.45l3.728 7.94 8.3 1.262c.694.124.95.94.484 1.43ZM14.258 0v22.784l-7.422 4.11c-.595.335-1.365-.172-1.238-.878l1.419-8.75L.98 11.081a.853.853 0 0 1 .484-1.43l8.3-1.262L13.494.45c.135-.304.45-.45.765-.45Z"
                                                />
                                            </svg>
                                        </span>
                                        );
                                    }}
                                />
                                <p className='leave_feedback_rating_info'>3.5/5</p>
                            </div>

                        </div>
                        <div className="radioGroup">
                            <label className="radioLabel">
                                <input type="radio" name="choice" value="positive" />
                                <span className="radioCustom"></span>
                                Положительный
                            </label>
                            <label className="radioLabel">
                                <input type="radio" name="choice" value="negative" />
                                <span className="radioCustom"></span>
                                Отрицательный
                            </label>
                        </div>
                        <div className="leave_feedback_textarea_title_main_wrapper">
                            <p className='leave_feedback_textarea_title'>Отзыв</p>
                            <textarea placeholder='Текст' className='leave_feedback_textarea_field'></textarea>
                        </div>
                        <button
                            className='leave_feedback_page_btn'
                            onClick={() => {
                                setShowFeedbackSuccessModal(true)
                            }}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
                <Footer activePage='leave_feedback'/>

                <FeedBackSuccess
                    isActive={showFeedbackSuccessModal}
                    onClose={() => {
                        setShowFeedbackSuccessModal(false)
                    }}
                />

            </main>
        </>
    );
}
