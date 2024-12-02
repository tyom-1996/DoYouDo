import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FilterCloseIcon } from "@/components/icons/FilterCloseIcon";
import '../../assets/css/create_order.css';

// Load GoogleMap dynamically to prevent SSR issues
const GoogleMap = dynamic(() => import('@react-google-maps/api').then((mod) => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import('@react-google-maps/api').then((mod) => mod.Marker), { ssr: false });
const LoadScript = dynamic(() => import('@react-google-maps/api').then((mod) => mod.LoadScript), { ssr: false });

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

const FilterMap = ({ onSelectAddress }) => {
    const mapRef = useRef(null);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const [foundAddressesBox, setFoundAddressesBox] = useState([]);
    const [showAddressesList, setShowAddressesList] = useState(false);
    const router = useRouter();

    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'AIzaSyAvTddoHzPpejdOPc3kX6-EBvZcAmD_sFg';

    // Ensure geolocation is used only in the browser
    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleAddressChange = async (newAddress) => {
        setAddress(newAddress);
        if (newAddress.length > 3) {
            await setAddressYandex(newAddress);
        }
    };

    const setAddressYandex = async () => {
        try {
            const url = `https://geocode-maps.yandex.ru/1.x/?apikey=ed170562-fba8-4475-84f5-8940538e66e2&format=json&geocode=${encodeURIComponent(address)}`;
            const response = await fetch(url);
            const data = await response.json();
            const found = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found;

            let addresses = [];
            if (found > 0) {
                const futureMember = data.response.GeoObjectCollection.featureMember;
                for (let i = 0; i < futureMember.length; i++) {
                    const pos = futureMember[i].GeoObject.Point.pos;
                    const [lon, lat] = pos.split(' ', 2);
                    addresses.push({
                        address: futureMember[i].GeoObject.metaDataProperty.GeocoderMetaData.text,
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                    });
                }
            }
            setFoundAddressesBox(addresses);
            setShowAddressesList(true);
        } catch (error) {
            console.log(error);
        }
    };

    const reverseGeocode = async (lat, lon) => {
        try {
            const url = `https://geocode-maps.yandex.ru/1.x/?apikey=ed170562-fba8-4475-84f5-8940538e66e2&format=json&geocode=${lon},${lat}`;
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
        setAddress(selectedAddress.address);
        setShowAddressesList(false);
        // Send the selected address, latitude, and longitude to the parent component
        onSelectAddress({
            address: selectedAddress.address,
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
        });
    };

    const handleMapClick = (event) => {
        const { lat, lng } = event.latLng.toJSON();
        setCoordinates({ lat, lng });
        reverseGeocode(lat, lng);
    };

    const goBack = () => {
        router.back();
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ marginBottom: '10px' }}>
                <p className="create_order_map_input_box_title">Адрес</p>
                <div style={{ position: 'relative' }}>
                    <input
                        className='create_order_map_input_field_address'
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="Введите адрес"
                    />
                    {address.length > 0 && (
                        <button
                            style={
                                { position: 'absolute', zIndex: 9, right: 5, top: 5, background: 'none', border: 'none', }
                            }
                            onClick={() => setAddress('')}
                        >
                            <FilterCloseIcon />
                        </button>
                    )}
                </div>
            </div>

            {showAddressesList && (
                <div style={{ width: '97%', height: '100%', position: 'absolute', top: '121px', alignSelf: 'center', backgroundColor: '#fff', zIndex: 99 }}>
                    <ul style={{ maxHeight: '350px', overflowY: 'scroll', backgroundColor: '#fff', borderColor: '#ccc', borderWidth: '1px', borderRadius: '4px', marginTop: '5px', padding: '8px' }}>
                        {foundAddressesBox.map((item, index) => (
                            <li key={index} onClick={() => selectAddress(item)} style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
                                {item.address}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={containerStyle}>
                <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>

                    <GoogleMap
                        // extraMapTypes={['terrain']}
                        mapContainerStyle={containerStyle}
                        center={coordinates}
                        zoom={12}
                        onClick={handleMapClick}
                        onLoad={(map) => (mapRef.current = map)}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>

                </LoadScript>
            </div>
        </div>
    );
};

export default FilterMap;