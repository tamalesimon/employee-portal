const express = require('express');
const { request, response } = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const employee = require('../modal/employee');


/*
Get all employees
URL http:127.0.0.1:5000/api/employees
Method : Get 
*/

router.get('/employees', async(request, response) => {

    try {
        let employees = await employee.find();
        response.status(200).json(employees);
    } catch (err) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        });
    }
});

/*
GET a Single Employee
URL : http://127.0.0.1:5000/api/employees/:id
Method : GET
*/

router.get('/employees/:id', async(request, response) => {
    let employeeId = request.params.id;
    try {
        let oneEmployee = await employee.findById(employeeId);
        response.status(200).json(oneEmployee);
    } catch (error) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        })

    }
});

/*  CREATE a new Employee
    URL : http://127.0.0.1:5000/api/employees/
    Method : POST
 */

router.post('/employees', async(request, response) => {
    let newEmployee = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        dob: request.body.dob,
        email: request.body.email,
        gender: request.body.gender,
        phone: request.body.phone,
        picture: request.body.picture,
        nationality: request.body.nationality,
        ip_address: request.body.ip_address,

    };
    try {
        let employeeNew = new employee(newEmployee);
        await employeeNew.save();
        response.status(200).json({
            msg: 'New Employee is created'
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        });
    }

});

/*  UPDATE an existing Employee
    URL : http://127.0.0.1:5000/api/employees/:id
    Method : PUT
 */

router.put('/employees/:id', async(request, response) => {
    let employeeId = request.params.id;
    let updatedEmployee = {
        first: request.body.first,
        last: request.body.last,
        dob: request.body.dob,
        email: request.body.email,
        gender: request.body.gender,
        phone: request.body.phone,
        picture: request.body.picture,
        nat: request.body.nat,
        ip_address: request.body.ip_address,
    };

    try {
        let employeeUpdate = await employee.findById(employeeId);
        if (!empty) {
            return response.status(400).json({ msg: 'No employee found' });
        }
        employeeUpdate.findByIdUpdate(employeeId, {
            $set: updatedEmployee
        });
        response.status(200).json({
            msg: 'Employee data updated'
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        });

    }

});

/*  DELETE an existing Employee
    URL : http://127.0.0.1:5000/api/employees/:id
    Method : DELETE
 */
router.delete('/employees/:id', async(request, response) => {
    let employeeId = request.params.id;
    try {
        await employee.findByIdAndDelete(employeeId);
        response.status(200).json({
            msg: 'Employee data is Deleted'
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        });
    }
});



module.exports = router;