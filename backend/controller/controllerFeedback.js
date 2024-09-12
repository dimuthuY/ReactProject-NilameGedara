const Feedback = require('../models/modelFeedback');

const getFeedback = (req, res, next) => {
    Feedback.find()
        .then(feedback => {
            res.json({ feedback });
        })
        .catch(error => {
            console.error('Error fetching Feedback:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const createFeedback = (req, res, next) => {
    const { id, name, email, phone, complaint, suggestion, reply } = req.body;

    // if (!id || !name || !email || !phone || !complaint || !suggestion || !reply) {
    //     return res.status(400).json({ error: 'Missing required fields in request body' });
    // }

    const newFeedback = new Feedback({
        id,
        name,
        email,
        phone,
        complaint,
        suggestion,
        reply,
    });

    newFeedback.save()
        .then(feedback => {
            res.json({ feedback });
        })
        .catch(error => {
            console.error('Error adding Feedback:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const updateFeedback = (req, res, next) => {
    const { id, name, email, phone, complaint, suggestion, reply } = req.body;
    
    Feedback.updateOne({ id: id }, { $set: { name: name, email: email, phone:phone, complaint: complaint, suggestion: suggestion, reply:reply  } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const deleteFeedback = (req, res, next) => {
    const id = req.body.id;
    Feedback.deleteOne({id: id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const getMaxId = (req, res, next) => {
    Feedback.find({}, { id: 1 }).sort({ id: -1 }).limit(1)
      .then(response => {
        const maxId = response.length > 0 ? response[0].id : 0;
        res.json({ maxId }); 
      })
      .catch(error => {
        res.json({ error });
      });
  };
module.exports = { getFeedback, createFeedback, updateFeedback, deleteFeedback, getMaxId };
