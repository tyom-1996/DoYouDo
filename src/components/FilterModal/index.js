import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { useRouter } from 'next/router';
import { FilterCloseIcon } from '../icons/FilterCloseIcon';
import { SearchIcon } from "@/components/icons/SearchIcon";
import { DeleteAddressIcon } from "@/components/icons/DeleteAddressIcon";
import Category from "@/pages/includes/Category";
import {useGetFilters} from "@/hooks/useGetFilters";

const FilterModal = ({
                         filterAddress,
                         filterCoordinates,
                         categoryData,
                         isActive,
                         onClose,
                         selectedCategories,
                         setNewSelectedCategories,
                         useFilter,
                         openMap,
                         resetFilter,
                         setMapShouldMove
                     }) => {
    const router = useRouter();

    const [IsOpenForRadius, setIsOpenForRadius] = useState(false);
    const [radius, setRadius] = useState(['50', '100', '200', '300', '400', '500']);
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);
    const { getFilters, filtersData} = useGetFilters();



    const [filters, setFilters] = useState({
        keyword: null,
        latitude: null,
        longitude: null,
        radius: null,
        minPrice: null,
        type: null,
        sortBy: null,
        noResponses: false,
        categories: [],
    });

    useEffect(() => {
        getFilters()
    }, []);
    useEffect(() => {
        if (filtersData) {
            console.log(filtersData, 'filterjakakak')
            setFilters({
                keyword: filtersData?.filter?.keyword ? filtersData?.filter?.keyword :  null,
                latitude: filtersData?.filter?.latitude ? filtersData?.filter?.latitude :  null,
                longitude: filtersData?.filter?.longitude ? filtersData?.filter?.longitude :  null,
                radius: filtersData?.filter?.radius ?  filtersData?.filter?.radius : null,
                minPrice: filtersData?.filter?.minPrice ? filtersData?.filter?.minPrice : null,
                type: filtersData?.filter?.type ? filtersData?.filter?.type : null,
                sortBy: filtersData?.filter?.sortBy ? filtersData?.filter?.sortBy : null,
                noResponses: filtersData?.filter?.noResponses ?  filtersData?.filter?.noResponses : false,
                categories: filtersData?.filter?.categories.length >  0 ? filtersData?.filter?.categories : [],
            });
        }
    }, [filtersData]);

    useEffect(() => {
        if (filterCoordinates !== null) {
            setFilters((prev) => ({
                ...prev,
                latitude: filterCoordinates?.lat,
                longitude: filterCoordinates?.lng,
            }));
        }
    }, [filterCoordinates]);

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
            radius: item,
        }));
    };

    const handleTaskCostChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFilterNoResponses = (e) => {
        const { name, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSortChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            sortBy: e.target.value,
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
        if (useFilter && typeof useFilter === 'function') {
            useFilter(filters);      // ✅ вызов родительского useFilter
            setMapShouldMove(true);  // ✅ флаг для родительского useEffect
            onClose();
            enableBodyScroll();
        }
    };



    // const resetFilters = () => {
    //     resetFilter()
    //     // // Reset the local filters

    //     //
    //     // setIsCheckedAllCategories(false); // Uncheck "Все категории"
    //     //
    //     // // Reset parent states through callbacks
    //     // setNewSelectedCategories([]); // Clear categories
    //     //
    //     // // Clear the address
    //     // if (typeof useFilter === 'function') {
    //     //     useFilter({
    //     //         keyword: null,
    //     //         latitude: null,
    //     //         longitude: null,
    //     //         radius: null,
    //     //         minPrice: null,
    //     //         type: null,
    //     //         sortBy: null,
    //     //         noResponses: false,
    //     //         categories: [],
    //     //     });
    //     // }
    //
    //
    // };


    const handleResetFilter = () => {
       resetFilter()
        setFilters({
            keyword: null,
            latitude: null,
            longitude: null,
            radius: null,
            minPrice: null,
            type: null,
            sortBy: null,
            noResponses: false,
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
                            <div className="filter_task_categories_input_title_wrapper filter_task_categories_input_title_wrapper2">
                                <p className="filter_task_categories_input_title">Местоположение</p>
                                <button
                                    className="filter_task_categories_input_field filter_task_categories_input_field_address"
                                    onClick={openMap}
                                >
                                    {filterAddress && filterAddress !== 'null'
                                        ? filterAddress
                                        : "Город, адрес, метро, район"}

                                </button>
                            </div>

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
                            <div className="filter_task_categories_input_title_wrapper">
                                <p className="filter_task_categories_input_title">Стоимость заданий от</p>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    value={filters.minPrice}*/}
                                {/*    name="minPrice"*/}
                                {/*    onChange={handleTaskCostChange}*/}
                                {/*    placeholder="₽"*/}
                                {/*    className="filter_task_categories_input_field"*/}
                                {/*/>*/}
                                <input
                                    placeholder="₽"
                                    className="filter_task_categories_input_field"
                                    type="text"
                                    value={filters.minPrice || ''}
                                    name="minPrice"
                                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="filter_option_checkbox_items_wrapper">
                            <div className="filter_option_checkbox_item">
                                <h3 className="filter_option_checkbox_items_wrapper_title">Показывать только задания со статусами</h3>
                                <div className="filter-option">
                                    <label className="filter_option_label">
                                        <input
                                            type="checkbox"
                                            name="type"
                                            value="remote"
                                            checked={filters.type === 'remote'}
                                            onChange={handleFilterChange}
                                        />
                                        <div className="filter_option_label_title_wrapper">
                                            <span className="filter_option_label_title">Удалённая работа</span>
                                            <span className="filter_option_label_title2">Никуда не надо ехать</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="filter-option">
                                    <label className="filter_option_label">
                                        <input
                                            type="checkbox"
                                            name="type"
                                            value="offline"
                                            checked={filters.type === 'offline'}
                                            onChange={handleFilterChange}
                                        />
                                        <div className="filter_option_label_title_wrapper">
                                            <span className="filter_option_label_title">Оффлайн работа</span>
                                            <span className="filter_option_label_title2">Надо ехать</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="filter-option">
                                    <label className="filter_option_label">
                                        <input
                                            type="checkbox"
                                            name="noResponses"
                                            checked={filters.noResponses}
                                            onChange={handleFilterNoResponses}
                                        />
                                        <div className="filter_option_label_title_wrapper">
                                            <span className="filter_option_label_title">Задания без откликов</span>
                                            <span className="filter_option_label_title2">Откликнитесь первым</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="filter_option_checkbox_item">
                                <h3 className="filter_option_checkbox_items_wrapper_title">Сортировать по:</h3>
                                <div className="sort-options">
                                    <label className="sort-option">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value="created_at"
                                            checked={filters.sortBy === 'created_at'}
                                            onChange={handleSortChange}
                                        />
                                        <p className="sort_option_title">Дате публикации</p>
                                    </label>
                                    <label className="sort-option">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value="start_date"
                                            checked={filters.sortBy === 'start_date'}
                                            onChange={handleSortChange}
                                        />
                                        <p className="sort_option_title">Срочности</p>
                                    </label>
                                </div>
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

export default FilterModal;

