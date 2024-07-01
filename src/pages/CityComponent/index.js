import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/home.css';
import Head from 'next/head';
import { DropDownIcon } from "@/components/icons/DropDownIcon";

export default function City({cityData, selectedCities, setNewSelectedCities}) {

    const [windowHeight, setWindowHeight] = useState(0);
    const [showSubcategories, setShowSubcategories] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []); // Add props as dependency to update when props change

    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
    };

    const handleSubcategoryClick = (id) => {
        // Check if id is already in selectedCategories array
        const isSelected = selectedCities.includes(id);

        console.log(isSelected, id)
        if (isSelected) {
            // If id is already in array, remove it
            const updatedCities = selectedCities.filter(cityId => cityId !== id);
            setNewSelectedCities(updatedCities);
        } else {
            // If id is not in array, add it
            const updatedCities = [...selectedCities, id];
            setNewSelectedCities(updatedCities);
        }
    };


    return (
        <>
            <Head>
                {/*<title>Главная страница</title>*/}
                <meta name="dwsdwdwd" content="This is the home page" />
            </Head>
            <div className='category_item'>
                <button
                    className="category_item_title_icon_wrapper"
                    onClick={toggleSubcategories}
                >
                    <p className="category_item_title">Выбор города</p>
                    <div
                        className={`category_item_icon ${showSubcategories ? 'category_item_icon_rotate' : 'category_item_icon'}`}
                    >
                        <DropDownIcon />
                    </div>
                </button>
                {showSubcategories &&
                    <div className="category_item_subcategories_list_wrapper">
                        {cityData.map((item, index) => (
                            <div
                                className="category_item_subcategory" key={index}
                                onClick={() => handleSubcategoryClick(item?.id)}
                            >
                                <div
                                    className={`category_item_subcategory_check_box ${selectedCities.includes(item?.id) ? 'active' : ''}`}
                                >
                                    {selectedCities.includes(item?.id) && (
                                        <div className="category_item_subcategory_checked_icon"></div>
                                    )}
                                </div>
                                <p className='category_item_subcategory_title'>{item?.city_name}</p>
                            </div>
                        ))}
                    </div>

                }
            </div>
        </>
    );
}
