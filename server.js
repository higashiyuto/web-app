/*
    server.jsの役割
    　・・・ここではサーバの起動のみを行う
 */

//.envファイルを読み込むためのモジュール(dotenv)を読み込む
require('dotenv').config('.env');

//サーバ起動用の設定ファイルであるapp.jsを読み込む
const app = require('./app');

//サーバの起動
app.listen(process.env.PORT, () => {
    console.log(`サーバ起動: http://localhost:${process.env.PORT}`);
});