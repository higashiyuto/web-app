const mongoose = require('mongoose');
const Plan = require('../models/Plan');
require('dotenv').config({path: '../../../.env' });

console.log('MONGO_URL:', process.env.MONGO_URL);

const newPlans = [
    {
        name: 'ドコモポイ活MAX',
        version: 'new',
        tiers: [
            {range: '無制限', price: 11748}
        ]
    },
    {
        name: 'ドコモポイ活20',
        version: 'new',
        tiers: [
            {range: '~20GB', price: 7898}
        ]
    },
    {
        name: 'ドコモMAX',
        version: 'new',
        tiers: [
            {range: '~1GB', price: 5000},
            {range: '1~3GB', price: 6000},
            {range: '無制限', price: 7000}
        ]
    },
    {
        name: 'ドコモmini',
        version: 'new',
        tiers: [
            {range: '4GB', price: 2000},
            {range: '10GB', price: 3000},
        ]
    },
    {
        name: 'ahamo',
        version: 'new',
        tiers: [
            {range: '30GB', price: 2970},
            {range: '110GB', price: 4980},
        ]
    }
];

async function seedNewPlans() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Plan.deleteMany({ version: 'new' });
    await Plan.insertMany(newPlans);
    console.log('✅ New plans seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedNewPlans();