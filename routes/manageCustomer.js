let router = require('express').Router();

//customers Schema Imported Here
let customerSchema = require('../Schema/customerSchema');

//Method To Render Manage customers Page
router.get('/manageCustomer', function (req, res) {
    res.render("manageCustomer/index");
});

//Method To Add New customer
router.post('/manageCustomer/addNewCustomer', function (req, res) {
    let newCustomer = new customerSchema(req.body);
    newCustomer.save(function (err, customer) {
        if(err)
            res.sendStatus(500);
        else{
            res.status(201).send(customer);
        }
    })
});

//Method To Get customers List ---[READ]
router.get('/manageCustomer/getCustomerList', function (req, res) {
    customerSchema.find(function (err, customers) {
        if(err)
            res.sendStatus(500);
        else
            res.send(customers);
    })
});

//Method To Update customer Data ---[UPDATE]
router.post('/manageCustomer/editCustomer', function (req, res) {
    customerSchema.findOneAndUpdate({CustomerID: req.body.CustomerID}, {$set: req.body}, function (err, data) {
        if(err)
            res.sendStatus(500);
        else{
            res.sendStatus(201);
        }
    })
});

//Method To Delete customer
router.get('/manageCustomer/deleteCustomer', function (req, res) {
    customerSchema.findOneAndRemove({customerID: parseInt(req.query.customerID)}, function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});


module.exports = router;