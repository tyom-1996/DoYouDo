import React, { useState, useEffect } from 'react';
import '../../assets/css/home.css';
import { useRouter } from 'next/router';
import { FilterCloseIcon } from '../icons/FilterCloseIcon';
import Category from "@/pages/includes/Category";

const FreelancerFilterModal = ({
                         categoryData,
                         isActive,
                         onClose,
                         selectedCategories,
                         setNewSelectedCategories,
                         useFilter,
                         resetFilter
                     }) => {
    const router = useRouter();

    const [IsOpenForRadius, setIsOpenForRadius] = useState(false);
    const [radius, setRadius] = useState(['50', '100', '200', '300', '400', '500']);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);

    const [filters, setFilters] = useState({
        keyword: null,
        latitude: null,
        longitude: null,
        radius: null,
        categories: [],
    });


    const enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    if (!isActive) {
        return null;
    }


    const handleSelectRadius = (item) => {
        setIsOpenForRadius(false);
        setFilters((prev) => ({
            ...prev,
            radius: item, // Ensure radius is updated
        }));
    };


    const handleCheckboxChange = () => {
        const newStatus = !isCheckedAllCategories;
        setIsCheckedAllCategories(newStatus);
        setFilters((prev) => ({
            ...prev,
            categories: newStatus ? categoryData.map((cat) => cat.id) : [],
        }));
    };

    const handleCategorySelection = (newSelectedCategories) => {
        setNewSelectedCategories(newSelectedCategories);
        setFilters((prev) => ({
            ...prev,
            categories: newSelectedCategories,
        }));
    };

    const handleUseFilter = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLatitude = position.coords.latitude;
                    const userLongitude = position.coords.longitude;

                    const updatedFilters = {
                        ...filters,
                        lat: userLatitude,
                        lng: userLongitude,
                    };

                    useFilter(updatedFilters); // Pass filters with lat/lng
                    onClose();
                    enableBodyScroll();
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    useFilter(filters); // Send without lat/lng if location is not available
                    onClose();
                    enableBodyScroll();
                }
            );
        } else {
            useFilter(filters);
            onClose();
            enableBodyScroll();
        }
    };


    const handleResetFilter = () => {
       resetFilter()
        setFilters({
            keyword: null,
            latitude: null,
            longitude: null,
            radius: null,
            categories: [],
        });
    }




    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div
            className="filter_mobile_menu"
            onClick={() => {
                onClose();
                enableBodyScroll();
            }}
        >
            <div
                className="filter_mobile_menu_wrapper"
                onClick={(e) => {
                    stopPropagation(e);
                }}
            >
                <div className="filter_mobile_menu_title_close_icon_wrapper">
                    <button
                        className="filter_mobile_menu_close_btn"
                        onClick={() => {
                            onClose();
                            enableBodyScroll();
                        }}
                    >
                        <FilterCloseIcon />
                    </button>
                    <p className="filter_mobile_menu_title">Фильтр</p>
                </div>
                <div className="mobile_services_filter_items_wrapper">
                    <div style={{ width: '100%' }}>
                        <div className="filter_task_categories_header">
                            <p className="filter_task_categories_header_title">Характеристики задания</p>
                        </div>
                        <div className="filter_task_categories_main">
                            <div className="radius_dropdown">
                                <p className="radius_dropdown_title">Радиус поиска</p>
                                <div
                                    className="radius_dropdownHeader"
                                    onClick={() => setIsOpenForRadius(!IsOpenForRadius)}
                                >
                                    <p className="radius_dropdownHeader_title">
                                        {filters?.radius || 'Радиус поиска'}
                                    </p>
                                </div>
                                {IsOpenForRadius && (
                                    <div className="radius_dropdownList radius_dropdownList2">
                                        {radius.map((item, index) => (
                                            <p
                                                key={index}
                                                className="radius_dropdownItem"
                                                onClick={() => handleSelectRadius(item)}
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="services_filter_item">
                            <label className="service_label">
                                <input
                                    type="checkbox"
                                    checked={isCheckedAllCategories}
                                    onChange={handleCheckboxChange}
                                    className="service_label_checkbox_input_field checkbox"
                                />
                                <span className="service_label_custom_checkbox customCheckbox"></span>
                                Все категории
                            </label>
                        </div>

                        <div className="service_category_items_wrapper">
                            {categoryData &&
                                categoryData.map((item, index) => (
                                    <Category
                                        key={index}
                                        categoryData={item}
                                        selectedCategories={selectedCategories}
                                        setNewSelectedCategories={handleCategorySelection}
                                    />
                                ))}
                        </div>
                        <div className="apply_reset_filter_btn_wrapper">
                            <button onClick={handleUseFilter} className="apply_filter_btn">
                                Применить
                            </button>
                            <button className="reset_filter_btn" onClick={handleResetFilter}>
                                Сбросить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerFilterModal;

