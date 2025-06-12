/*
  app.jsの役割
    ・・・ここでは自作アプリケーションのサーバに必要なモジュールを読み込む
    　　　データベースの接続
    　　　必要なミドルウェアの設定
    　　　ルーティング設定
    　　　を行う
 */

const express = require('express'); //Node.jsで簡単にサーバを建てるためのフレームワーク
const cors = require('cors'); //異なるポートからのリクエストを制御する仕組み
const connectDB = require('./backend/config/db'); //DB読み込み
const deviceRoutes = require('./backend/routes/devices'); //ルートファイル読み込み
const estimateRoutes = require('./backend/routes/estimates');

const app = express(); //expressの初期化

//DB接続
connectDB(); //db.jsのconnectDBメソッドの実行

//ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static('public')); //publicフォルダ内のファイルをそのまま公開

/*
  /api/devicesで始まるURLのリクエストは、deviceRoutesに任せるというルーティング設定
*/
app.use('/api/devices', deviceRoutes);
app.use('/api/estimates', estimateRoutes);

module.exports = app;