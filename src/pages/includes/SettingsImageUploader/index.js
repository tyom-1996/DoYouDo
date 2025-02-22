import React, { useState, useEffect } from 'react';
import { useUploadPhoto } from "@/hooks/useUploadPhoto";

export default function SettingsImageUploader({ changeImage, profileImage }) {
    const [userImage, setUserImage] = useState(profileImage || '');
    const { uploadPhoto, uploadPhotoData, loadingUpload } = useUploadPhoto();
    const [imagePath] = useState(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const selectImage = async (event) => {
        const file = event.target.files[0];
        if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
            const newImage = URL.createObjectURL(file);
            setUserImage(newImage);  // Set preview image before uploading

            await uploadPhoto(file); // Upload image
        } else {
            alert('Please use a valid image format (jpg, jpeg, png)');
        }
    };

    useEffect(() => {
        if (uploadPhotoData?.photoUrl) {
            console.log()
            changeImage(uploadPhotoData.photoUrl);  // Update the parent component
            setUserImage(uploadPhotoData.photoUrl); // Set the uploaded image
        }
    }, [uploadPhotoData]);
    const getFullImageUrl = () => {
        if (userImage) {
            return userImage.startsWith('http') ? userImage : `${imagePath}${userImage}`;
        }
        if (profileImage) {
            return profileImage.startsWith('http') ? profileImage : `${imagePath}${profileImage}`;
        }
        return '/default-avatar.png'; // Fallback image
    };


    return (
        <div className="container_settings">
            <div className="imageGallery_settings">
                <div className="imageContainer_settings">
                    <img src={getFullImageUrl()} alt="User" className="userImage"/>
                </div>
                <div className='upload_btn'>
                <input
                        type="file"
                        accept="image/jpeg, image/png"
                        style={{ display: 'none' }}
                        id="image-input"
                        onChange={selectImage}
                    />
                    <label htmlFor="image-input" className="uploadButton2">
                        {loadingUpload ? <span>Uploading...</span> : <span className='image_upload_title2'>Добавить фото</span>}
                    </label>
                </div>
            </div>
        </div>
    );
}
