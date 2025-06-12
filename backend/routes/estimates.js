const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

router.get('/customers', async(req, res)=>{
    try{
        const customers = await Estimate.distinct('customerName');
        res.json(customers);
    }catch(error){
        console.error(error);
        res.status(500).json({message: '顧客一覧取得に失敗しました'});
    }
});

router.get('/:customerName', async(req, res) => {
    try{
        const estimate = await Estimate.findOne({customerName: req.params.customerName});
        if(!estimate) return res.status(404).json({message: '見積もりが見つかりません'});
        res.json(estimate);
    }catch(err){
        res.status(500).json({message: '詳細取得に失敗しました'});
    }
})

router.post('/', async (req, res) => {
    try {
        const estimateData = req.body;
        const estimate = new Estimate(estimateData);
        const savedEstimate = await estimate.save();

        res.status(201).json(savedEstimate);
    } catch (error) {
        console.error('Estimate保存エラー:', error);
        res.status(500).json({ message: '保存中にエラーが発生しました' });
    }
});

router.delete('/:customerName', async(req, res) => {
    try{
        const result = await Estimate.deleteOne({customerName: req.params.customerName});
        if(result.deletedCount === 0){
            return res.status(404).json({message: '見積もりが見つかりませんでした'});
        }
        res.json({message: '見積もりを削除しました'});
    }catch(error){
        console.log('Estimate削除エラー: ', error);
        res.status(500).json({message: '削除中にエラーが発生しました'});
    }
});

module.exports = router;