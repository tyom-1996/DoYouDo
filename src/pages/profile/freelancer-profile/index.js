import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/freelancers_profile_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import { useRouter } from 'next/router';
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {LikeIcon} from "@/components/icons/LikeIcon";
import {DislikeIcon} from "@/components/icons/DisLikeIcon";
import {AddProjectIcon} from "@/components/icons/AddProjectIcon";
import {DateIcon} from "@/components/icons/DateIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import withAuth from '../../../components/withAuth';
import { useGetProfileInfo } from '../../../hooks/useGetProfileInfo';
import { useGetCategories } from '../../../hooks/useGetCategories';
import { useSetCategories } from '../../../hooks/useSetCategories';
import { useGetProfilePackages } from '../../../hooks/useGetProfilePackages';
import { useGetProfilePortfolio } from '../../../hooks/useGetProfilePortfolio';
import ReactPaginate from "react-paginate";
import EditIcon from "@/components/icons/editIcon";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import StarRatingComponent from "react-star-rating-component";
import {useGetUserReviewsById} from "@/hooks/useGetUserReviewsById";

const  FreelancerProfilePage  = ()  => {
    const [windowHeight, setWindowHeight] = useState(0);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [isOpenForCategories, setIsOpenForCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isOpenForSubCategories, setIsOpenForSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([
        'Разработка андроид приложения',
        'Дизайн',
        'Компьютерная помощь',
        'Разработка ПО',
        'Красота и здоровье',
    ]);
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getCategories, loadingCategoryInfo, categoriesData } = useGetCategories();
    const { setCategories, loading, categoriesInfoData2 } = useSetCategories();
    const { getProfilePortfolio,  profilePortfolioPData } = useGetProfilePortfolio();
    const { getProfilePackages, loadingProfilePackagesInfo, profilePackagesData } = useGetProfilePackages();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const [userCatsIds, setUserCatsIds] = useState([]); // Array to hold subcategory IDs
    const [page, setPage] = useState(1);
    const { getUserReviewsById, userReviewsByIdData } = useGetUserReviewsById();

    useEffect(() => {
        getUserReviewsById(profileInfoData?.id)
    }, [profileInfoData])

    useEffect(() => {
        let userCatsIds_ = profileInfoData?.categories?.map(category => category.id);
        setUserCatsIds(userCatsIds_);

    }, [profileInfoData])




    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
        getProfilePortfolio(page)
    }, []);

    useEffect(() => {
          if (categoriesInfoData2?.message == "Категории успешно добавлены пользователю") {
                setShowAddCategoryModal(false)
                enableBodyScroll()
                getProfileInfo()
          }
    }, [categoriesInfoData2])

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };
    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category); // Store the whole category object
        setSubCategories(category.subcategories); // Load corresponding subcategories
        setIsOpenForCategories(false);
        setSelectedSubCategory(null); // Reset subcategory when category changes
    };

    const handleSelectSubCategory = (subCategory) => {
        console.log(subCategory, 'subCategory')
        setSelectedSubCategory(subCategory)

        setIsOpenForSubCategories(false); // Close the dropdown
    };

    const router = useRouter();

    const redirectFromPortfolioSinglePage = (id) => {
        router.push(`/portfolio/${id}`);
    };
    const redirectToAddProjectPage = () => {
        router.push(`/add-project`);
    };
    const redirectToFreelancerSettingsPage = () => {
        router.push(`freelancer-profile-settings`);
    }

    const handleSendCategories = async (e) => {
        e.preventDefault();

        let newUserCatsIds = [...userCatsIds,selectedSubCategory.id ]
        console.log(newUserCatsIds, 'newUserCatsIds____')

        await setCategories(newUserCatsIds);

    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // ReactPaginate uses a 0-based index
        setPage(selectedPage);
    };
    const redirectToEditPortfolio = (e, portfolioId) => {
        e.stopPropagation(); // Останавливаем всплытие события
        e.preventDefault();
        router.push(`/edit-portfolio/${portfolioId}`);
    };

    const formatRussianDate = (isoString) => {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            // Return a default string or handle the error as needed
            return "Invalid date";
        }
        const formatted = format(date, 'd MMMM yyyy', { locale: ru });
        return `с ${formatted}`;
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



    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Профиль Исполнителя</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='freelancer_profile'>
                    <Header activePage={"freelancer_profile"}/>
                    <div className="freelancer_single_page_wrapper">
                        <div className="freelancer_single_page_user_info_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper_child"></div>
                            <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_item1">
                                    <div className="freelancer_single_page_user_info_wrapper_item1_image">
                                        <Image
                                            src={profileInfoData?.photo ? `${imagePath}${profileInfoData?.photo}` : '/freelancer_single_page_img.png'}
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />
                                    </div>
                                    <button
                                        className='suggest_task_btn desktop_suggest_add_to_fav_btn'
                                        onClick={() => {
                                           redirectToFreelancerSettingsPage()
                                        }}
                                    >
                                        Настройки
                                    </button>
                                    {/*<button className='add_to_favorites_btn desktop_suggest_add_to_fav_btn'>*/}
                                    {/*    Добавить в избранные*/}
                                    {/*</button>*/}
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
                                            <p className='freelancer_single_page_user_name'>{profileInfoData?.first_name} {profileInfoData?.last_name}</p>
                                            <p className='freelancer_single_page_user_age_country_info'>34 года, {profileInfoData?.user?.address ? profileInfoData?.user?.address : ''}</p>
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
                                        <button
                                            className='suggest_task_btn mobile_suggest_add_to_fav_btn'
                                            onClick={() => {
                                                redirectToFreelancerSettingsPage()
                                            }}
                                        >
                                            Настройки
                                        </button>
                                        <div className='freelancer_single_page_user_info_professional_information_items_wrapper'>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Опыт:
                                                </p>
                                                {profileInfoData?.experience &&
                                                    <p className="freelancer_single_page_user_info_professional_information_item_info">{profileInfoData?.experience} лет</p>
                                                }
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    Выполнила:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">57 заданий</p>
                                            </div>
                                            <div className="freelancer_single_page_user_info_professional_information_item">
                                                <p className="freelancer_single_page_user_info_professional_information_item_title">
                                                    На DoYouDo:
                                                </p>
                                                <p className="freelancer_single_page_user_info_professional_information_item_info">{formatRussianDate(profileInfoData?.created_at)}</p>
                                            </div>
                                        </div>
                                        {profileInfoData?.about_me &&
                                            <p className='freelancer_single_page_about_user_info'>
                                                {profileInfoData?.about_me}
                                            </p>
                                        }

                                        <div className='freelancer_single_page_user_hobbies_main_wrapper'>
                                            <div className="freelancer_single_page_user_hobbies_items_wrapper">
                                                {profileInfoData?.categories.map((category, index) => {
                                                    return (
                                                        <div
                                                            className="freelancer_single_page_user_hobbies_item"
                                                            key={index}
                                                        >
                                                            <p className="freelancer_single_page_user_hobbies_item_info">{category?.name}</p>
                                                        </div>
                                                    )
                                                })}
                                                <button
                                                    className='freelancer_single_page_user_hobbies_add_btn'
                                                    onClick={() => {
                                                        setShowAddCategoryModal(true)
                                                        disableBodyScroll()
                                                    }}
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="freelancer_click_balance_info_wrapper">
                            <div className='freelancer_click_balance_info_header_wrapper'>
                                <p className='freelancer_click_balance_info_header_title'>Баланс кликов</p>
                                <p className='freelancer_click_balance_info_header_balance_quantity'>{profileInfoData?.available_responses}</p>
                            </div>
                            <div className='freelancer_click_balance_items_wrapper'>
                                <div className='freelancer_click_balance_item1'>
                                    <div className="freelancer_click_balance_item1_child">
                                        <p className='freelancer_click_balance_item1_child_title'>Цена клика: 10 рублей</p>
                                        {/*<p className='freelancer_click_balance_item1_child_info'>Действующий школьный учитель. Опыт работы в школе 9 лет. Проведение индивидуальных занятий со школьниками </p>*/}
                                    </div>
                                    <div className="freelancer_click_balance_item1_child">
                                        <button className='freelancer_click_balance_buy_balance_btn'>Купить</button>
                                    </div>
                                </div>
                                <div className='freelancer_click_balance_item2'>
                                    {profilePackagesData && profilePackagesData.map((item, index) => {
                                        return (
                                            <div className="freelancer_click_balance_item2_child" key={index}>
                                                <div className='freelancer_click_balance_item2_child_box'>
                                                    <p className='freelancer_click_balance_item2_child_box_title'>
                                                        {item?.name}
                                                    </p>
                                                    <p className='freelancer_click_balance_item2_child_box_info'>
                                                        {item?.price}
                                                    </p>
                                                </div>
                                                <div className='freelancer_click_balance_item2_child_box'>
                                                    <button className='freelancer_click_balance_item2_child_box_buy_btn'>Купить</button>
                                                </div>
                                            </div>
                                        )
                                    })}
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
                        <div className='freelancer_single_page_portfolio_wrapper'>
                            <div className="freelancer_single_page_portfolio_wrapper_header">
                                <h1 className='freelancer_single_page_portfolio_wrapper_header_title'>Портфолио</h1>
                                <p className="freelancer_single_page_portfolio_wrapper_header_info">13 Проектов</p>
                            </div>
                            <div className="portfolio">
                                <div className='portfolio_items_wrapper'>
                                    {/* First item: Add Project button */}
                                    <button className="portfolio_item" onClick={redirectToAddProjectPage}>
                                        <div className='add_project_icon_title_wrapper'>
                                            <AddProjectIcon/>
                                            <p className='add_project_icon_title'>Добавить проект</p>
                                        </div>
                                    </button>

                                    {/* Mapping remaining portfolio items */}
                                    {profilePortfolioPData?.data.map((item, index) => (
                                        <button
                                            key={item.id || index}
                                            className="portfolio_item"
                                            onClick={() => redirectFromPortfolioSinglePage(item?.id)}
                                        >
                                            <div style={{width: '100%'}}>
                                                <div className="portfolio_item_img">
                                                    <Image
                                                        src={item?.image_url[0] ? item?.image_url[0] :  '/portfolio_img1.png'}
                                                        alt="Example Image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        quality={100}
                                                    />
                                                    <button
                                                        className='portfolio_item_edit_icon'
                                                        onClick={(e) => redirectToEditPortfolio(e,item?.id)}
                                                    >
                                                        <EditIcon/>
                                                    </button>
                                                </div>
                                                <div className='portfolio_item_info_box'>
                                                    <p className='portfolio_item_title'>{item?.project_name}</p>
                                                    {/*<p className='portfolio_item_info1'>{item.portfolio_field_name}</p>*/}
                                                    <div className="portfolio_item_line"></div>
                                                    <p className='portfolio_item_info2'>{item?.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {profilePortfolioPData?.page == 2 &&

                                    <div className="pagination_links_wrapper">
                                        <ReactPaginate
                                            previousLabel={<PaginationLeftIcon/>}
                                            nextLabel={<PaginationRightIcon/>}
                                            breakLabel={'...'}
                                            breakClassName={'pagination_break'}
                                            pageCount={profilePortfolioPData?.page} // Total number of pages from the API
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination_links_wrapper'}
                                            activeClassName={'active'}
                                            previousClassName={'pagination_link_btn'}
                                            nextClassName={'pagination_link_btn'}
                                            pageClassName={'pagination_link'}
                                            pageLinkClassName={'pagination_link_title'}
                                            disabledClassName={'disabled'}
                                        />
                                    </div>

                                }

                            </div>
                        </div>


                    </div>
                    <Footer activePage={"freelancer_profile"}/>

                    {showAddCategoryModal && (
                        <div className="add_category_modal">
                            <div className="add_category_modal_wrapper">
                                <button
                                    className="add_category_modal_close_btn"
                                    onClick={() => {
                                        setShowAddCategoryModal(false);
                                        enableBodyScroll();
                                    }}
                                >
                                    <FilterCloseIcon/>
                                </button>
                                <h1 className="add_category_modal_title">Добавление категории</h1>
                                {/* Category Dropdown */}
                                <div className="add_category_dropdown add_category_dropdown1">
                                    <div className="add_category_create_order_dropdownHeader"
                                         onClick={() => setIsOpenForCategories(!isOpenForCategories)}>
                                    <p className='add_category_create_order_dropdownHeader_title'>{selectedCategory?.name || 'Категория'}</p>
                                        <span className="arrow">
                                            {isOpenForCategories ?
                                                <div style={{ transform: "rotate(-180deg)" }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="#333"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                        />
                                                    </svg>
                                                </div>
                                                :

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                >
                                                    <path
                                                        stroke="#333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                    />
                                                </svg>

                                            }
                                        </span>
                                    </div>
                                    {isOpenForCategories && (
                                        <div className="add_category_dropdownList add_category_dropdownList1">
                                            {categoriesData && categoriesData?.map((category, index) => (
                                                <p
                                                    key={category?.id}
                                                    className="add_category_dropdownItem"
                                                    onClick={() => handleSelectCategory(category)}
                                                >
                                                    {category?.name}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Subcategory Dropdown */}
                                <div className="add_category_dropdown add_category_dropdown2">
                                    <div className="add_category_create_order_dropdownHeader" onClick={() => setIsOpenForSubCategories(!isOpenForSubCategories)}>
                                        <p className='add_category_create_order_dropdownHeader_title'>{selectedSubCategory?.name || 'Подкатегория'}</p>
                                        <span className="arrow">
                                            {isOpenForSubCategories ?
                                                <div style={{ transform: "rotate(-180deg)" }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="#333"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                        />
                                                    </svg>
                                                </div>
                                                :

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                >
                                                    <path
                                                        stroke="#333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="m18 9-6 6-1.5-1.5M6 9l2 2"
                                                    />
                                                </svg>

                                            }
                                        </span>
                                    </div>

                                    {isOpenForSubCategories && (
                                        <div className="add_category_dropdownList add_category_dropdownList2">
                                            {subCategories && subCategories?.map((subCategory, index) => (
                                                <p
                                                    key={subCategory?.id}
                                                    className="add_category_dropdownItem"
                                                    onClick={() => handleSelectSubCategory(subCategory)}
                                                >
                                                    {subCategory?.name}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="add_category_modal_save_btn"
                                    onClick={(e) => {
                                        handleSendCategories(e)
                                    }}
                                    disabled={!(selectedCategory && selectedSubCategory)} // Disable button if either is missing
                                    style={{opacity: selectedCategory && selectedSubCategory ? 1 : 0.5}} // Full opacity when both are selected
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    )}
                </div>


            </main>
        </>
    );
}

export default withAuth(FreelancerProfilePage)
