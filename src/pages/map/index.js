import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import '../../assets/css/map.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../includes/Category'
import City from '../includes/CityComponent'
import Head from 'next/head';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {SearchMobileIcon} from "@/components/icons/SearchMobileIcon";
import {FilterIcon} from "@/components/icons/FilterIcon";
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import { useRouter } from 'next/router';
import {DropDownIcon3} from "@/components/icons/DropDownIcon3";
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";
import FilterModal from "@/components/FilterModal";
import FilterMap from "@/components/FilterMapModal";
import {useGetOrders} from "@/hooks/useGetOrders";
import {useGetFilters} from "@/hooks/useGetFilters";
import {useGetCategories} from "@/hooks/useGetCategories";
import {useFiltersSave} from "@/hooks/useFiltersSave";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import('@react-google-maps/api').then((mod) => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import('@react-google-maps/api').then((mod) => mod.Marker), { ssr: false });
const LoadScript = dynamic(() => import('@react-google-maps/api').then((mod) => mod.LoadScript), { ssr: false });

const containerStyle = {
    width: '100%',
    height: '518px',
    borderRadius: '15px',
    overflow: 'hidden',
};

const defaultCenter = {
    lat: 55.7558,
    lng: 37.6176,
};

export default function Map () {
    const [windowHeight, setWindowHeight] = useState(0);
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
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const mapRef = useRef(null);


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
    const redirectToOrderPageForFreelancer = (id) => {
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


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };


    const redirectToProjects = (id) => {
        router.push(`/projects`);
    };

    const handleMapClick = (event) => {
        const { lat, lng } = event.latLng.toJSON();
        setCoordinates({ lat, lng });
    };

    const redirectToOrderSinglePage = (id) => {
        router.push(`/projects/${id}`);
    };
    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Карта</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='map_page'>
                    <Header/>
                    <div className="services">
                        <div className="services_wrapper">
                            <div className="services_search_box_logo_wrapper">
                                <div className="services_search_box">
                                    <div className="services_search_input_field">
                                        <div className='services_search_input_field_icon'>
                                            <SearchIcon/>
                                        </div>
                                        <input type="text" placeholder='Услуга' className='services_search_input'/>
                                    </div>
                                    <div className='services_search_box_buttons_wrapper'>
                                        <button className='services_search_box_search_button'>
                                            Найти
                                        </button>
                                        <button
                                            className='services_search_box_map_button'
                                            onClick={() => {
                                                redirectToProjects()
                                            }}
                                        >
                                            Список
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
                                                redirectToProjects()
                                            }}
                                        >
                                            Список
                                        </button>
                                        <button
                                            className='services_search_box_map_button'
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
                            <div className="map_img_filter_main_wrapper">
                                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>

                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={coordinates}
                                        zoom={12}
                                        onClick={handleMapClick}
                                        onLoad={(map) => {
                                            mapRef.current = map;
                                        }}
                                    >
                                        {ordersData?.orders &&
                                            ordersData.orders
                                                .filter(order => order.latitude && order.longitude)
                                                .map(order => (
                                                    <Marker
                                                        key={order.id}
                                                        position={{ lat: parseFloat(order.latitude), lng: parseFloat(order.longitude) }}
                                                        icon={{
                                                            url: "/map_icon.png",
                                                            scaledSize: window.google && window.google.maps
                                                                ? new google.maps.Size(40, 40)
                                                                : null, // Prevent incorrect size if Google Maps isn't loaded
                                                        }}
                                                        title={order.title}
                                                        onClick={() => redirectToOrderSinglePage(order.id)}
                                                    />

                                                ))}
                                    </GoogleMap>

                                </LoadScript>
                                {/*<div className='map_filter_wrapper'>*/}
                                {/*    <div className="services_filter_items_wrapper">*/}

                                {/*        <div className='services_filter_item'>*/}
                                {/*            <label className='service_label'>*/}
                                {/*                <input*/}
                                {/*                    type="checkbox"*/}
                                {/*                    checked={isCheckedAllCategories}*/}
                                {/*                    onChange={handleCheckboxChange}*/}
                                {/*                    className='service_label_checkbox_input_field checkbox'*/}
                                {/*                />*/}
                                {/*                <span className='service_label_custom_checkbox customCheckbox'></span>*/}
                                {/*                Все категории*/}

                                {/*            </label>*/}
                                {/*        </div>*/}

                                {/*        <City*/}
                                {/*            cityData={citiesList}*/}
                                {/*            selectedCities={selectedCities}*/}
                                {/*            setNewSelectedCities={(val)=>{*/}
                                {/*                setSelectedCities(val)*/}
                                {/*                console.log(val)*/}
                                {/*            }}*/}
                                {/*        />*/}

                                {/*        <div className='service_category_items_wrapper'>*/}
                                {/*            {filterCategoryList.map((item, index) => {*/}
                                {/*                return (*/}
                                {/*                    <Category*/}
                                {/*                        categoryData={item}*/}
                                {/*                        selectedCategories={selectedCategories}*/}
                                {/*                        setNewSelectedCategories={(val)=>{*/}
                                {/*                            setSelectedCategories(val)*/}
                                {/*                            console.log(val)*/}
                                {/*                        }}*/}
                                {/*                    />*/}
                                {/*                )*/}
                                {/*            })}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <Footer/>


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

                </div>

            </main>
        </>
    );
}
