const Complaint = require('../models/modelComplaint');



const getComplaint = (req, res, next) => {
    Complaint.find()
        .then(complaints => {
            res.json({ complaints });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const createComplaint = (req, res, next) => {
    const { id, name, email, phone, complaint, suggestion, reply } = req.body;

    // if (!id || !name || !email || !phone || !complaint || !suggestion || !reply) {
    //     return res.status(400).json({ error: 'Missing required fields in request body' });
    // }

    const newComplaint = new Complaint({
        id,
        name,
        email,
        phone,
        complaint,
        suggestion,
        reply,
    });

    newComplaint.save()
        .then(complaint => {
            res.json({ complaint });
        })
        .catch(error => {
            console.error('Error adding complaint:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const updateComplaint = (req, res, next) => {
    const { id, name, email, phone, complaint, suggestion, reply } = req.body;
    
    Complaint.updateOne({ id: id }, { $set: { name: name, email: email, phone:phone, complaint: complaint, suggestion: suggestion, reply:reply  } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const deleteComplaint = (req, res, next) => {
    const id = req.body.id;
    Complaint.deleteOne({id: id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const getMaxId = (req, res, next) => {
    Complaint.find({}, { id: 1 }).sort({ id: -1 }).limit(1)
      .then(response => {
        const maxId = response.length > 0 ? response[0].id : 0;
        res.json({ maxId }); 
      })
      .catch(error => {
        res.json({ error });
      });
  };
module.exports = { getComplaint, createComplaint, updateComplaint, deleteComplaint, getMaxId };
