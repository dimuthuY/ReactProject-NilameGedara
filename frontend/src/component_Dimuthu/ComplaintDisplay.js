import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Dimuthu_CSS/ComplaintDisplay.css';
import { useNavigate } from 'react-router-dom';
import { DialogContent } from '@mui/material';

const ComplaintDisplay = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username'); // Session username
    const [selectedReply, setSelectedReply] = useState(null);
    const [View, setView] = useState(false);

    useEffect(() => {
        getComplaint();
    }, []);

    const getComplaint = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/getComplaint');
            if (response.data?.complaints) {
                const userComplaints = response.data.complaints.filter(complaint => complaint.email === username);
                setComplaints(userComplaints);
            } else {
                setComplaints([]);
            }
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };
    console.log(complaints);
    const handleDelete = async (data) => {
        // Show confirmation dialog before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
        if (confirmDelete) {
            try {
                await Axios.post('http://localhost:3001/api/deletecomplaint', data);
                getComplaint(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error Deleting complaints:', error);
            }
        }
    };


    const handleUpdate = (data) => {
        navigate('/ComplaintForm', { state: { data: data } });
    };

    const replyHandle = (reply) => {
        setSelectedReply(reply);
        setView(!View);
    }

    const viewSuggestions = (suggestion) => {
        setSelectedReply(suggestion);
        setView(!View);
    }

    const viewComplaint = (complaint) => {
        setSelectedReply(complaint);
        setView(!View);
    }

    return (
        <div className="complaint-display">
            <div className="complaint-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
                <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a>
                <a href='/ComplaintForm' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Create Complaint</a>
                <a href='/ComplaintDisplay' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Manage Complaint</a>
            </div>

            {View && (
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
                        <th>Complaint</th>
                        <th>Suggestion</th>
                        <th>Action</th>
                        <th>Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(complaint => (
                        <tr key={complaint._id}>
                            <td>{complaint.id}</td>
                            <td>{complaint.name}</td>
                            <td>{complaint.email}</td>
                            <td>{complaint.phone}</td>

                            <td>
                                <button onClick={() => viewComplaint(complaint.complaint)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Complaint
                                </button>
                            </td>

                            <td >
                                <button onClick={() => viewSuggestions(complaint.suggestion)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Suggestions
                                </button>
                            </td>

                            <td>
                                {complaint.reply === null ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleUpdate(complaint)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(complaint)}>Delete</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-button disabled" onClick={() => handleUpdate(complaint)} disabled>Edit</button>
                                        <button className="delete-button disabled" onClick={() => handleDelete(complaint)} disabled>Delete</button>
                                    </>
                                )}
                            </td>


                            <td style={{ width: '20%' }}>
                                {complaint.reply === null ? (
                                    <div>Processing</div>
                                ) : (
                                    <button onClick={() => replyHandle(complaint.reply)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
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

export default ComplaintDisplay;
