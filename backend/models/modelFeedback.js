const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    phone: String,
    complaint: String,
    suggestion: String,
    reply: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
