import React, { useState } from 'react';
import styles from '../../../assets/css/freelancers_profile_page.css';
import Image from "next/image";

export default function SettingsImageUploader() {
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

    return (
        <div className="container">
            <div className="imageGallery">
                {userImage && (
                    <div className="imageContainer">
                        <img
                            src={userImage}
                            alt="User"
                            className="userImage"
                        />
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
                <label htmlFor="image-input" className="uploadButton2">
                    <span className={`uploadButton_image2 ${userImage ? 'hidden' : ''}`}>
                        <Image
                            src="/upload_img1.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                    </span>
                    <span className='image_upload_title2'>Добавить фотографию</span>
                </label>
            </div>
        </div>
    );
}
