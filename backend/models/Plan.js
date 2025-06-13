const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name:    {type: String, required: true},
    version: {type: String, enum: ['old', 'new'], required: true},
    tiers: [
        {
            range: {type: String, required: true},
            price: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('Plan', PlanSchema);