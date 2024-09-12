import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Dimuthu_CSS/ComplaintDisplay.css';
import { useNavigate } from 'react-router-dom';
import { DialogContent } from '@mui/material';


const FeedbackDisplay = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');  // Session username
    const [selectedReply, setSelectedReply] = useState(null);
    const [view, setView] = useState(false); // Changed 'View' to 'view'

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/getFeedback');
            console.log(response.data);

            if (response.data?.feedback) {
                const userFeedbacks = response.data.feedback.filter(
                  (feedback) => feedback.email === username
                );
                setFeedbacks(userFeedbacks);
              } else {
                console.log("No feedback data received"); // Informative message
                setFeedbacks([]);
              }
            } catch (error) {
              console.error('Error fetching feedback:', error);
            }
          };

   
      
    const handleDelete = async (data) => {
        try {
            await Axios.post('http://localhost:3001/api/deletefeedback', data);
            setFeedbacks(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error Deleting complaints:', error);
        }
    };

    const handleUpdate = (data) => {
        navigate('/FeedbackForm', { state: { data: data } });
    };

    const replyHandle = (reply) =>{
        setSelectedReply(reply);
        setView(!view); // Changed 'View' to 'view'
    }

    const viewSuggestions = (suggestion) =>{
        setSelectedReply(suggestion);
        setView(!view); // Changed 'View' to 'view'
    }

    const viewFeedback = (complaint) =>{
        setSelectedReply(complaint);
        setView(!view); // Changed 'View' to 'view'
    }

    return (
        <div className="complaint-display">
           <div className="complaint-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
                <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a>
                <a href='/ComplaintForm' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Create Complaint</a>
                <a href='/ComplaintDisplay' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Manage Complaint</a>
            </div>

            {view && ( // Changed 'View' to 'view'
                <div className="popup">
                    <DialogContent className="popup-content">
                        
                    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', marginTop: '10px', minWidth: '300px', minHeight: '150px' }}>
                        {selectedReply}
                    </div>


                        <button onClick={replyHandle} className="cancel-button">Cancel</button>
                        
                    </DialogContent>
                </div>
            )}

            <table className="complaint-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Feedback</th>
                        <th>Suggestion</th>
                        <th>Action</th>
                        <th>Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback,index) => (
                        <tr key={feedback._id}>
                            <td>{feedback.id}</td>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phone}</td>

                            <td>
                                <button onClick={() => viewFeedback(feedback.complaint)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Feedback
                                </button>
                            </td>

                            <td >
                                <button onClick={() => viewSuggestions(feedback.suggestion)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Suggestions
                                </button>
                            </td>

                            <td>
                                {feedback.reply === null ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleUpdate(feedback)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(feedback)}>Delete</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-button disabled" onClick={() => handleUpdate(feedback)} disabled>Edit</button>
                                        <button className="delete-button disabled" onClick={() => handleDelete(feedback)} disabled>Delete</button>
                                    </>
                                )}
                            </td>


                            <td style={{ width: '20%'}}>
                                {feedback.reply === null ? (
                                    <div>Processing</div>
                                ) : (  
                                    <button onClick={() => replyHandle(feedback.reply)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                        View Reply
                                    </button>               
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackDisplay;
