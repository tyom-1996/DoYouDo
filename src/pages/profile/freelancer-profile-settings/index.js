import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/freelancers_profile_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Head from 'next/head';
import { useRouter } from 'next/router';
import SettingsImageUploader from '../../includes/SettingsImageUploader'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {FilterCloseIcon} from "@/components/icons/FilterCloseIcon";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";
import {useUpdateProfile} from "@/hooks/useProfileUpdate";
import {useUploadPhoto} from "@/hooks/useUploadPhoto";

const containerStyle = {
    width: '100%',
    height: '518px',
    borderRadius: '15px',
    overflow: 'hidden',
};

const defaultCenter = {
    lat: 55.7558,
    lng: 37.6176,
};


export default function FreelancerProfileSettingsPage () {
    const [windowHeight, setWindowHeight] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedBirthDate, setSelectedBirthDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [gender, setGender] = useState([
        'Женщина',
        'Мужчина',
    ]);
    const [isOpenForGender, setIsOpenForGender] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [showSelectedGender, setShowSelectedGender] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const [foundAddressesBox, setFoundAddressesBox] = useState([]);
    const [showAddressesList, setShowAddressesList] = useState(false);
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { uploadPhoto, uploadPhotoData } = useUploadPhoto();
    const { updateProfile,  updateProfileData } = useUpdateProfile();
    const [experience, setExperience] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const changeImage = (url) => {
        setProfileImage(url);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);
    useEffect(() => {
        if (uploadPhotoData) {
            if (uploadPhotoData?.photoUrl) {
                setProfileImage(uploadPhotoData?.photoUrl)}
        }
    }, [uploadPhotoData])

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };
    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const router = useRouter();

    const redirectFromPortfolioSinglePage = (id) => {
        router.push(`/portfolio/${id}`);
    };
    const redirectToAddProjectPage = () => {
        router.push(`/add-project`);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };
    const handleAboutMeChange = (event) => {
        setAboutMe(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSelectGender = (item) => {
        if (item == 'Мужчина') {
            setSelectedGender('male')
        } else if (item == 'Женщина') {
            setSelectedGender('female')
        }
        setSelectedGender(item);
        setIsOpenForGender(false);
    };
    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    };
    const handleAddressChange = async (newAddress) => {
        setAddress(newAddress);
        if (newAddress.length > 3) {
            await setAddressYandex(newAddress);
        }
    };
    const updateProfileFunction = async () => {
        await updateProfile(name, surname, experience, aboutMe, email, address, latitude, longitude, selectedGender, selectedBirthDate,profileImage )
        await getProfileInfo()
    };

    const redirectToAddPhoneNumber = () => {
        router.push(`/add-phone-number`);
    };
    const redirectToChangePassword = () => {
        router.push(`/change-password`);
    };
    const redirectToDeleteAccount = () => {
        router.push(`/delete-account`);
    };
    const redirectToAddPassport = () => {
        router.push(`/add-passport`);
    };
    const setAddressYandex = async (newAddress) => {
        try {
            const url = `https://geocode-maps.yandex.ru/1.x/?apikey=df8ef3ef-f289-4911-a69d-43ecd8dc6a04&format=json&geocode=${encodeURIComponent(newAddress)}`;
            const response = await fetch(url);
            const data = await response.json();

            const found = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found;

            if (found > 0) {
                const futureMember = data.response.GeoObjectCollection.featureMember;
                const addresses = futureMember.map((item) => {
                    const pos = item.GeoObject.Point.pos;
                    const [lon, lat] = pos.split(' ', 2);
                    return {
                        address: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                    };
                });

                setFoundAddressesBox(addresses);
                setShowAddressesList(true);
            } else {
                console.log("No addresses found.");
                setFoundAddressesBox([]);
                setShowAddressesList(false);
            }
        } catch (error) {
            console.error("Error fetching Yandex geocode:", error);
        }
    };


    const reverseGeocode = async (lat, lon) => {
        try {
            const url = `https://geocode-maps.yandex.ru/1.x/?apikey=df8ef3ef-f289-4911-a69d-43ecd8dc6a04&format=json&geocode=${lon},${lat}`;
            const response = await fetch(url);
            const data = await response.json();
            const found = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found;

            if (found > 0) {
                const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
                setAddress(address);
                // Send the selected address, latitude, and longitude to the parent component
                onSelectAddress({ address, latitude: lat, longitude: lon });
            } else {
                alert("Address not found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const selectAddress = (selectedAddress) => {
        setCoordinates({
            lat: selectedAddress.latitude,
            lng: selectedAddress.longitude,
        });
        setLatitude(selectedAddress.latitude);
        setLongitude(selectedAddress.longitude);
        setAddress(selectedAddress.address);
        setShowAddressesList(false);
        // Send the selected address, latitude, and longitude to the parent component

    };
    useEffect(() => {
        if (profileInfoData) {
            setProfileImage(profileInfoData?.photo)
            setName(profileInfoData.first_name ?? '');
            setSurname(profileInfoData.last_name ?? '');
            setAboutMe(profileInfoData.about_me ?? '');
            setEmail(profileInfoData.email ?? '');
            setPhone(profileInfoData.phone ?? '');
            setSelectedBirthDate(profileInfoData.birth_date ? new Date(profileInfoData.birth_date) : null);
            setAddress(profileInfoData.address ?? '');
            setLatitude(profileInfoData.latitude ?? '');
            setLongitude(profileInfoData.longitude ?? '');
            setShowSelectedGender(profileInfoData.gender === 'male' ? 'Мужчина' : profileInfoData.gender === 'female' ? 'Женщина' : '');
        }
    }, [profileInfoData]);

    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Профиль Исполнителя</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id='freelancer_profile_settings'>
                    <Header activePage={"client_profile_settings"}/>
                    <div className="freelancer_single_page_wrapper" id='freelancer_single_page_wrapper_settings'>
                        <div className="freelancer_single_page_user_info_wrapper">
                            <div className="freelancer_single_page_user_info_wrapper_child"></div>
                            <div className="freelancer_single_page_user_info_wrapper_items_wrapper">
                                <div className="freelancer_single_page_user_info_wrapper_item1">

                                    <SettingsImageUploader changeImage={changeImage} profileImage={profileImage}/>

                                </div>
                                <div className="freelancer_single_page_user_info_wrapper_item2">
                                    <div className="freelancer_single_page_user_info_wrapper_item2_img">

                                        <Image
                                            src="/freelancer_logo_img.png"
                                            alt="Example Image"
                                            layout="fill" // Fill the parent element
                                            objectFit="cover" // Cover the area of the parent element
                                            quality={100} // Image quality
                                        />

                                    </div>
                                    <div className="settings_items_wrapper">
                                        <div className="settings_item">
                                            <p className='settings_item_title'>Личные данные</p>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Имя</p>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={handleNameChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Имя'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Фамилия</p>
                                                <input
                                                    type="text"
                                                    value={surname}
                                                    onChange={handleSurnameChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Фамилия'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Про меня</p>
                                                <textarea
                                                    value={aboutMe}
                                                    onChange={handleAboutMeChange}
                                                    rows="5"
                                                    cols="40"
                                                    placeholder="Про меня"
                                                    className='settings_item_input_field'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Опыт</p>
                                                <input
                                                    type="text"
                                                    value={experience}
                                                    onChange={handleExperienceChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Опыт'
                                                />
                                            </div>
                                            <div className='settings_item_add_passport_title_btn_wrapper'>
                                                <p className='settings_item_add_passport_title'>Пасспорт</p>
                                                {profileInfoData?.passport_verification_status == "no_data" &&
                                                    <button
                                                        className='settings_item_add_passport_btn'
                                                        onClick={() => {
                                                            redirectToAddPassport()
                                                        }}
                                                    >
                                                        Добавить
                                                    </button>

                                                }

                                                {profileInfoData?.passport_verification_status == "unverified" &&
                                                    <button
                                                        className='settings_item_add_passport_btn'
                                                        disabled={true}
                                                        style={{cursor: 'unset'}}
                                                    >
                                                        Ожидает подтверждения
                                                    </button>

                                                }

                                                {profileInfoData?.passport_verification_status == "verified" &&
                                                    <button
                                                        className='settings_item_add_passport_btn'
                                                        disabled={true}
                                                        style={{cursor: 'unset'}}
                                                    >
                                                        Ваш паспорт подтвержден
                                                    </button>

                                                }

                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Дата рождения</p>
                                                <DatePicker
                                                    selected={selectedBirthDate}
                                                    onChange={(date) => setSelectedBirthDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    isClearable
                                                    placeholderText="Выберите дату"
                                                    className='settings_item_input_field'
                                                />
                                            </div>
                                            <div className="settings_dropdown settings_dropdown1">
                                                <p className='settings_dropdown_title'>Пол</p>
                                                <div className="settings_dropdownHeader"
                                                     onClick={() => setIsOpenForGender(!isOpenForGender)}>
                                                    <p className='settings_dropdownHeader_title'>{showSelectedGender || 'Пол'}</p>
                                                    <span className="arrow">
                                                            {isOpenForGender ?
                                                                <div style={{transform: "rotate(-180deg)"}}>
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
                                                {isOpenForGender && (
                                                    <div className="settings_dropdownList settings_dropdownList1">
                                                        {gender.map((item, index) => (
                                                            <p key={index} className="settings_dropdownItem"
                                                               onClick={() => handleSelectGender(item)}>
                                                                {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="settings_dropdown settings_dropdown2">
                                                {/*<p className='settings_dropdown_title'>Город</p>*/}
                                                <div style={{marginBottom: '10px'}}>
                                                    <p className="create_order_map_input_box_title">Адрес</p>
                                                    <div style={{position: 'relative'}}>
                                                        <input
                                                            className='create_order_map_input_field_address'
                                                            value={address}
                                                            onChange={(e) => handleAddressChange(e.target.value)}
                                                            placeholder="Введите адрес"
                                                        />
                                                        {address.length > 0 && (
                                                            <button
                                                                style={
                                                                    {
                                                                        position: 'absolute',
                                                                        zIndex: 9,
                                                                        right: 5,
                                                                        top: 5,
                                                                        background: 'none',
                                                                        border: 'none',
                                                                    }
                                                                }
                                                                onClick={() => setAddress('')}
                                                            >
                                                                <FilterCloseIcon/>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {showAddressesList && (
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        position: 'absolute',
                                                        top: '70px',
                                                        alignSelf: 'center',
                                                        backgroundColor: '#fff',
                                                        zIndex: 99
                                                    }}>
                                                        <ul style={{
                                                            maxHeight: '350px',
                                                            overflowY: 'scroll',
                                                            backgroundColor: '#fff',
                                                            borderColor: '#ccc',
                                                            borderWidth: '1px',
                                                            borderRadius: '4px',
                                                            marginTop: '5px',
                                                            padding: '8px'
                                                        }}>
                                                            {foundAddressesBox.map((item, index) => (
                                                                <li key={index} onClick={() => selectAddress(item)}
                                                                    style={{
                                                                        padding: '10px',
                                                                        borderBottom: '1px solid #ddd',
                                                                        cursor: 'pointer'
                                                                    }}>
                                                                    {item.address}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {/*<div className="settings_dropdownHeader" onClick={() => setIsOpenForCity(!isOpenForCity)}>*/}
                                                {/*    <p className='settings_dropdownHeader_title'>{selectedCity || 'Город'}</p>*/}
                                                {/*    <span className="arrow">*/}
                                                {/*            {isOpenForCity ?*/}
                                                {/*                <div style={{ transform: "rotate(-180deg)" }}>*/}
                                                {/*                        <svg*/}
                                                {/*                            xmlns="http://www.w3.org/2000/svg"*/}
                                                {/*                            width={24}*/}
                                                {/*                            height={24}*/}
                                                {/*                            fill="none"*/}
                                                {/*                        >*/}
                                                {/*                            <path*/}
                                                {/*                                stroke="#333"*/}
                                                {/*                                strokeLinecap="round"*/}
                                                {/*                                strokeLinejoin="round"*/}
                                                {/*                                strokeWidth={1.5}*/}
                                                {/*                                d="m18 9-6 6-1.5-1.5M6 9l2 2"*/}
                                                {/*                            />*/}
                                                {/*                        </svg>*/}
                                                {/*                </div>*/}
                                                {/*                :*/}
                                                {/*                <svg*/}
                                                {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                                                {/*                    width={24}*/}
                                                {/*                    height={24}*/}
                                                {/*                    fill="none"*/}
                                                {/*                >*/}
                                                {/*                    <path*/}
                                                {/*                        stroke="#333"*/}
                                                {/*                        strokeLinecap="round"*/}
                                                {/*                        strokeLinejoin="round"*/}
                                                {/*                        strokeWidth={1.5}*/}
                                                {/*                        d="m18 9-6 6-1.5-1.5M6 9l2 2"*/}
                                                {/*                    />*/}
                                                {/*                </svg>*/}

                                                {/*            }*/}
                                                {/*    </span>*/}
                                                {/* </div>*/}
                                                {/*{isOpenForCity && (*/}
                                                {/*    <div className="settings_dropdownList settings_dropdownList2">*/}
                                                {/*        {city.map((item, index) => (*/}
                                                {/*            <p key={index} className="settings_dropdownItem" onClick={() => handleSelectCity(item)}>*/}
                                                {/*                {item}*/}
                                                {/*            </p>*/}
                                                {/*        ))}*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>

                                        </div>
                                        <div className="settings_item">
                                            <p className='settings_item_title'>Эл. почта и Номер телефона</p>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Эл. почта</p>
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Эл. почта'
                                                />
                                            </div>
                                            <div className='settings_item_input_title_wrapper'>
                                                <p className='settings_item_input_title'>Номер телефона</p>
                                                <input
                                                    type="number"
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    className='settings_item_input_field'
                                                    placeholder='Номер телефона'

                                                />
                                            </div>
                                            {/*<div className='settings_item_add_passport_title_btn_wrapper'>*/}
                                            {/*    <p className='settings_item_add_passport_title'>Номер телефона</p>*/}
                                            {/*    <button*/}
                                            {/*        className='settings_item_add_passport_btn'*/}
                                            {/*        onClick={() => {*/}
                                            {/*            redirectToAddPhoneNumber()*/}
                                            {/*        }}*/}
                                            {/*    >*/}
                                            {/*        Добавить*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>
                                        <button
                                            className='settings_save_btn'
                                            onClick={() => {
                                                updateProfileFunction()
                                            }}
                                        >
                                            Сохранить
                                        </button>
                                        <div className='settings_change_password_delete_profile_btns_wrapper'>
                                            <button
                                                className='settings_change_password_delete_profile_btn'
                                                onClick={() => {
                                                    redirectToChangePassword()
                                                }}
                                            >
                                                Изменить пароль
                                            </button>
                                            <button
                                                className='settings_change_password_delete_profile_btn'
                                                onClick={() => {
                                                    redirectToDeleteAccount()
                                                }}

                                            >
                                                Удалить профиль
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer activePage={"client_profile_settings"}/>

                </div>


            </main>
        </>
    );
}


