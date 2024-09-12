import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Dimuthu_CSS/AdminComplaintDisplayCSS.css';
import { DialogContent } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View,Image } from '@react-pdf/renderer';
import logoImage from '../images/nilameLogo.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    fontSize: 15,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  complaint: {
    marginBottom: 10,
  },
  logo: {
    width:100,
    height:100,
    marginBottom:2,
  }
});

const ComplaintsDocument = ({ complaints }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logoImage} style={styles.logo}/>
        <View style={styles.header}>
          <Text style={styles.headerText}>Date:{currentDate}</Text>
          <Text style={styles.headerText}>Time:{currentTime}</Text>
        </View>
        <Text style={[styles.title, { color: 'blue' }]}>Complaints Report</Text>
        {complaints.map((complaint, index) => (
          <React.Fragment key={index}>
            <Text style={styles.complaint}>ID: {complaint.id}</Text>
            <Text style={styles.complaint}>Name: {complaint.name}</Text>
            <Text style={styles.complaint}>Email: {complaint.email}</Text>
            <Text style={styles.complaint}>Complaint: {complaint.complaint}</Text>
            <Text style={styles.complaint}>Suggestion: {complaint.suggestion}</Text>
            <Text>-----------------------------------------------------------------------</Text>
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );
};

const ComplaintsPDF = ({ filteredComplaints }) => (
  <div>
    <PDFDownloadLink document={<ComplaintsDocument complaints={filteredComplaints} />} fileName="complaints.pdf">
      {({ blob, url, loading, error }) => (
        <button style={{ backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '10px' }}>
          {loading ? 'Loading document...' : 'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);

const AdminComplaintDisplay = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [Replyform, setReplyform] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedReply, setSelectedReply] = useState(null);
  const [replyMessage, setReplyMessaget] = useState('');
  const [View, setView] = useState(false);

  useEffect(() => {
    getComplaint();
  }, []);

  const getComplaint = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getComplaint');
      setComplaints(response.data?.complaints || []);
      setFilteredComplaints(response.data?.complaints || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const replyHandle = (id) => {
    setSelectedId(id);
    setReplyform(!Replyform);
  };

  const replyView = (reply) => {
    setSelectedReply(reply);
    setView(!View);
  };

  const viewSuggestions = (suggestions) => {
    setSelectedReply(suggestions);
    setView(!View);
  };

  const viewComplaint = (complaint) => {
    setSelectedReply(complaint);
    setView(!View);
  };

  const sendReply = () => {
    console.log(selectedId);
    console.log(replyMessage);

    const payloadupdate = {
      id: selectedId,
      reply: replyMessage,
    };

    Axios.post('http://localhost:3001/api/updateComplaint', payloadupdate)
      .then((response) => {
        console.log("Complaint submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
      });
    alert("Reply send Successfully ..!");
    window.location.reload();
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filtered = complaints.filter(complaint =>
      complaint.id.toString().includes(searchTerm) || complaint.email.toLowerCase().includes(searchTerm)
    );
    setFilteredComplaints(filtered);
  };

  return (
    <div className="complaint-display">
      <div className="complaint-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>

        <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a> <br></br>

        <input
          type="text"
          placeholder="Search by ID or Email"
          value={searchInput}
          onChange={handleSearch}
          className="search-bar"
        />
        <ComplaintsPDF filteredComplaints={filteredComplaints} />
      </div>

      {Replyform && (
        <div className="popup">
          <DialogContent className="popup-content">
            <div>Complaint id : {selectedId}</div>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessaget(e.target.value)}
              required
              className="popup-textarea"
              placeholder="Enter your reply..."
            ></textarea><br></br>
            <button onClick={sendReply} className="send-button">Send</button>
            <button onClick={replyHandle} className="cancel-button">Cancel</button>
          </DialogContent>
        </div>
      )}

      {View && (
        <div className="popup">
          <DialogContent className="popup-content">
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', marginTop: '10px', minWidth: '300px', minHeight: '150px' }}>
              {selectedReply}
            </div>
            <button onClick={replyView} className="cancel-button">Cancel</button>
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
            <th>Reply Message</th>
            <th>View Reply Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map(complaint => (
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
              <td>
                <button onClick={() => viewSuggestions(complaint.suggestion)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                  View Suggestions
                </button>
              </td>
              <td>
                {complaint.reply === null ? (
                  <button onClick={() => replyHandle(complaint.id)} style={{ backgroundColor: '#ff0404', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                    Reply
                  </button>
                ) : (
                  <div>sent</div>
                )}
              </td>
              <td>
                {complaint.reply === null ? (
                  <div>No reply</div>
                ) : (
                  <button onClick={() => replyView(complaint.reply)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                    View
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

export default AdminComplaintDisplay;
