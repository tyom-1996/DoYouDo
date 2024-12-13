// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import '../../../assets/css/home.css';
// import Head from 'next/head';
// import { DropDownIcon } from "@/components/icons/DropDownIcon";
// import {log} from "next/dist/server/typescript/utils";
//
// export default function Category(props) {
//     const [windowHeight, setWindowHeight] = useState(0);
//     const [categoryData, setCategoryData] = useState(null);
//     const [showSubcategories, setShowSubcategories] = useState(false);
//
//     useEffect(() => {
//         setCategoryData(props?.categoryData);
//         if (typeof window !== 'undefined') {
//             setWindowHeight(window.innerHeight);
//         }
//     }, [props]); // Add props as dependency to update when props change
//
//     const toggleSubcategories = () => {
//         setShowSubcategories(!showSubcategories);
//     };
//
//     const handleSubcategoryClick = (id) => {
//         alert('selected')
//         // Check if id is already in selectedCategories array
//         const isSelected = props.selectedCategories.includes(id);
//
//         console.log(isSelected, id)
//         if (isSelected) {
//             // If id is already in array, remove it
//             const updatedCategories = props.selectedCategories.filter(categoryId => categoryId !== id);
//             props.setNewSelectedCategories(updatedCategories);
//         } else {
//             // If id is not in array, add it
//             const updatedCategories = [...props.selectedCategories, id];
//             props.setNewSelectedCategories(updatedCategories);
//         }
//     };
//
//
//     return (
//         <div className='category_item'>
//                 <button
//                     className="category_item_title_icon_wrapper"
//                     onClick={toggleSubcategories}
//                 >
//                     <p className="category_item_title">{categoryData?.name}</p>
//                     <div
//                         className={`category_item_icon ${showSubcategories ? 'category_item_icon_rotate' : 'category_item_icon'}`}
//                     >
//                         <DropDownIcon />
//                     </div>
//                 </button>
//                 {showSubcategories &&
//                     <div className="category_item_subcategories_list_wrapper">
//                         {categoryData?.subcategories.map((item, index) => (
//                             <div
//                                 className="category_item_subcategory" key={index}
//                                 onClick={() => handleSubcategoryClick(item?.id)}
//                             >
//                                 <div
//                                     className={`category_item_subcategory_check_box ${props.selectedCategories.includes(item?.id) ? 'active' : ''}`}
//                                 >
//                                     {props.selectedCategories.includes(item?.id) && (
//                                         <div className="category_item_subcategory_checked_icon"></div>
//                                     )}
//                                 </div>
//                                 <p className='category_item_subcategory_title'>{item?.name}</p>
//                             </div>
//                         ))}
//                     </div>
//
//                 }
//             </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { DropDownIcon } from '@/components/icons/DropDownIcon'; // Adjust the import path based on your structure

export default function Category({ categoryData, selectedCategories, setNewSelectedCategories }) {
    const [showSubcategories, setShowSubcategories] = useState(false);

    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
    };

    const handleSubcategoryClick = (id) => {
        setNewSelectedCategories(id); // Pass the selected subcategory ID to the parent handler
    };

    return (
        <div className="category_item">
            <button
                className="category_item_title_icon_wrapper"
                onClick={toggleSubcategories}
            >
                <p className="category_item_title">{categoryData?.name}</p>
                <div
                    className={`category_item_icon ${
                        showSubcategories ? 'category_item_icon_rotate' : ''
                    }`}
                >
                    <DropDownIcon />
                </div>
            </button>
            {showSubcategories && (
                <div className="category_item_subcategories_list_wrapper">
                    {categoryData?.subcategories.map((item) => (
                        <div
                            className="category_item_subcategory"
                            key={item.id}
                            onClick={() => handleSubcategoryClick(item?.id)}
                        >
                            <div
                                className={`category_item_subcategory_check_box ${
                                    selectedCategories.includes(item?.id) ? 'active' : ''
                                }`}
                            >
                                {selectedCategories.includes(item?.id) && (
                                    <div className="category_item_subcategory_checked_icon"></div>
                                )}
                            </div>
                            <p className="category_item_subcategory_title">{item?.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
