import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/freelancers_single_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import { useRouter } from 'next/router';
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {LikeIcon} from "@/components/icons/LikeIcon";
import EditIcon from "@/components/icons/editIcon";
import {DislikeIcon} from "@/components/icons/DisLikeIcon";
import SuggestTaskModal from "../../../components/SuggestTaskModal";
import {useGetFreelancerById} from "@/hooks/useGetFreelancerById";
import {useGetUserReviewsById} from "@/hooks/useGetUserReviewsById";
import StarRatingComponent from "react-star-rating-component";

export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}


export default function FreelancerSinglePage ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [reviewsList, setReviewsList] = useState([
        {
            id: 1,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 2,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 3,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },

        {
            id: 4,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 5,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },
        {
            id: 6,
            review_date: '20 апреля 2024',
            client_name: 'Заказчик Evgenia G.',
            project_name: 'Дизайн сайта DoYouDo',
            star_icon: '/star_img3.png',
            review_info: 'Спасибо большое, Анастасия Викторовна быстро откликнулась, назначила время созвона и очень доступно всё объяснила ребёнку. Будем обращаться снова при необходимости! 👏👏👏'
        },

    ]);
    const [showForFreelancer, setShowForFreelancer] = useState(true);
    const [showForClient, setShowForClient] = useState(false);
    const [showSuggestModal, setShowSuggestModal] = useState(false);
    const { getFreelancerById, freelancerByIdData,  loading } = useGetFreelancerById();
    const { getUserReviewsById, userReviewsByIdData } = useGetUserReviewsById();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);

    const router = useRouter();


    useEffect(() => {
        if (id) {
            getFreelancerById(id); // Fetch the order when the component mounts or id changes
        }
    }, [id]);

    useEffect(() => {
        handleUseFilter()
    }, [selectedCategories, selectedCities]);

    useEffect(() => {
            getUserReviewsById(id)
    }, [id])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const handleUseFilter = async () => {
        console.log('use fiter')
    }
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const formatDateToRussian = (dateString) => {
        const timestamp = Date.parse(dateString); // Ensure valid timestamp
        if (isNaN(timestamp)) return "Invalid date"; // Handle invalid cases

        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const redirectFromPortfolioSinglePage = (portfolioId) => {
        router.push(`/portfolio/${portfolioId}`);
    };

    const totalReviews = userReviewsByIdData?.data?.length || 0;
    const averageRatingValue =
        totalReviews > 0
            ? userReviewsByIdData.data.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;
    const averageRating = Number.isInteger(averageRatingValue)
        ? averageRatingValue
        : averageRatingValue.toFixed(1);

    const goodReviews =
        userReviewsByIdData?.data?.filter(
            (review) => review.review_type === 'positive'
        ).length || 0;

    const badReviews =
        userReviewsByIdData?.data?.filter(
            (review) => review.review_type === 'negative'
        ).length || 0;


    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Фрилансеры</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                </Head>

                <div className="home_general_wrapper" id='freelancer_single_page'>
                    <Header activePage={"freelancers_page"}/>

                    {showForFreelancer &&
                        <div className="freelancer_single_page_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_child"></div>
                                <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                    <div className="freelancer_single_page_user_info_wrapper_item1">
                                        <div className="freelancer_single_page_user_info_wrapper_item1_image">
                                            <Image
                                                src={freelancerByIdData?.user?.photo ? `${imagePath}${freelancerByIdData?.user?.photo}` : '/upload_img1.png'}
                                                alt="Example Image"
                                                layout="fill" // Fill the parent element
                                                objectFit="cover" // Cover the area of the parent element
                                                quality={100} // Image quality
                                            />
                                        </div>
                                        <button
                                            className='suggest_task_btn desktop_suggest_add_to_fav_btn'
                                            onClick={() => {
                                                setShowSuggestModal(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            Предложить задание
                                        </button>
                                        <button className='add_to_favorites_btn desktop_suggest_add_to_fav_btn'>
                                            Добавить в избранные
                                        </button>
                                    </div>
                                    <div className="freelancer_single_page_user_info_wrapper_item2">
                                        <div className="freelancer_single_page_user_info_wrapper_item2_img">
                                            <Image
                                                src="/freelancer_logo_img.png"
                                                alt="Example Image"
                                                layout="fill" // Fill the parent element
                                                objectFit="cover" // Cover the area of the parent element
                                                quality={100} // Image quality
                                            />
                                        </div>
                                        <div className='freelancer_single_page_user_info_wrapper_item2_details'>
                                            <div className='freelancer_single_page_user_name_age_country_info_wrapper'>
                                                <p className='freelancer_single_page_user_name'>{freelancerByIdData?.user?.first_name} {freelancerByIdData?.user?.last_name}</p>
                                                <p className='freelancer_single_page_user_age_country_info'>{freelancerByIdData?.user?.birth_date} {freelancerByIdData?.user?.address} </p>
                                            </div>

                                            {/*<div className="freelancer_single_page_user_rating_icon_info_wrapper">*/}
                                            {/*    <div className="freelancer_single_page_user_rating_icon">*/}
                                            {/*        <Image*/}
                                            {/*            src="/star_img2.png"*/}
                                            {/*            alt="Example Image"*/}
                                            {/*            layout="fill" // Fill the parent element*/}
                                            {/*            objectFit="cover" // Cover the area of the parent element*/}
                                            {/*            quality={100} // Image quality*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*    <p className="freelancer_single_page_user_rating_info">*/}
                                            {/*        5/5*/}
                                            {/*    </p>*/}
                                            {/*</div>*/}

                                            <div className='mobile_buttons_wrapper'>
                                                <button className='suggest_task_btn'>
                                                    Предложить задание
                                                </button>
                                                <button className='add_to_favorites_btn'>
                                                    Добавить в избранные
                                                </button>
                                            </div>
                                            <div className='freelancer_single_page_user_info_professional_information_items_wrapper'>
                                                <div className="freelancer_single_page_user_info_professional_information_item">
                                                    <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                        Опыт:
                                                    </p>
                                                    {freelancerByIdData?.user?.experience &&
                                                        <p className="freelancer_single_page_user_info_professional_information_item_info">{freelancerByIdData?.user?.experience } лет</p>
                                                    }
                                                </div>
                                                <div className="freelancer_single_page_user_info_professional_information_item">
                                                    <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                        Выполнила:
                                                    </p>
                                                    {freelancerByIdData?.orders.length > 0 ? (
                                                        <p className="freelancer_single_page_user_info_professional_information_item_info">
                                                            {freelancerByIdData?.orders ? freelancerByIdData?.orders?.length : null}
                                                        </p>
                                                    )
                                                        :
                                                        (
                                                            <p className="freelancer_single_page_user_info_professional_information_item_info">
                                                                Нет выполненных проектов
                                                            </p>
                                                        )
                                                    }

                                                </div>
                                                <div className="freelancer_single_page_user_info_professional_information_item">
                                                    <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                        На DoYouDo:
                                                    </p>
                                                    <p className="freelancer_single_page_user_info_professional_information_item_info">{formatDateToRussian(freelancerByIdData?.user?.created_at)}</p>
                                                </div>
                                            </div>
                                            <p className='freelancer_single_page_about_user_info'>
                                                {freelancerByIdData?.user?.about_me}
                                            </p>
                                            <div className="freelancer_single_page_user_hobbies_items_wrapper">
                                                {freelancerByIdData?.categories && freelancerByIdData?.categories.map((item, index) => {
                                                    return (
                                                        <div className="freelancer_single_page_user_hobbies_item" key={index}>
                                                            <p className="freelancer_single_page_user_hobbies_item_info">{item?.name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <div className="freelancer_single_page_ratings_reviews_wrapper">
                                    {userReviewsByIdData?.data.length > 0 &&
                                        <div className="freelancer_single_page_ratings_reviews_wrapper_header">
                                            <div className="freelancer_single_page_rating_info_wrapper">
                                                <p className='freelancer_single_page_rating_info_wrapper_title'>
                                                    Средняя оценка
                                                </p>
                                                <p className='freelancer_single_page_rating_info_wrapper_info'>{averageRating}</p>
                                            </div>
                                            <div className='freelancer_single_page_likes_reviews_info_wrapper'>
                                                <div className='freelancer_single_page_likes_info_icon_wrapper'>
                                                    <LikeIcon/>
                                                    <p className='freelancer_single_page_likes_info'>{goodReviews}</p>
                                                </div>
                                                <div className='freelancer_single_page_dislikes_info_icon_wrapper'>
                                                    <DislikeIcon/>
                                                    <p className='freelancer_single_page_dislikes_info'>{badReviews}</p>
                                                </div>
                                                <p className='freelancer_single_page_reviews_info'>{totalReviews} отзыва</p>
                                            </div>
                                        </div>
                                    }

                                    <div className="reviews">
                                        <div className='reviews_items_wrapper'>
                                            {userReviewsByIdData && userReviewsByIdData?.data.map((item, index) => {
                                                return (
                                                    <div className='reviews_item'>
                                                        <div className="reviews_item_header">
                                                            <div className="reviews_item_header_item">
                                                                <p className="reviews_item_header_date_info">{formatDateToRussian(item?.created_at)}</p>
                                                                <p className="reviews_item_header_project_name mobile_reviews_item_header_item">{item.project_name}</p>
                                                                <p className="reviews_item_header_client_name_info">{item?.reviewer_first_name} {item?.reviewer_last_name}</p>
                                                                {/*<div className='reviews_item_img'>*/}
                                                                <StarRatingComponent
                                                                    name="rate1"
                                                                    starCount={5}
                                                                    value={item?.rating}
                                                                    editing={false}
                                                                    renderStarIcon={(index, value) => (
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
                                                                    )}
                                                                />

                                                                {/*</div>*/}
                                                            </div>
                                                            <div className="reviews_item_header_item desktop_reviews_item_header_item">
                                                                <p className="reviews_item_header_project_name">{item.project_name}</p>
                                                            </div>
                                                        </div>
                                                        <p className='reviews_info'>
                                                            {item?.text}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/*<div className="pagination_links_wrapper">*/}
                                        {/*    <button className="pagination_link_btn">*/}
                                        {/*        <PaginationLeftIcon/>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link">*/}
                                        {/*        <p className="pagination_link_title">1</p>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link active">*/}
                                        {/*        <p className="pagination_link_title">2</p>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link">*/}
                                        {/*        <p className="pagination_link_title">3</p>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link">*/}
                                        {/*        <p className="pagination_link_title">4</p>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link">*/}
                                        {/*        <p className="pagination_link_title">....</p>*/}
                                        {/*    </button>*/}
                                        {/*    <button className="pagination_link_btn">*/}
                                        {/*        <PaginationRightIcon/>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>


                            <div className='freelancer_single_page_portfolio_wrapper'>
                                {freelancerByIdData?.portfolios.length > 0 &&
                                    <div className="freelancer_single_page_portfolio_wrapper_header">
                                        <h1 className='freelancer_single_page_portfolio_wrapper_header_title'>Портфолио</h1>
                                        <p className="freelancer_single_page_portfolio_wrapper_header_info">13 Проектов</p>
                                    </div>
                                }
                                <div className="portfolio">
                                    <div className='portfolio_items_wrapper'>
                                        {freelancerByIdData?.portfolios && freelancerByIdData?.portfolios.map((item, index) => {
                                            let imageArray = [];

                                            try {
                                                if (item?.image_url && typeof item.image_url === 'string' && item.image_url !== "null") {
                                                    imageArray = JSON.parse(item.image_url);
                                                }
                                            } catch (error) {
                                                console.error("Error parsing image_url:", error);
                                            }

                                            // Get the first image or fallback
                                            let firstImage = imageArray.length > 0 && imageArray[0]
                                                ? imageArray[0]
                                                : '/upload_img1.png'; // Fallback image if null or empty

                                            console.log("Final Image URL:", firstImage); // Debugging output

                                            return (
                                                <div
                                                    className='portfolio_item'
                                                    key={index}
                                                    onClick={() => redirectFromPortfolioSinglePage(item?.id)}
                                                >
                                                    <div className="portfolio_item_img">
                                                        <Image
                                                            src={firstImage}
                                                            alt="Portfolio Image"
                                                            layout="fill"
                                                            objectFit="cover"
                                                            quality={100}
                                                        />
                                                    </div>
                                                    <div className='portfolio_item_info_box'>
                                                        <p className='portfolio_item_title'>{item?.project_name}</p>
                                                        <div className="portfolio_item_line"></div>
                                                        <p className='portfolio_item_info2'>{item?.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/*<div className="pagination_links_wrapper">*/}
                                    {/*    <button className="pagination_link_btn">*/}
                                    {/*        <PaginationLeftIcon/>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link">*/}
                                    {/*        <p className="pagination_link_title">1</p>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link active">*/}
                                    {/*        <p className="pagination_link_title">2</p>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link">*/}
                                    {/*        <p className="pagination_link_title">3</p>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link">*/}
                                    {/*        <p className="pagination_link_title">4</p>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link">*/}
                                    {/*        <p className="pagination_link_title">....</p>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="pagination_link_btn">*/}
                                    {/*        <PaginationRightIcon/>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>


                        </div>
                    }

                    {showForClient &&
                        <div className="freelancer_single_page_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_child"></div>
                                <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                    <div className="freelancer_single_page_user_info_wrapper_item1">
                                        <div className="freelancer_single_page_user_info_wrapper_item1_image">
                                            <Image
                                                src="/freelancer_single_page_img2.png"
                                                alt="Example Image"
                                                layout="fill" // Fill the parent element
                                                objectFit="cover" // Cover the area of the parent element
                                                quality={100} // Image quality
                                            />
                                        </div>

                                    </div>
                                    <div className="freelancer_single_page_user_info_wrapper_item2">
                                        <div className="freelancer_single_page_user_info_wrapper_item2_img">
                                            <Image
                                                src="/freelancer_logo_img.png"
                                                alt="Example Image"
                                                layout="fill" // Fill the parent element
                                                objectFit="cover" // Cover the area of the parent element
                                                quality={100} // Image quality
                                            />
                                        </div>
                                        <div className='freelancer_single_page_user_info_wrapper_item2_details'>
                                            <div className='freelancer_single_page_user_name_age_country_info_wrapper'>
                                                <p className='freelancer_single_page_user_name'>Алексей Смирнов</p>
                                                <p className='freelancer_single_page_user_age_country_info'>24 года, Москва</p>
                                            </div>
                                            <div className="freelancer_single_page_user_rating_icon_info_wrapper">
                                                <div className="freelancer_single_page_user_rating_icon">
                                                    <Image
                                                        src="/star_img2.png"
                                                        alt="Example Image"
                                                        layout="fill" // Fill the parent element
                                                        objectFit="cover" // Cover the area of the parent element
                                                        quality={100} // Image quality
                                                    />
                                                </div>
                                                <p className="freelancer_single_page_user_rating_info">
                                                    5/5
                                                </p>
                                            </div>

                                            <div className='freelancer_single_page_user_info_professional_information_items_wrapper'>
                                                <div className="freelancer_single_page_user_info_professional_information_item">
                                                    <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                        Cоздал:
                                                    </p>
                                                    <p className="freelancer_single_page_user_info_professional_information_item_info">2 задания</p>
                                                </div>
                                                <div className="freelancer_single_page_user_info_professional_information_item">
                                                    <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                        На DoYouDo:
                                                    </p>
                                                    <p className="freelancer_single_page_user_info_professional_information_item_info"> с 6 сентября 2019</p>
                                                </div>

                                            </div>
                                            <p className='freelancer_single_page_about_user_info'>
                                                А также интерактивные прототипы набирают популярность среди определенных слоев населения, а значит, должны быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. А ещё базовые сценарии поведения пользователей могут быть разоблачены. Банальные, но неопровержимые выводы, а
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="freelancer_single_page_ratings_reviews_wrapper">
                                <div className="freelancer_single_page_ratings_reviews_wrapper_header">
                                    <div className="freelancer_single_page_rating_info_wrapper">
                                        <p className='freelancer_single_page_rating_info_wrapper_title'>
                                            Средняя оценка
                                        </p>
                                        <p className='freelancer_single_page_rating_info_wrapper_info'>4.9</p>
                                    </div>
                                    <div className='freelancer_single_page_likes_reviews_info_wrapper'>
                                        <div className='freelancer_single_page_likes_info_icon_wrapper'>
                                            <LikeIcon/>
                                            <p className='freelancer_single_page_likes_info'>43</p>
                                        </div>
                                        <div className='freelancer_single_page_dislikes_info_icon_wrapper'>
                                            <DislikeIcon/>
                                            <p className='freelancer_single_page_dislikes_info'>10</p>
                                        </div>
                                        <p className='freelancer_single_page_reviews_info'>53 отзыва</p>
                                    </div>
                                </div>
                                <div className="reviews">
                                    <div className='reviews_items_wrapper'>
                                        {reviewsList.map((item, index) => {
                                            return (
                                                <div className='reviews_item'>
                                                    <div className="reviews_item_header">
                                                        <div className="reviews_item_header_item">
                                                            <p className="reviews_item_header_date_info">{item.review_date}</p>
                                                            <p className="reviews_item_header_project_name mobile_reviews_item_header_item">{item.project_name}</p>
                                                            <p className="reviews_item_header_client_name_info">{item.client_name}</p>
                                                            <div className='reviews_item_img'>
                                                                <Image
                                                                    src={item.star_icon}
                                                                    alt="Example Image"
                                                                    layout="fill" // Fill the parent element
                                                                    objectFit="cover" // Cover the area of the parent element
                                                                    quality={100} // Image quality
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="reviews_item_header_item desktop_reviews_item_header_item">
                                                            <p className="reviews_item_header_project_name">{item.project_name}</p>
                                                        </div>
                                                    </div>
                                                    <p className='reviews_info'>
                                                        {item.review_info}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="pagination_links_wrapper">
                                        <button className="pagination_link_btn">
                                            <PaginationLeftIcon/>
                                        </button>
                                        <button className="pagination_link">
                                            <p className="pagination_link_title">1</p>
                                        </button>
                                        <button className="pagination_link active">
                                            <p className="pagination_link_title">2</p>
                                        </button>
                                        <button className="pagination_link">
                                            <p className="pagination_link_title">3</p>
                                        </button>
                                        <button className="pagination_link">
                                            <p className="pagination_link_title">4</p>
                                        </button>
                                        <button className="pagination_link">
                                            <p className="pagination_link_title">....</p>
                                        </button>
                                        <button className="pagination_link_btn">
                                            <PaginationRightIcon/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <Footer activePage={"freelancers_page"}/>
                    <SuggestTaskModal
                        isActive={showSuggestModal}
                        onClose={() => {
                            setShowSuggestModal(false)
                        }}
                    />
                </div>

            </main>
        </>
    );
}
