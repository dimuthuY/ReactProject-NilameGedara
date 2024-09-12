const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    phone: String,
    complaint: String,
    suggestion: String,
    reply: String,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
