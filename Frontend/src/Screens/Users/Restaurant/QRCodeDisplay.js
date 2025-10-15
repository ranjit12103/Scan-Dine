// src/QRCodeDisplay.js

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeDisplay = () => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const qrCodeUrl = 'http://192.168.228.7:3000/FoodItems';

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const dataUrl = await QRCode.toDataURL(qrCodeUrl);
                setQrCodeDataUrl(dataUrl);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };

        generateQRCode();
    }, [qrCodeUrl]);

    return (
        <div>
            <h2>Scan this QR code to view food items:</h2>
            {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR Code" />}
        </div>
    );
};

export default QRCodeDisplay;
