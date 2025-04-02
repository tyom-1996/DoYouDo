import React, { useEffect, useState } from 'react';
import '../../../../../assets/css/order_for_client.css';
import Header from '../../../../../components/header';
import Footer from '../../../../../components/footer';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import {DropDownIcon2} from "@/components/icons/DropDownIcon2";
import {useRouter} from "next/router";
import {useGetSelectedFreelancers} from "@/hooks/useGetSelectedFreelancers";
import Image from "next/image";
import {useCheckReviews} from "@/hooks/useCheckReviews";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import StarRatingComponent from "react-star-rating-component";
import FeedBackSuccess from "@/components/feedbackSuccessModal";
import {useCreateReviews} from "@/hooks/useCreateReviews";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";
import {useChangeStatusOfOrder} from "@/hooks/useChangeStatusOfOrder";

export async function getServerSideProps({ params }) {
    const { id } = params;
    return {
        props: { id },
    };
}

export default function OrderForClient({ id }) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showForEditing, setShowForEditing] = useState(false);
    const [showForResponses, setShowForResponses] = useState(false);
    const [showForFeaturedFreelancers, setShowForFeaturedFreelancers] = useState(false);
    const [showForSelectedUser, setShowForSelectedUser] = useState(true);
    const [showHiddenDropDownMenu, setShowHiddenDropDownMenu] = useState(false);
    const [selectedTab, setSelectedTab] = useState('selectedUser');
    const [showCheckReviewsState, setShowCheckReviewsState] = useState(false);
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const { getSelectedFreelancers, loadingSelectedFreelancers, selectedFreelancersData } = useGetSelectedFreelancers();
    const { checkReviews, checkReviewsData} = useCheckReviews();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const { createReview, createReviewData } = useCreateReviews();
    const { changeStatusOfOrderData, changeStatusOfOrder } = useChangeStatusOfOrder();
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [showFeedbackSuccessModal, setShowFeedbackSuccessModal] = useState(false);
    const [reviewType, setReviewType] = useState('positive');

    const router = useRouter();

    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    };

    useEffect(() => {
        if (createReviewData) {
            if (createReviewData?.message == 'Отзыв успешно добавлен') {
                    getSelectedFreelancers(id)
            }
        }
    }, []);


    useEffect(() => {
        if (id) {
            getSelectedFreelancers(id);
        }
    }, [id]);
    useEffect(() => {
        if (changeStatusOfOrderData) {
              if(changeStatusOfOrderData?.message == 'Статус заказа успешно изменён') {
                  getSelectedFreelancers(id)
              }
        }
    }, [changeStatusOfOrderData]);

    useEffect(() => {
        if (createReviewData) {
            if (createReviewData?.message == 'Отзыв успешно добавлен') {
                setReviewType('');
                setRating(1);
                setReviewText('');
                setShowReviewPopup(false);
                setShowFeedbackSuccessModal(true)
            }
        }

    }, [createReviewData])

    useEffect(() => {
        if (id) {
            checkReviews(id);
        }
    }, [id]);

    useEffect(() => {
        if (checkReviewsData) {
            if (checkReviewsData?.message == 'Отзыв найден') {
                setShowCheckReviewsState(true)
            }
        }
    }, [checkReviewsData]);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);

        switch (tab) {
            case 'editing':
                redirectToEditPage();
                break;
            case 'responses':
                redirectToResponsesPage();
                break;
            case 'featuredFreelancers':
                redirectToFeaturedFreelancersPage();
                break;
            case 'selectedUser':
            default:
                router.push(`/my-projects/client/${id}/selected-users`);
                break;
        }
        setShowHiddenDropDownMenu(false);
    };

    const redirectToResponsesPage = () => {
        router.push(`/my-projects/client/${id}/responses`);
    };

    const redirectToFeaturedFreelancersPage = () => {
        router.push(`/my-projects/client/${id}/featured-freelancers`);
    };

    const redirectToEditPage = () => {
        router.push(`/my-projects/client/${id}/edit`);
    };
    const formattedNumber = (number) => {
        return number.toString().replace(/\.00$/, '');
    };

    // Helper function to get the correct declension of "день"
    const getDayDeclension = (days) => {
        const lastTwoDigits = days % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'дней';
        const lastDigit = days % 10;
        if (lastDigit === 1) return 'день';
        if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
        return 'дней';
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    const makeReview = async () => {
        let clientId = selectedFreelancersData?.freelancer?.id;
        await createReview(clientId, id, rating, reviewType, reviewText)
    }
    const changeStatusOfOrderFunction = async () => {
        await changeStatusOfOrder(id, 'closed')
    }





    return (

        <>
            <main className="general_page_wrapper">
                <Head>
                    <title>Мои проекты</title>
                    <meta name="description" content="Order details page" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                </Head>
                <div className="home_general_wrapper my_projects_for_client_page">
                    <Header activePage='my_projects_for_client_page' />
                    <div className="create_order_page_wrapper">
                        <h1 className="create_order_page_title">Страница заказа</h1>
                        <div className="my_project_single_page_tabs_wrapper">
                            <button className={`my_project_single_page_tab ${showForEditing ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('editing')}>Редактирование</button>
                            <button className={`my_project_single_page_tab ${showForResponses ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('responses')}>Отклики</button>
                            <button className={`my_project_single_page_tab ${showForFeaturedFreelancers ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('featuredFreelancers')}>Избранные фрилансеры</button>
                            <button className={`my_project_single_page_tab ${showForSelectedUser ? 'active_tab' : ''}`}
                                    onClick={() => handleTabClick('selectedUser')}>Выбранный исполнитель</button>
                        </div>
                        <div className="dropdownWrapper">
                            <div className="dropdownHeader2" onClick={() => setShowHiddenDropDownMenu(!showHiddenDropDownMenu)}>
                                <p className="dropdownHeader_title">
                                    {selectedTab === 'editing' && 'Редактирование'}
                                    {selectedTab === 'responses' && 'Отклики'}
                                    {selectedTab === 'featuredFreelancers' && 'Избранные фрилансеры'}
                                    {selectedTab === 'selectedUser' && 'Выбранный исполнитель'}
                                </p>
                                <button className="dropdownHeader_icon" style={{ transform: showHiddenDropDownMenu ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    <DropDownIcon2 />
                                </button>
                            </div>
                            {showHiddenDropDownMenu && (
                                <div className="tabsWrapper">
                                    <button className="mobile_tab" onClick={() => handleTabClick('editing')}>Редактирование</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('responses')}>Отклики</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('featuredFreelancers')}>Избранные фрилансеры</button>
                                    <button className="mobile_tab" onClick={() => handleTabClick('selectedUser')}>Выбранный исполнитель</button>
                                </div>
                            )}
                        </div>

                        <div className="order_single_page_items_wrapper">
                            {selectedFreelancersData?.freelancer  ? (
                                <div style={{width: '100%'}}>
                                    {selectedFreelancersData?.freelancer && (
                                        <div className="order_single_page_item">
                                            <div className="order_single_page_item_img_info_wrapper">
                                                <div className="order_single_page_item_img">
                                                    <Image
                                                        src={selectedFreelancersData?.freelancer?.photo ? `${imagePath}${selectedFreelancersData?.freelancer?.photo}` : '/upload_img1.png'}
                                                        alt="Example Image"
                                                        layout="fill" // Fill the parent element
                                                        objectFit="cover" // Cover the area of the parent element
                                                        quality={100} // Image quality
                                                    />
                                                </div>
                                                <div className="order_single_page_item_info_box">
                                                    <p className="order_single_page_item_user_name">
                                                        {selectedFreelancersData?.freelancer?.first_name} {selectedFreelancersData?.freelancer?.last_name}
                                                    </p>
                                                    <div className='order_single_page_item_price_deadline_info'>
                                                        <p className="order_single_page_item_price">
                                                            {formattedNumber(selectedFreelancersData?.response?.price)} руб.
                                                        </p>
                                                        <p className="order_single_page_item_deadline_info">
                                                            Сделаю {selectedFreelancersData?.response?.days_to_complete} {getDayDeclension(selectedFreelancersData?.response?.days_to_complete)}
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <p className="order_single_page_item_review">
                                                {selectedFreelancersData?.response?.response_text}
                                            </p>


                                            <div className='buttons_wrapper'>
                                                <div className="order_single_page_item_buttons_wrapper2">
                                                    {selectedFreelancersData?.order?.status == 'waiting_freelancer_response' ? (
                                                        <button
                                                            className="order_single_page_item_waiting_for_a_response_btn">Ожидание
                                                            ответа от исполнителя</button>
                                                    ) : (
                                                        <button className="order_single_page_item_chat_btn">В Чат</button>
                                                    )}
                                                </div>

                                                {selectedFreelancersData?.order?.status == 'closed' && showCheckReviewsState !== true &&
                                                    <button
                                                        className='leave_feedback_btn2'
                                                        onClick={() => {
                                                            setShowReviewPopup(true)
                                                            disableBodyScroll()
                                                        }}
                                                    >
                                                        Оставить отзыв
                                                    </button>
                                                }
                                                {selectedFreelancersData?.order?.status != 'closed' &&
                                                    <button
                                                        className='leave_feedback_btn2'
                                                        onClick={async () => {
                                                          await  changeStatusOfOrderFunction()
                                                        }}
                                                    >
                                                        Закрыть проект
                                                    </button>
                                                }
                                            </div>


                                        </div>
                                    )}
                                </div>
                                )
                                : (

                                    <p className='not_found_text'>Для этого заказа фрилансер не выбран.</p>
                                )

                            }

                        </div>
                    </div>
                </div>
                <Footer activePage='my_projects_for_client_page' />

                {showReviewPopup &&
                    <div className="leave_feedback_popup">
                        <div className="leave_feedback_main_wrapper">
                            <button
                                className='leave_feedback_popup_close_icon'
                                onClick={() => {
                                    setShowReviewPopup(false)
                                    enableBodyScroll()
                                }}
                            >
                                <FilterCloseIcon/>
                            </button>
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
                                    <input
                                        type="radio"
                                        name="choice"
                                        value="positive"
                                        checked={reviewType === 'positive'}
                                        onChange={(e) => setReviewType(e.target.value)}
                                    />
                                    <span className="radioCustom"></span>
                                    Положительный
                                </label>
                                <label className="radioLabel">
                                    <input
                                        type="radio"
                                        name="choice"
                                        value="negative"
                                        checked={reviewType === 'negative'}
                                        onChange={(e) => setReviewType(e.target.value)}
                                    />
                                    <span className="radioCustom"></span>
                                    Отрицательный
                                </label>
                            </div>
                            <div className="leave_feedback_textarea_title_main_wrapper">
                                <p className='leave_feedback_textarea_title'>Отзыв</p>
                                <textarea
                                    placeholder='Текст'
                                    className='leave_feedback_textarea_field'
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                className='leave_feedback_page_btn'
                                onClick={() => {
                                    makeReview()
                                }}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>

                }

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
