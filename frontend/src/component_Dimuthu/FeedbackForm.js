import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import nilame_pic from '../images/Nilame.jpg'
import '../Dimuthu_CSS/ComplaintForm.css'

const ComplaintForm = (updatedata) => {
    const [id, setId] = useState();
    const [name, setName] = useState('');

    
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [complaint, setComplaint] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const location = useLocation();
    const { data } = location.state ? location.state : { data: null };
    const navigate = useNavigate();

    const username = sessionStorage.getItem('username')
    console.log(username);
    

   // console.log(location.state ? data.id : 'no');

   useEffect(() => {
    fetchMaxIdAndSetId();
    setEmail(username);
        if(location.state){
            setId(data.id);
            setName(data.name);
            setEmail(data.email);
            setPhoneNumber(data.phone);
            setComplaint(data.complaint);
            setSuggestions(data.suggestion);
        }
}, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(location.state){
            console.log("Updated....");
            const payloadupdate = {
                id: id,
                name: name,
                email: email,
                phone: phoneNumber,
                complaint: complaint,
                suggestion: suggestions,
            };

            Axios.post('http://localhost:3001/api/updatefeedback', payloadupdate)
                .then((response) => {
                    console.log("Feedback submitted successfully:", response.data);
                    // Reset form fields after successful submission
                    setId('');
                    setName('');
                    setEmail('');
                    setPhoneNumber('');
                    setComplaint('');
                    setSuggestions('');
                    navigate('/FeedbackDisplay');
                })
                .catch((error) => {
                    console.error("Error submitting Feedback:", error);
                });

                
        }
        else{
            const payload = {
                id: id,
                name: name,
                email: username,
                phone: phoneNumber,
                complaint: complaint,
                suggestion: suggestions,
                reply: null,
            };
    
            Axios.post('http://localhost:3001/api/createfeedback', payload)
                .then((response) => {
                    console.log("Complaint submitted successfully:", response.data);
                    // Reset form fields after successful submission
                    setId('');
                    setName('');
                    setEmail('');
                    setPhoneNumber('');
                    setComplaint('');
                    setSuggestions('');
                    navigate('/FeedbackDisplay');
                })
                .catch((error) => {
                    console.error("Error submitting complaint:", error);
                });
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
            backgroundSize: 'cover',              // Ensures the background covers the div
            backgroundRepeat: 'no-repeat',        // No repeating of the image
            backgroundPosition: 'center',         // Centers the background image
            height: '100vh',                      // Full viewport height
            width: '100%'                         // Full width
        }}>

            <div className="complaint-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
                <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a>
                <a href='/ComplaintForm' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Create Feedback</a>
                <a href='/ComplaintDisplay' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Manage Feedback</a>
            </div>
        
        <div className="complaint-form-container">


            <h2>Customer Feedback Form</h2>
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
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                        <label>Phone Number:</label>
                        <PhoneInput
                            international
                            value={phoneNumber.toString()}
                            onChange={setPhoneNumber}
                            required
                            inputStyle={{ width: '100%' }}
                        />

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

