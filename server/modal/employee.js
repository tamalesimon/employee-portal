const mongoose = require('mongoose');

let EmployeeSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    dob: {
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
    nat: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    picture: {
        type: String,
        require: true
    },
    ip_address: {
        type: String,
        require: true
    }
});

let employee = mongoose.model('employees', EmployeeSchema);
module.exports = employee;