var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var customerSchema = mongoose.Schema({
    ContactNumber: {type: String, unique: "customer With This Contact Number Already Exist"},
    EmailID: {type: String, unique: "customer With This Email ID Already Exist"},
    Password: String,
    customerTypeID: Number,
    customerName: {type: String, unique: "customer With Same customerName Already Exist"},
    IsVerified: {type: Boolean, default: false}
});

//Validate Data
customerSchema.plugin(validator);

//Add Auto Increment To Event ID
customerSchema.plugin(AutoIncrement, {
    modelName: 'customers',
    type: Number,
    unique: true,
    fieldName: 'customerID'
});


module.exports = mongoose.model('customer', customerSchema);