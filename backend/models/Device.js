/* 
    端末の情報を保管しておくデータベース
    この端末情報を変更できるのはdevice-editからのみに限定する
*/
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name:    {type: String, required: true},
    price:   {type: Number, required: true},
    kaedoki: {type: Number, required: true},
    warranty:{type: Number, required: true},
    discount:{
        mnp:    {type: Number, required: true},
        new:    {type: Number, required: true},
        change: {type: Number, required: true},
    }
});

module.exports = mongoose.model('Device', deviceSchema);