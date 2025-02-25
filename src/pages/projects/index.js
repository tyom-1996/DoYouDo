import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import '../../assets/css/home.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {SearchMobileIcon} from "@/components/icons/SearchMobileIcon";
import {DateIcon} from "@/components/icons/DateIcon";
import {PaginationLeftIcon} from "@/components/icons/paginationLeftIcon";
import {PaginationRightIcon} from "@/components/icons/paginationRightIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {FilterIcon} from "@/components/icons/FilterIcon";
import { useRouter } from 'next/router';
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";
import FilterModal from "@/components/FilterModal";
import FilterMap from "@/components/FilterMapModal";
import {useGetOrders} from "@/hooks/useGetOrders";
import {useGetCategories} from "@/hooks/useGetCategories";
import {useFiltersSave} from "@/hooks/useFiltersSave";
import {useGetFilters} from "@/hooks/useGetFilters";

export default function Job () {

    const [windowHeight, setWindowHeight] = useState(0);
    const [recommendationsList, setRecommendationsList] = useState([
        {
            id: 1,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 2,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 4,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },

    ]);
    const [similarWorksList, setSimilarWorksList] = useState([
        {
            id: 1,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 2,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 3,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },
        {
            id: 4,
            service_name: 'Дизайн',
            service_type_info: 'Разработать логотип и фирменный стиль',
            service_price: 'до 1 000 ₽',
            service_date: '12 июня',
            service_hour: '14:05',
            service_address: '6666 466 метров от вас'
        },

    ]);
    const [isCheckedAllCategories2, setIsCheckedAllCategories2] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const { getOrders, ordersData, totalPages, loading } = useGetOrders();
    const { getFilters, filtersData} = useGetFilters();
    const { getCategories, categoriesData } = useGetCategories();
    const { makeFiltersSave, filtersSaveData } = useFiltersSave();
    const [filterBody, setFilterBody] = useState({});
    const [showFilterMobile, setShowFilterMobile] = useState(false);
    const [showFilterMap, setShowFilterMap] = useState(false);
    const [selectedFilterAddress, setSelectedFilterAddress] = useState('');
    const [selectedFilterCoordinates, setSelectedFilterCoordinates] = useState(null);

    // const handleCategorySelection = (val) => {
    //     if (selectedCategories.includes(val)) {
    //         const updatedCategories = selectedCategories.filter(cat => cat !== val);
    //         setSelectedCategories(updatedCategories);
    //     } else {
    //         setSelectedCategories([...selectedCategories, val]);
    //     }
    // };

    useEffect(() => {
        if (Object.keys(filterBody).length > 0) {
            makeFiltersSave(filterBody);
        }
    }, [filterBody]);

    useEffect(() => {
        getFilters(); // Call the API to get saved filters
    }, []);

    useEffect(() => {
        if (filtersData?.filter) {
            const { filter } = filtersData;

            // Update local states based on retrieved filters
            setFilterBody(filter);
            setSelectedCategories(filter.categories || []);
            setSearch(filter.keyword || '');

            // Format the address as a string or fallback to a placeholder
            const formattedAddress = filter.latitude && filter.longitude && filter.radius
                ? `${filter.latitude}, ${filter.longitude}, ${filter.radius}`
                : ''; // Fallback to empty if any value is missing
            setSelectedFilterAddress(formattedAddress);

            // Fetch orders with the saved filters
            getOrders(filter, page);
        } else {
            // If no saved filters, ensure default fetching
            getOrders({}, page);
        }
    }, [filtersData]);

    const handleCategorySelection = (val) => {
        let updatedCategories;

        if (selectedCategories.includes(val)) {
            updatedCategories = selectedCategories.filter((cat) => cat !== val);
        } else {
            updatedCategories = [...selectedCategories, val];
        }

        setSelectedCategories(updatedCategories);

        const updatedFilterBody = { ...filterBody, categories: updatedCategories };
        setFilterBody(updatedFilterBody);

        getOrders(updatedFilterBody, page); // Fetch filtered orders
    };


    useEffect(()=>{
        if (categoriesData) {
            console.log(categoriesData, 'categoriesData___')
        }
    }, [categoriesData]);
    const handleCheckboxChange2 = () => {
        setIsCheckedAllCategories2(!isCheckedAllCategories2);
    };

    useEffect(() => {
        handleUseFilter()
    }, [selectedCategories]);

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

    const router = useRouter();

    const navigateToMapPage = () => {
        router.push('/map');
    };
    const redirectToOrderSinglePage = (id) => {
        router.push(`/projects/${id}`);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        };

        // Set the locale to Russian for the desired format
        return date.toLocaleString('ru-RU', options);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // ReactPaginate uses a 0-based index
        setPage(selectedPage);
    };

    return (
        <>
            <main className='general_page_wrapper' id='job_page'>
                <Head>
                    <title>Работа</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                </Head>
                <div className="home_general_wrapper">
                    <Header activePage={"job_page"}/>
                </div>

                <div className="services">
                    <div className="services_wrapper">
                        <div className="services_search_box_logo_wrapper">
                            <div className="services_search_box">
                                <div className="services_search_input_field">
                                    <div className='services_search_input_field_icon'>
                                        <SearchIcon/>
                                    </div>

                                    <input
                                        type='text'
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value)
                                        }}
                                        placeholder='Услуга'
                                        className='services_search_input'
                                    />
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
                                {/*<City*/}
                                {/*    cityData={citiesList}*/}
                                {/*    selectedCities={selectedCities}*/}
                                {/*    setNewSelectedCities={(val)=>{*/}
                                {/*        setSelectedCities(val)*/}
                                {/*        console.log(val)*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <div className="service_category_items_wrapper">
                                    {categoriesData &&
                                        categoriesData.map((item) => (
                                            <Category
                                                key={item.id} // Ensure a unique key
                                                categoryData={item}
                                                selectedCategories={selectedCategories}
                                                setNewSelectedCategories={handleCategorySelection}
                                            />
                                        ))}
                                </div>
                            </div>
                            <div className="services_items_wrapper">
                                {ordersData && ordersData?.orders.length > 0 ?
                                    (
                                        <div className='services_items_wrapper2'>
                                            <div className="services_items_wrapper_child">
                                                {ordersData?.orders?.map((item, index) => (
                                                    <button
                                                        className='services_item'
                                                        key={index}
                                                        onClick={() => redirectToOrderSinglePage(item?.id)}
                                                    >
                                                        <div className="services_item_name_address_info_wrapper">
                                                            <p className="services_item_name">{item?.title}</p>
                                                            <p className="services_item_address_info">{item?.address}</p>
                                                        </div>
                                                        <p className="services_item_info">{item?.description}</p>
                                                        <div className='services_item_pirce_date_info_wrapper'>
                                                            <div className='services_item_pirce_wrapper'>
                                                                <p className='services_item_pirce_info'>{item?.price}</p>
                                                            </div>
                                                            <div className='services_item_date_hour_wrapper'>
                                                                <div className='services_item_date_hour_title_icon_wrapper'>
                                                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                                    <DateIcon />
                                                                </div>
                                                                <div className='services_item_date_hour_info_wrapper'>
                                                                    <p className='services_item_date_hour_info1'>{formatDate(item.start_date)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>


                                            {/* ReactPaginate for Pagination */}
                                            <ReactPaginate
                                                previousLabel={<PaginationLeftIcon />}
                                                nextLabel={<PaginationRightIcon />}
                                                breakLabel={'...'}
                                                breakClassName={'pagination_break'}
                                                pageCount={totalPages} // Total number of pages from the API
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
                                    )
                                    :
                                    (
                                        <p className='services_items_wrapper_not_found'>Ничего не найдено</p>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div className="recommendations">
                    <div className="recommendations_wrapper">
                        <h1 className='recommendations_title'>Рекомендации</h1>
                        <div className='recommendations_items_wrapper'>
                            {recommendationsList.map((item, index) => {
                                return (
                                    <div className='services_item' key={index}>
                                        <div className="services_item_name_address_info_wrapper">
                                            <p className="services_item_name">{item?.service_name}</p>
                                            <p className="services_item_address_info">{item?.service_address}</p>
                                        </div>

                                        <p className="services_item_info">{item?.service_type_info}</p>
                                        <div className='services_item_pirce_date_info_wrapper'>
                                            <div className='services_item_pirce_wrapper'>
                                                <p className='services_item_pirce_info'>{item?.service_price}</p>
                                            </div>
                                            <div className='services_item_date_hour_wrapper'>
                                                <div className='services_item_date_hour_title_icon_wrapper'>
                                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                    <DateIcon/>
                                                </div>
                                                <div className='services_item_date_hour_info_wrapper'>
                                                    <p className='services_item_date_hour_info1'>{item.service_date},</p>
                                                    <p className='services_item_date_hour_info2'>{item.service_hour}</p>
                                                </div>

                                            </div>
                                        </div>
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
                <div className="recommendations">
                    <div className="recommendations_wrapper">
                        <h1 className='recommendations_title'>Похожие работы</h1>
                        <div className='recommendations_items_wrapper'>
                            {similarWorksList.map((item, index) => {
                                return (
                                    <div className='services_item' key={index}>
                                        <div className="services_item_name_address_info_wrapper">
                                            <p className="services_item_name">{item?.service_name}</p>
                                            <p className="services_item_address_info">{item?.service_address}</p>
                                        </div>

                                        <p className="services_item_info">{item?.service_type_info}</p>
                                        <div className='services_item_pirce_date_info_wrapper'>
                                            <div className='services_item_pirce_wrapper'>
                                                <p className='services_item_pirce_info'>{item?.service_price}</p>
                                            </div>
                                            <div className='services_item_date_hour_wrapper'>
                                                <div className='services_item_date_hour_title_icon_wrapper'>
                                                    <p className='services_item_date_hour_title_icon_wrapper_title'>Начать</p>
                                                    <DateIcon/>
                                                </div>
                                                <div className='services_item_date_hour_info_wrapper'>
                                                    <p className='services_item_date_hour_info1'>{item.service_date},</p>
                                                    <p className='services_item_date_hour_info2'>{item.service_hour}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pagination_links_wrapper">
                            <button className="pagination_link_btn">
                                <PaginationLeftIcon/>
                            </button>x
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

                <Footer activePage={"job_page"}/>

                {showFilterMobile &&
                    <FilterModal
                        openMap={() => setShowFilterMap(true)} // Opens the map
                        useFilter={(filterOptions) => {
                            // Merge new filter options with the existing filterBody
                            const updatedFilterBody = { ...filterBody, ...filterOptions };
                            setFilterBody(updatedFilterBody); // Update local filter state
                            getOrders(updatedFilterBody, 1); // Fetch orders using updated filters (reset to page 1)
                        }}
                        isActive={showFilterMobile} // Control modal visibility
                        categoryData={categoriesData} // Pass categories data
                        filterAddress={selectedFilterAddress} // Pass selected filter address
                        filterCoordinates={selectedFilterCoordinates} // Pass selected filter coordinates
                        selectedCategories={selectedCategories} // Pass selected categories
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
                        onClose={() => setShowFilterMobile(false)} // Handle modal close
                        resetFilter={() => {
                            // Reset the filter state and fetch all orders

                            setSelectedCategories([]);
                            setSelectedFilterAddress('');
                            setSelectedFilterCoordinates(null);
                            getOrders({}, 1); // Fetch orders without filters (reset to page 1)
                        }}
                    />
                }




                <FilterMap
                    isActive={showFilterMap}
                    filterAddress={selectedFilterAddress}
                    filterCoordinates={selectedFilterCoordinates}
                    onClose={() => {
                        setShowFilterMap(false)
                    }}
                    onChange={(address, coordinates) => {
                        console.log(address, 'selected_address____')
                        console.log(address, 'selected_address____')
                        setSelectedFilterAddress(address)
                        setSelectedFilterCoordinates(coordinates)
                    }}
                />

            </main>
        </>
    );
}


