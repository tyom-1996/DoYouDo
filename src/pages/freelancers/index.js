import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/freelancers.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import Head from 'next/head';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {SearchMobileIcon} from "@/components/icons/SearchMobileIcon";
import {FilterIcon} from "@/components/icons/FilterIcon";
import { useRouter } from 'next/router';
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";
import {useGetCategories} from "@/hooks/useGetCategories";
import {useGetFreelancers} from "@/hooks/useGetFreelancers";
import ReactPaginate from "react-paginate";
import FreelancerFilterModal from "@/components/FreelancerFilterModal";
import FilterModal from "@/components/FilterModal";

export default function Freelancers () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const [showFilterMobile, setShowFilterMobile] = useState(false);
    const [filterCategoryList, setFilterCategoryList] = useState([
        {
            id: 1,
            filter_category_title: 'Дизайн',
            filter_item_subcategories: [
                {
                    id: 2,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 3,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 4,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 5,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 6,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 7,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 8,
            filter_category_title: 'Дизайн',
            filter_item_subcategories: [
                {
                    id: 9,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 10,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 11,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 12,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 13,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 14,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 15,
            filter_category_title: 'Компьютерная помощь',
            filter_item_subcategories: [
                {
                    id: 16,
                    subcategory_name: 'Ремонт компьютеров',
                },
                {
                    id: 17,
                    subcategory_name: 'Установка и настройка',
                },
                {
                    id: 18,
                    subcategory_name: 'Удаление вирусов',
                },
                {
                    id: 19,
                    subcategory_name: '3d-Настройка интернета',
                },
                {
                    id: 20,
                    subcategory_name: 'Консультация и обучение',
                },

            ]
        },
        {
            id: 21,
            filter_category_title: 'Разработка ПО',
            filter_item_subcategories: [
                {
                    id: 22,
                    subcategory_name: 'Ремонт компьютеров',
                },
                {
                    id: 23,
                    subcategory_name: 'Установка и настройка',
                },
                {
                    id: 24,
                    subcategory_name: 'Удаление вирусов',
                },
                {
                    id: 25,
                    subcategory_name: '3d-Настройка интернета',
                },
                {
                    id: 26,
                    subcategory_name: 'Консультация и обучение',
                },

            ]
        },
        {
            id: 27,
            filter_category_title: 'Фото, видео и аудио',
            filter_item_subcategories: [
                {
                    id: 28,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 29,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 30,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 31,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 32,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 33,
                    subcategory_name: 'Анимация',
                },
            ]
        },
        {
            id: 34,
            filter_category_title: 'Красота и здоровье',
            filter_item_subcategories: [
                {
                    id: 35,
                    subcategory_name: 'Фирменный стиль',
                },
                {
                    id: 36,
                    subcategory_name: 'Логотипы',
                },
                {
                    id: 37,
                    subcategory_name: 'Визитки',
                },
                {
                    id: 38,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 39,
                    subcategory_name: '3d-графика',
                },
                {
                    id: 40,
                    subcategory_name: 'Анимация',
                },
            ]
        },

    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const { getFreelancers, freelancersData, totalPages, loading } = useGetFreelancers();

    const [IsOpenForRadius, setIsOpenForRadius] = useState(false);
    const [selectedRadius, setSelectedRadius] = useState('');
    const [radius, setRadius] = useState([
        '50 км',
        '100 км',
        '200 км',
        '300 км',
        '400 км',
        '500 км',
    ]);
    const [address, setAddress] = useState('');
    const { getCategories, categoriesData } = useGetCategories();

    const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
    const [searchCategory, setSearchCategory] = useState('');
    const [filterBody, setFilterBody] = useState({});
    const [page, setPage] = useState(1);
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const [isCheckedAllCategories2, setIsCheckedAllCategories2] = useState(false);

    const handleCheckboxChange2 = () => {
        setIsCheckedAllCategories2(!isCheckedAllCategories2);
    };


    const handleCategorySelection = (val) => {
        let updatedCategories;

        if (selectedCategories.includes(val)) {
            updatedCategories = selectedCategories.filter((cat) => cat !== val);
        } else {
            updatedCategories = [...selectedCategories, val];
        }

        setSelectedCategories(updatedCategories);

        const updatedFilterBody = { ...filterBody };
        if (updatedCategories.length > 0) {
            updatedFilterBody.categories = updatedCategories.join(','); // Ensure categories are comma-separated
        } else {
            delete updatedFilterBody.categories;
        }

        setFilterBody(updatedFilterBody);
        getFreelancers(updatedFilterBody, page);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPage(selectedPage);
        getFreelancers(filterBody, selectedPage);
    };

    useEffect(() => {
        getFreelancers(filterBody, page);
    }, []);


    const handleCheckboxChange = () => {
        setIsCheckedAllCategories(!isCheckedAllCategories);
    };

    useEffect(()=>{
        if (categoriesData) {
            console.log(categoriesData, 'categoriesData___')
        }
    }, [categoriesData]);


    useEffect(() => {
        handleUseFilter()
    }, [selectedCategories, selectedCities]);

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
    const router = useRouter();

    const navigateToMapPage = () => {
        router.push('/map');
    };
    const redirectToFreelancerSinglePage = (id) => {
        router.push(`/freelancers/${id}`);
    }
    const  handleSelectRadius = (item) => {
        setSelectedRadius(item);
        setIsOpenForRadius(false);
    }

    const handleAddressChange = async (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);

        if (newAddress.length > 3) {
            // Fetch coordinates from Yandex Geocode API
            const response = await fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=ed170562-fba8-4475-84f5-8940538e66e2&format=json&geocode=${newAddress}`
            );
            const data = await response.json();

            if (data.response.GeoObjectCollection.featureMember.length) {
                const coords =
                    data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number);
                setCoordinates([coords[1], coords[0]]);
            }

        }
    };
    const handleFilterMenuClick = () => {
        // Close the filter menu when clicking on the background
        setShowFilterMobile(false);
        enableBodyScroll();
    };


    const stopPropagation = (event) => {
        // Prevent click event from bubbling up to the filter menu
        event.stopPropagation();
    };



    return (
        <>
            <main className='general_page_wrapper' id='freelancers_page'>
                <Head>
                    <title>Фрилансеры</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"freelancers_page"}/>
                    <div className="freelancers">
                        <div className="services_wrapper">
                            <div className="services_search_box_logo_wrapper">
                                <div className="services_search_box">
                                    <div className="services_search_input_field">
                                        <div className='services_search_input_field_icon'>
                                            <SearchIcon/>
                                        </div>
                                        <input type="text" placeholder='Cпециалист' className='services_search_input'/>
                                    </div>
                                    <div className='services_search_box_buttons_wrapper'>
                                        <button className='services_search_box_search_button'>
                                            Найти
                                        </button>
                                        <button
                                            className='services_search_box_map_button'
                                            onClick={() => {
                                                navigateToMapPage()
                                            }}
                                        >
                                            Карта
                                        </button>
                                        <button
                                            className='services_search_box_filter_button'
                                            onClick={() => {
                                               setShowFilterMobile(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            <FilterIcon/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mobile_services_search_box">
                                    <div className='services_search_input_field_btn_wrapper'>
                                        <div className="services_search_input_field">
                                            <div className='services_search_input_field_icon'>
                                                <SearchIcon/>
                                            </div>
                                            <input type="text" placeholder='Услуга' className='services_search_input'/>
                                        </div>
                                        <button className='services_search_box_search_button'>
                                            <SearchMobileIcon/>
                                        </button>
                                    </div>

                                    <div className='services_search_box_buttons_wrapper'>
                                        <button
                                            className='services_search_box_map_button'
                                            onClick={() => {
                                                navigateToMapPage()
                                            }}
                                        >
                                            Карта
                                        </button>
                                        <button
                                            className='services_search_box_filter_button'
                                            onClick={() => {
                                                setShowFilterMobile(true)
                                                disableBodyScroll()
                                            }}
                                        >
                                            Фильтр
                                        </button>
                                    </div>
                                </div>
                                <div className='services_search_box_logo'>
                                    <Image
                                        src="/main_logo.png"
                                        alt="Example Image"
                                        layout="fill" // Fill the parent element
                                        objectFit="cover" // Cover the area of the parent element
                                        quality={100} // Image quality
                                    />
                                </div>
                            </div>
                            <div className="services_items_filter_main_wrapper">
                                <div className="services_filter_items_wrapper">
                                    <div className='services_filter_item'>
                                        <label className='service_label'>
                                            <input
                                                type="checkbox"
                                                checked={isCheckedAllCategories2}
                                                onChange={handleCheckboxChange2}
                                                className='service_label_checkbox_input_field checkbox'
                                            />
                                            <span className='service_label_custom_checkbox customCheckbox'></span>
                                            Все категории

                                        </label>
                                    </div>
                                    <div className="service_category_items_wrapper">
                                        {categoriesData &&
                                            categoriesData.map((item) => (
                                                <Category
                                                    key={item.id}
                                                    categoryData={item}
                                                    selectedCategories={selectedCategories}
                                                    setNewSelectedCategories={handleCategorySelection}
                                                />
                                            ))}
                                    </div>
                                </div>

                                <div className="services_items_wrapper">
                                    {loading ? (
                                        <p></p>
                                    ) : freelancersData && freelancersData?.data.length > 0 ? (
                                        <>
                                            <div className="freelancers_items_wrapper">
                                                {freelancersData?.data.map((item, index) => (
                                                    <button
                                                        className="freelancers_item"
                                                        key={index}
                                                        onClick={() => redirectToFreelancerSinglePage(item?.id)}
                                                    >
                                                        <div className="freelancers_item_user_img">
                                                            <Image
                                                                src={item?.photo ? `${imagePath}${item?.photo}` : '/upload_img1.png'}
                                                                alt="Freelancer Image"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                quality={100}
                                                            />
                                                        </div>
                                                        <div className="freelancers_item_info_box">
                                                            <p className="freelancers_item_user_name">
                                                                {item?.first_name} {item?.last_name}
                                                            </p>
                                                            <div className="freelancers_item_user_header_item">
                                                                <p className="freelancers_item_user_profession">{item?.about_me}</p>
                                                                <p className="freelancers_item_user_distance_info">{item?.distance}</p>
                                                            </div>

                                                            <div className="freelancers_item_line"></div>
                                                            {item?.categories &&
                                                                item?.categories.map((item2, idx) => (
                                                                    <p className="freelancers_item_user_service_info" key={idx}>
                                                                        {item2?.name}
                                                                    </p>
                                                                ))}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>

                                            <ReactPaginate
                                                previousLabel={<PaginationLeftIcon />}
                                                nextLabel={<PaginationRightIcon />}
                                                breakLabel={'...'}
                                                breakClassName={'pagination_break'}
                                                pageCount={totalPages} // Correct total pages calculation
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
                                        </>
                                    ) : (
                                        <p className="services_items_wrapper_not_found">Ничего не найдено</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    <Footer activePage={"freelancers_page"}/>
                    {showFilterMobile &&
                        <FreelancerFilterModal
                            useFilter={(filterOptions) => {
                                const updatedFilterBody = { ...filterBody, ...filterOptions };
                                setFilterBody(updatedFilterBody); // Update local filter state
                                getFreelancers(updatedFilterBody, 1); // Fetch orders using updated filters (reset to page 1)
                            }}
                            isActive={showFilterMobile}
                            categoryData={categoriesData}
                            selectedCategories={selectedCategories}
                            setNewSelectedCategories={(val) => {
                                // Toggle category selection
                                const updatedCategories = selectedCategories.includes(val)
                                    ? selectedCategories.filter((cat) => cat !== val)
                                    : [...selectedCategories, val];

                                // Update the state
                                setSelectedCategories(updatedCategories);
                                setFilterBody((prev) => ({
                                    ...prev,
                                    categories: updatedCategories,
                                }));
                            }}
                            onClose={() => setShowFilterMobile(false)}
                            resetFilter={() => {
                                setSelectedCategories([]);
                                getFreelancers({}, 1);
                            }}
                        />
                    }
                </div>

            </main>
        </>
    );
}
