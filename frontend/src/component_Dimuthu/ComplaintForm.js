import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import nilame_pic from '../images/Nilame.jpg'
import '../Dimuthu_CSS/ComplaintForm.css'

const ComplaintForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [complaint, setComplaint] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const { data } = location.state ? location.state : { data: null };
    const navigate = useNavigate();
    const handlePhoneNumberChange = (event) => {
        // Remove any non-numeric characters from the input value
        const numericValue = event.target.value.replace(/\D/g, '');
        // Limit the input value to 10 digits
        const limitedPhoneNumber = numericValue.slice(0, 10);
        setPhoneNumber(limitedPhoneNumber);
    };
    const handleNameChange = (event) => {
        const newName = event.target.value;
        // Check if the input contains any numbers
        if (!/\d/.test(newName)) {
            setName(newName); // Update the name state if no numbers are found
        }
    };


    const username = sessionStorage.getItem('username');

    useEffect(() => {
        fetchMaxIdAndSetId();
        setEmail(username);
        if (location.state) {
            setId(data.id);
            setName(data.name);
            setEmail(data.email);
            setPhoneNumber(data.phone);
            setComplaint(data.complaint);
            setSuggestions(data.suggestion);
        }
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (phoneNumber.length == 12) {
            errors.phoneNumber = 'Phone number must be with 12 digits ';
        } else if (!/^\+?\d{8,}$/i.test(phoneNumber)) {
            // Existing validation for invalid characters remains
            errors.phoneNumber = 'Invalid phone number';
        }
        if (!complaint.trim()) {
            errors.complaint = 'Complaint is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (location.state) {
                    console.log("Updated....");
                    const payloadupdate = {
                        id: id,
                        name: name,
                        email: email,
                        phone: phoneNumber,
                        complaint: complaint,
                        suggestion: suggestions,
                    };

                    const response = await Axios.post('http://localhost:3001/api/updateComplaint', payloadupdate);
                    console.log("Complaint updated successfully:", response.data);
                } else {
                    const payload = {
                        id: id,
                        name: name,
                        email: email,
                        phone: phoneNumber,
                        complaint: complaint,
                        suggestion: suggestions,
                        reply: null,
                    };

                    const response = await Axios.post('http://localhost:3001/api/createComplaint', payload);
                    console.log("Complaint submitted successfully:", response.data);
                }
                // Reset form fields after successful submission
                setId('');
                setName('');
                setEmail('');
                setPhoneNumber('');
                setComplaint('');
                setSuggestions('');
                navigate('/ComplaintDisplay');
            } catch (error) {
                console.error("Error submitting complaint:", error);
            }
        }
    };


    const fetchMaxIdAndSetId = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/getmaxid');
            const maxId = response.data?.maxId || 0;
            location.state ? setId(data.id) : setId(maxId + 1);
        } catch (error) {
            console.error('Axios Error (getMaxId): ', error);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${nilame_pic})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%'
        }}>
            <div className="complaint-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
                <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a>
                <a href='/ComplaintForm' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Create Complaint</a>
                <a href='/ComplaintDisplay' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Manage Complaint</a>
            </div>

            <div className="complaint-form-container">
                <h2>Customer Complaint Form</h2>
                <form onSubmit={handleSubmit} className="complaint-form">
                    <div className="form-group">
                        <label>Id:</label>
                        <input
                            type="number"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                        type="text"
                        value={name}
                        onChange={handleNameChange} // Use the handleNameChange function to restrict input
                        required
                    />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        {/* <PhoneInput
                            international
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                            inputStyle={{ width: '100%' }}
                        /> */}
                        <input
                        type="tel" // Use type "tel" for phone numbers
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                        className={errors.phoneNumber ? 'error' : ''} // Add error class if there's an error
                        style={{ width: '100%' }}
                        maxLength={10} // Limit the input to 10 characters
                    />
                        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                    </div>
                    <div className="form-group">
                        <label>Complaint:</label>
                        <textarea
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            required
                        ></textarea>
                        
                    </div>
                    <div className="form-group">
                        <label>Suggestions:</label>
                        <textarea
                            value={suggestions}
                            onChange={(e) => setSuggestions(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">
                        {location.state ? 'Update' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintForm;
