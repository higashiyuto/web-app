const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
    customerName: {type: String, required: true},
    deviceName:   {type: String, required: true},
    devicePrice:  {type: Number, required: true},
    kaedokiPrice: {type: Number, required: true},
    kaedokiMonthlyPrice: {type: Number, required: true},
    kaedokiCheckbox: {type: Boolean, required: true},
    normalPrice: {type: Number, required: true},
    normalMonthlyPrice: {type: Number, required: true},
    normalCheckbox: {type: Boolean, required: true},
    contractType:{type: String, required: true},
    discountApplied: {type: Boolean, required: true},
    installmentsNum: {type: Number, default: null},
    total: {type: Number, required: true},
});

module.exports = mongoose.model('Estimate', EstimateSchema);