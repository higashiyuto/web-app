/* 
  db.jsの役割
  　・・・ここではMongoDBをmongooseを利用して使用している
*/
const mongoose = require('mongoose');

/*
  async(): 非同期関数(この関数は呼び出されたときにPromiseを返す)
  await  : Promiseが解決(成功)するまで待つという意味
  mongoose.connect : MongoDBに接続するためのメソッドで、Promiseを返す。
  つまりこの関数では、MongoDBに接続できるまで待ち、つながれば
  console出力をする
 */
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Atlasに接続成功');
    }catch(err){
        console.log('MongoDB 接続エラー:', err);
        process.exit(1);
    }
};

module.exports = connectDB;