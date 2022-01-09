const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

// 카트 상품 추가
router.post("/addToCart", auth, (req, res) => {

    // req.user === user <- auth 미들웨어를 사용하여 이미 검증됨
    User.findOne({_id: req.user._id}, (err, userInfo) => {

        let duplicate = false; // 중복 데이터 확인

        userInfo.cart.forEach((item) => {    
            if(item.id === req.body.productId) {
                duplicate = true;
            }

            if(duplicate) { // 1. 담으려는 ProductId가 존재하는가
                User.findOneAndUpdate(
                    { _id : req.user._id, "cart.id": req.body.productId},
                    { $inc: { "cart.$.quantity": 1 }}, // 해당 카트ID의 수량을 1 증가시킨다
                    { new : true } // 콜렉션 UPDATE 후 성공/실패 확인
                , (err, userInfo) => {
                    if(err) {
                        return res.status(200).json({success:false, err})
                    }
                    return res.status(200).send(userInfo.cart);
                });
            }
            else { // 2. 담으려는 ProductId가 존재하지 않는가
                User.findOneAndUpdate(
                    { _id : req.user._id},
                    { $push: { // 새로운 카트 품목을 넣어준다
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }},
                    { new : true } // 콜렉션 UPDATE 후 성공/실패 확인
                , (err, userInfo) => {
                    if(err) {
                        return res.status(200).json({success:false, err})
                    }
                    return res.status(200).send(userInfo.cart);
                });
            }
        
        });
    });


});

module.exports = router;
