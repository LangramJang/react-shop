const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
const { route } = require('./users');

//=================================
//             Product
//=================================

// Save Images
var storage = multer.diskStorage({
    destination: function(req, file, cb) { // 파일 저장 위치
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) { // 파일명
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
var upload = multer({ storage: storage }).single("file");
router.post('/image', (req, res) => {
    
    // 가져온 이미지를 저장한다
    upload(req, res, (err) => {
        if(err) { // 에러 발생 시
            return req.json({ success: false, err });
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename});
    });
});

// Insert Product Data
router.post('/', (req, res) => {
    const product = new Product(req.body);
    product.save(err => { // 데이터 저장
        if(err) {
            return res.status(400).json({success: false, err});
        } 
        return res.status(200).json({success: true});
    });
});

// SELECT Product Data
router.post('/products', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20; 
    let skip  = req.body.skip ? parseInt(req.body.skip) : 0;
    let term  = req.body.searchTerm;

    let findArgs = {}; // 필터링 아규먼트
    for(let key in req.body.filters) { // key: "continent" | "price"
        // key에 대한 값이 들어있는 경우 실행
        if(req.body.filters[key].length > 0) {

            if(key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1] === 0 ? Infinity:req.body.filters[key][1]
                }
            }
            else {
                // 체크박스 입력시 사용
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    if(term) {
        // product collection에 들어있는 모든 상품 정보를 가져오기
        Product
        .find(findArgs)
        .find({$text: {$search: term}}) // Search 에 관한 데이터 찾기
        .populate("writer") // @TODO
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) {
                return res.status(400).json({success: false, err});
            }
            return res.status(200).json({ 
                success:true, 
                productInfo,
                postSize: productInfo.length
            }); 
        });
    } else {
        // product collection에 들어있는 모든 상품 정보를 가져오기
        Product
        .find(findArgs)
        .populate("writer") // @TODO
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) {
                return res.status(400).json({success: false, err});
            }
            return res.status(200).json({ 
                success:true, 
                productInfo,
                postSize: productInfo.length
            }); 
        });
    }
});

module.exports = router;