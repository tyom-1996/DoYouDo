import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useUploadPhoto } from "@/hooks/useUploadPhoto";
import {useRouter} from "next/router";

export default function PassportImageUploader({setPassportImage}) {
    const [userImage, setUserImage] = useState(null);
    const { uploadPhoto, uploadPhotoData, loadingUpload } = useUploadPhoto();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);


    const router = useRouter();
    useEffect(() => {
        if (uploadPhotoData?.photoUrl) {
            setUserImage(uploadPhotoData?.photoUrl);
            setPassportImage(uploadPhotoData?.photoUrl);

        }
    }, [uploadPhotoData]);


    const selectImage = async (event) => {
        const files = Array.from(event.target.files);
        const validImage = files.find(file => {
            const fileType = file.type.split('/')[1];
            return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
        });

        if (validImage) {
            setUserImage(URL.createObjectURL(validImage)); // Show preview while uploading
            await uploadPhoto(validImage); // Upload image to API
        } else {
            alert('Please use correct image format (jpg, jpeg, png)');
        }
    };


    const deleteUserImg = () => {
        setUserImage(null);
        setPassportImage(null); // Clear parent state
    };

    return (
        <div className="container">
            <div className="imageGallery2">
                {userImage && (
                    <div className="imageContainer2">
                        <img
                            src={`${imagePath}${userImage}`}
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
                        {loadingUpload ? (
                            <span className="image_upload_title3">Загрузка...</span>
                        ) : (
                            <>
                                <span className="uploadButton_image3">
                                    <Image
                                        src="/add_passport_img.png"
                                        alt="Example Image"
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                    />
                                </span>
                                <span className='image_upload_title3'>Фото Паспорта</span>
                            </>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
}
