import React, { useState } from 'react';
import styles from '../../../assets/css/freelancers_profile_page.css';
import Image from "next/image";

export default function PassportImageUploader() {
    const [userImage, setUserImage] = useState(null);

    const selectImage = async (event) => {
        const files = Array.from(event.target.files);
        const validImage = files.find(file => {
            const fileType = file.type.split('/')[1];
            return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
        });

        if (validImage) {
            const newImage = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(validImage);
            });
            setUserImage(newImage); // Set the new image
        } else {
            alert('Please use correct image format (jpg, jpeg, png)');
        }
    };

    const deleteUserImg = () => {
        setUserImage(null);
    };

    return (
        <div className="container">
            <div className="imageGallery2">
                {userImage && (
                    <div className="imageContainer2">
                        <img
                            src={userImage}
                            alt="User"
                            className="userImage"
                        />
                        <button
                            onClick={deleteUserImg}
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
                )}
            </div>
            <div className='upload_btn'>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-input"
                    onChange={selectImage}
                />
                {!userImage && (
                    <label htmlFor="image-input" className={`uploadButton3`}>
                        <span className="uploadButton_image3">
                            <Image
                                src="/add_passport_img.png"
                                alt="Example Image"
                                layout="fill" // Fill the parent element
                                objectFit="cover" // Cover the area of the parent element
                                quality={100} // Image quality
                            />
                        </span>
                        <span className='image_upload_title3'>Фото Паспорта</span>
                    </label>
                )}
            </div>
        </div>
    );
}
