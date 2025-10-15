// src/components/QRCodeViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewQRCODE = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [error, setError] = useState('');
    const restaurantId = localStorage.getItem("restaurantId");

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                // URL for checking if the QR code exists
                const qrCodeCheckUrl = `http://192.168.228.7:8080/ManageFoodItem/qrCode/${restaurantId}`;
                const response = await axios.get(qrCodeCheckUrl);

                if (response.status === 200) {
                    // Generate the QR code URL to view the food items
                    const qrCodeDataUrl = `http://192.168.228.7:3000/FoodItems/${restaurantId}`;
                    setQrCodeUrl(qrCodeDataUrl);
                } else {
                    setError('QR code not found for this restaurant.');
                }
            } catch (error) {
                setError('No QR code. Please try again later.');
                console.error('Error fetching QR code:', error);
            }
        };

        fetchQRCode();
    }, [restaurantId]);

    return (
        <div>
            {error ? (
                <p style={{ textAlign: "center", color: "black", fontSize: "20px" }}>{error}</p>
            ) : qrCodeUrl ? (
                <div>
                    <h5>Hello, This is Your Restaurant QR CODE. You can scan it to see the Menu Card.</h5>
                    <img src={`http://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeUrl)}`} alt="QR Code" />
                </div>
            ) : (
                <p>Loading QR Code...</p>
            )}
        </div>
    );
};

export default ViewQRCODE;
