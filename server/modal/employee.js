const mongoose = require('mongoose');

let EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

let employee = mongoose.model('employees', EmployeeSchema);
module.exports = employee;