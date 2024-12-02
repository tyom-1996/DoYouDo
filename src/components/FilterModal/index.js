import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { FilterCloseIcon } from '../icons/FilterCloseIcon';
import { PasswordShowIcon } from '../icons/PasswordShowIcon';
import { PasswordCloseIcon } from '../icons/PasswordCloseIcon';
import RegisterConfirmationAccountModal from "@/components/registerConfirmationAccountModal";
import LoginModal from "@/components/loginModal";
import {SearchIcon} from "@/components/icons/SearchIcon";
import {DeleteAddressIcon} from "@/components/icons/DeleteAddressIcon";
import Category from "@/pages/includes/Category";

const FilterModal = ({ categoryData,isActive, onClose, selectedCategories, setNewSelectedCategories, useFilter }) => {

    const [IsOpenForRadius, setIsOpenForRadius] = useState(false);
    const [radius, setRadius] = useState([
        '50',
        '100',
        '200',
        '300',
        '400',
        '500 ',
    ]);
    const [searchCategory, setSearchCategory] = useState('');
    const [isCheckedAllCategories, setIsCheckedAllCategories] = useState(false);

    const [filters, setFilters] = useState({
        keyword: null,
        latitude: null, //34.052235,
        longitude: null, //-118.243683,
        radius: null, //100,
        minPrice: null, //1000,


        type: null, //"remote", // offline
        sortBy: null, //"start_date", //created_at
        noResponses: false
    });

    useEffect(()=> {
        console.log(filters, 'filters');
    }, [filters])

    const enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    if (!isActive) {
        return null;
    }

    const redirectToFilterMap = () => {
        router.push(`/filterMap`);
    };
    const  handleSelectRadius = (item) => {
        setIsOpenForRadius(false);
        setFilters((prev) => ({
            ...prev,
            ["radius"]: item,
        }));
    }
    const handleTaskCostChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFilterNoResponses = (e) => {
        const { name, checked, value } = e.target;
        console.log(checked, value, 'checked_val___')
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
        setIsCheckedAllCategories(!isCheckedAllCategories);
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


    const handleUseFilter = () => {

    };




    return (
        <div
            className='filter_mobile_menu'
            onClick={() => {
                onClose()
                enableBodyScroll()
            }}
        >
            <div
                className='filter_mobile_menu_wrapper'
                onClick={(e) => {
                    stopPropagation(e)
                }}
            >
                <div className='filter_mobile_menu_title_close_icon_wrapper'>
                    <button
                        className='filter_mobile_menu_close_btn'
                        onClick={() => {
                            onClose()
                            enableBodyScroll()
                        }}
                    >
                        <FilterCloseIcon/>
                    </button>
                    <p className='filter_mobile_menu_title'>Фильтр</p>
                </div>
                <div className="mobile_services_filter_items_wrapper">
                    <div style={{width: '100%'}}>
                        <div
                            className='filter_task_categories_header'
                            // onClick={() => {
                            //     setShowHiddenFilterCategoriesPart(!showHiddenFilterCategoriesPart)
                            // }}
                        >
                            <p className='filter_task_categories_header_title'>Характеристики задания</p>
                            {/*<button*/}
                            {/*    className={`filter_task_categories_header_icon${showHiddenFilterCategoriesPart ? '2' : ''}`}*/}
                            {/*>*/}
                            {/*    <DropDownIcon3/>*/}
                            {/*</button>*/}

                        </div>
                        {/*{showHiddenFilterCategoriesPart &&*/}
                        <div className='filter_task_categories_main'>
                            <div className="filter_task_categories_input_title_wrapper filter_task_categories_input_title_wrapper2">
                                <p className="filter_task_categories_input_title">местоположения</p>
                                <button
                                    className='filter_task_categories_input_field filter_task_categories_input_field_address'
                                    onClick={() => {
                                        redirectToFilterMap()
                                    }}
                                >
                                    Город, адрес, метро, район
                                </button>

                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    value={address}*/}
                                {/*    onChange={handleAddressChange}*/}
                                {/*    placeholder="Город, адрес, метро, район"*/}
                                {/*    className='filter_task_categories_input_field filter_task_categories_input_field_address'*/}
                                {/*/>*/}
                                {/*{address.length > 0 &&*/}
                                {/*    <button*/}
                                {/*        className='delete_input_btn'*/}
                                {/*        onClick={() => {*/}
                                {/*            setAddress('')*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <DeleteAddressIcon/>*/}
                                {/*    </button>*/}
                                {/*}*/}

                            </div>

                            <div className="radius_dropdown">
                                <p className='radius_dropdown_title'>Радиус поиска</p>
                                <div className="radius_dropdownHeader" onClick={() => setIsOpenForRadius(!IsOpenForRadius)}>
                                    <p className='radius_dropdownHeader_title'>{filters?.radius || 'Радиус поиска'}</p>
                                    <span className="arrow">
                                    {IsOpenForRadius ?
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
                                {IsOpenForRadius && (
                                    <div className="radius_dropdownList radius_dropdownList2">
                                        {radius.map((item, index) => (
                                            <p key={index} className="radius_dropdownItem" onClick={() => handleSelectRadius(item)}>
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="filter_task_categories_input_title_wrapper">
                                <p className="filter_task_categories_input_title">Стоимость заданий от</p>
                                <input
                                    type="text"
                                    value={filters.minPrice}
                                    name="minPrice"
                                    onChange={handleTaskCostChange}
                                    placeholder="₽"
                                    className='filter_task_categories_input_field'
                                />
                            </div>
                        </div>
                        {/*}*/}
                    </div>

                    <div className='filter_task_categories_wrapper'>
                        <div className='filter_option_checkbox_items_wrapper'>
                            <div className='filter_option_checkbox_item'>
                                <h3 className="filter_option_checkbox_items_wrapper_title">Показывать только задания со статусами</h3>
                                <div className="filter-option">

                                    {/*remote*/}
                                    {/*offline*/}

                                    <label className='filter_option_label'>
                                        <input
                                            type="checkbox"
                                            name="type"
                                            value={'remote'}
                                            checked={filters.type == 'remote'}
                                            onChange={handleFilterChange}
                                        />
                                        <div className='filter_option_label_title_wrapper'>
                                            <span className='filter_option_label_title'>Удалённая работа</span>
                                            <span className='filter_option_label_title2'>Никуда не надо ехать</span>
                                        </div>

                                    </label>
                                </div>
                                <div className="filter-option">
                                    <label className='filter_option_label'>
                                        <input
                                            type="checkbox"
                                            name="type"
                                            value={'offline'}
                                            checked={filters.type == 'offline'}
                                            onChange={handleFilterChange}
                                        />
                                        <div className='filter_option_label_title_wrapper'>
                                            <span className='filter_option_label_title'>Оффлайн работа</span>
                                            <span className='filter_option_label_title2'>Надо ехать</span>
                                        </div>

                                    </label>
                                </div>
                                <div className="filter-option">
                                    <label className='filter_option_label'>
                                        <input
                                            type="checkbox"
                                            name="noResponses"
                                            checked={filters.noResponses}
                                            onChange={handleFilterNoResponses}
                                        />
                                        <div className='filter_option_label_title_wrapper'>
                                            <span className='filter_option_label_title'>Задания без откликов</span>
                                            <span className='filter_option_label_title2'>Откликнитесь первым</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className='filter_option_checkbox_item'>
                                <h3 className="filter_option_checkbox_items_wrapper_title">Сортировать по:</h3>
                                <div className="sort-options">

                                    {/*DONE*/}
                                    <label className="sort-option">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value="created_at"
                                            checked={filters.sortBy === 'created_at'}
                                            onChange={handleSortChange}
                                        />
                                        <p className='sort_option_title'> Дате публикации</p>
                                    </label>

                                    <label className="sort-option">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value="start_date"
                                            checked={filters.sortBy === 'start_date'}
                                            onChange={handleSortChange}
                                        />
                                        <p className='sort_option_title'>Срочности</p>
                                    </label>

                                </div>
                            </div>
                        </div>
                        {/*</div>*/}

                        {/*</div>*/}

                        <div className="services_search_input_field2">
                            <div className='services_search_input_field_icon'>
                                <SearchIcon/>
                            </div>
                            <input
                                type="text"
                                placeholder='Все категории'
                                className='services_search_input'
                                value={searchCategory}
                                onChange={(e) => {
                                    setSearchCategory(e.target.value)
                                }}
                            />
                            {searchCategory.length > 0 &&
                                <div
                                    className='input_delete_icon'
                                    onClick={() => {
                                        setSearchCategory('')
                                    }}

                                >
                                    <DeleteAddressIcon/>
                                </div>
                            }


                        </div>
                        <div className='services_filter_item'>
                            <label className='service_label'>
                                <input
                                    type="checkbox"
                                    checked={isCheckedAllCategories}
                                    onChange={handleCheckboxChange}
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

                        <div className='service_category_items_wrapper'>

                            {categoryData && categoryData?.map((item, index) => {
                                return (
                                    <Category
                                        categoryData={item}
                                        selectedCategories={selectedCategories}
                                        setNewSelectedCategories={setNewSelectedCategories}
                                    />
                                )
                            })}

                        </div>
                        <div className='apply_reset_filter_btn_wrapper'>
                            <button
                                onClick={handleUseFilter}
                                className='apply_filter_btn'
                            >
                                Применить
                            </button>
                            <button className='reset_filter_btn'>Сбросить</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
