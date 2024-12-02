import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ["places"];

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 55.7558, // Default latitude for the map
    lng: 37.6176, // Default longitude for the map
};

const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key

const FilterMap = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(center); // Center of the map
    const [marker, setMarker] = useState(center); // Position of the marker
    const [foundAddresses, setFoundAddresses] = useState([]);
    const [showAddressesList, setShowAddressesList] = useState(false);

    // Function to handle address search using Google Geocoding API
    const searchAddress = async (query) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: query,
                        key: apiKey,
                    },
                }
            );
            const results = response.data.results;
            const addresses = results.map((result) => ({
                address: result.formatted_address,
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng,
            }));
            setFoundAddresses(addresses);
            setShowAddressesList(true);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const handleAddressChange = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        if (newAddress.length > 3) {
            searchAddress(newAddress);
        }
    };

    const selectAddress = (selectedAddress) => {
        setCoordinates({
            lat: selectedAddress.lat,
            lng: selectedAddress.lng,
        });
        setMarker({
            lat: selectedAddress.lat,
            lng: selectedAddress.lng,
        });
        setAddress(selectedAddress.address);
        setShowAddressesList(false);
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
    };

    // Function to reverse geocode coordinates back to an address
    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        latlng: `${lat},${lng}`,
                        key: apiKey,
                    },
                }
            );
            const results = response.data.results;
            if (results.length > 0) {
                setAddress(results[0].formatted_address);
            } else {
                alert('No address found');
            }
        } catch (error) {
            console.error('Error fetching reverse geocode:', error);
        }
    };

    if (loadError) return <div>Error loading map</div>;
    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter an address"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {showAddressesList && (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {foundAddresses.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => selectAddress(item)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    backgroundColor: '#f0f0f0',
                                    borderBottom: '1px solid #ccc',
                                }}
                            >
                                {item.address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={mapContainerStyle}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={coordinates}
                    onClick={handleMapClick}
                >
                    <Marker position={marker} />
                </GoogleMap>
            </div>
        </div>
    );
};

export default FilterMap;
