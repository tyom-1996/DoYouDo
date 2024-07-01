import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../assets/css/home.css';
import Head from 'next/head';
import { DropDownIcon } from "@/components/icons/DropDownIcon";
import {log} from "next/dist/server/typescript/utils";

export default function Category(props) {
    const [windowHeight, setWindowHeight] = useState(0);
    const [categoryData, setCategoryData] = useState(null);
    const [showSubcategories, setShowSubcategories] = useState(false);

    useEffect(() => {
        setCategoryData(props?.categoryData);
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, [props]); // Add props as dependency to update when props change

    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
    };

    const handleSubcategoryClick = (id) => {
        // Check if id is already in selectedCategories array
        const isSelected = props.selectedCategories.includes(id);

        console.log(isSelected, id)
        if (isSelected) {
            // If id is already in array, remove it
            const updatedCategories = props.selectedCategories.filter(categoryId => categoryId !== id);
            props.setNewSelectedCategories(updatedCategories);
        } else {
            // If id is not in array, add it
            const updatedCategories = [...props.selectedCategories, id];
            props.setNewSelectedCategories(updatedCategories);
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
                    <p className="category_item_title">{categoryData?.filter_category_title}</p>
                    <div
                        className={`category_item_icon ${showSubcategories ? 'category_item_icon_rotate' : 'category_item_icon'}`}
                    >
                        <DropDownIcon />
                    </div>
                </button>
                {showSubcategories &&
                    <div className="category_item_subcategories_list_wrapper">
                        {categoryData?.filter_item_subcategories.map((item, index) => (
                            <div
                                className="category_item_subcategory" key={index}
                                onClick={() => handleSubcategoryClick(item?.id)}
                            >
                                <div
                                    className={`category_item_subcategory_check_box ${props.selectedCategories.includes(item?.id) ? 'active' : ''}`}
                                >
                                    {props.selectedCategories.includes(item?.id) && (
                                        <div className="category_item_subcategory_checked_icon"></div>
                                    )}
                                </div>
                                <p className='category_item_subcategory_title'>{item?.subcategory_name}</p>
                            </div>
                        ))}
                    </div>

                }
            </div>
        </>
    );
}
