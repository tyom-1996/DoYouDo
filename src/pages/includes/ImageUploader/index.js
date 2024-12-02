import React, { useState } from 'react';
import styles from '../../../assets/css/create_order.css';
import Image from "next/image";

export default function ImageUploader({ onImagesUpdate }) {
    const [userImages, setUserImages] = useState([]);

    const selectImages = async (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter(file => {
            const fileType = file.type.split('/')[1];
            return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
        });

        if (validImages.length > 0) {
            const newImages = await Promise.all(validImages.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            }));
            const updatedImages = [...userImages, ...newImages];
            setUserImages(updatedImages);

            // Send updated images to parent component
            onImagesUpdate(updatedImages);
        } else {
            alert('Please use correct image format (jpg, jpeg, png)');
        }
    };

    const deleteUserImg = (index) => {
        const updatedImages = userImages.filter((_, i) => i !== index);
        setUserImages(updatedImages);

        // Send updated images to parent component
        onImagesUpdate(updatedImages);
    };

    return (
        <div className="container">
            <div className="imageGallery">
                {userImages.map((image, index) => (
                    <div key={index} className="imageContainer">
                        <img
                            src={image}
                            alt={`User ${index}`}
                            className="userImage"
                        />
                        <button
                            onClick={() => deleteUserImg(index)}
                            className="deleteButton"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                            >
                                <rect width={24} height={24} fill="#fff" rx={7} />
                                <path
                                    fill="red"
                                    d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.997.997 0 0 0 5.7 7.11L10.59 12 5.7 16.89a.998.998 0 0 0 1.41 1.41L12 13.41l4.89 4.89a.997.997 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <div className='upload_btn'>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    id="image-input"
                    onChange={selectImages}
                />
                <label htmlFor="image-input" className="uploadButton">
                   <span className='uploadButton_image'>
                        <Image
                            src="/upload_img.png"
                            alt="Example Image"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                   </span>
                    <span className='image_upload_title'>Добавить</span>
                </label>
            </div>
        </div>
    );
}
