import React, { useState } from 'react';
import '../Admin/Styles/AdminChangePassword.css'; 

const AdminChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match!');
            return;
        }

        // Replace with actual password change logic
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);

        // Reset form fields and show success message
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setError('');
        setSuccess('Password changed successfully!');
    };

    return (
        <div className="admin-change-password-container">
            <h5 className="admin-change-password-title">Change Password</h5>
            {error && <div className="admin-change-password-error">{error}</div>}
            {success && <div className="admin-change-password-success">{success}</div>}
            <form onSubmit={handleSubmit} className="admin-change-password-form">
                <div className="admin-change-password-form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="admin-change-password-form-control"
                        placeholder="Enter your old password"
                        required
                    />
                </div>
                <div className="admin-change-password-form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="admin-change-password-form-control"
                        placeholder="Enter your new password"
                        required
                    />
                </div>
                <div className="admin-change-password-form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="admin-change-password-form-control"
                        placeholder="Re-enter your new password"
                        required
                    />
                </div>
                <button type="submit" className="admin-change-password-btn-primary">Change Password</button>
            </form>
        </div>
    );
};

export default AdminChangePassword;
