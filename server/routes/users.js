const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");
const { auth } = require("../middleware/auth");
const async = require("async");
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
        cart: req.user.cart,
        history: req.user.history
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

        userInfo.cart.forEach((item) => { // 해당 상품이 카트에 존재하는지 파악
            if(item.id === req.body.productId) {
                duplicate = true;
            }
        });

        if(duplicate) { // 1. 담으려는 ProductId가 존재하는가
            User.findOneAndUpdate(
                { _id : req.user._id, "cart.id": req.body.productId},
                { $inc: { "cart.$.quantity": 1 }}, // 해당 카트ID의 수량을 1 증가시킨다
                { new : true } // 콜렉션 UPDATE 후 성공/실패 확인
            , (err, userInfo) => {
                if(err) {
                    return res.status(200).json({success:false, err})
                }
                res.status(200).send(userInfo.cart);
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
                    return res.status(200).json({success:false, err});
                }
                res.status(200).send(userInfo.cart);
            });
        }
    });
});

// 카트 상품 삭제
router.get('/removeFromCart', auth, (req,res) => {
    // user collection > cart: id 에 해당하는 내용 삭제
    User.findOneAndUpdate(
        { _id : req.user._id },
        {
            $pull: { // 삭제코드
                "cart" : { "id": req.query.id }
            }
        },
        { new : true }
    , (err, userInfo) => {
        let cart = userInfo.cart;
        let array = cart.map(item => {
            return item.id
        });

        // product collection -> 현재 남아있는 카트 상품에 대한 정보 재획득
        Product
        .find({ _id: {$in: array} })
        .populate('writer')
        .exec((err, productInfo) => {
            return res.status(200).json({
                productInfo,
                cart
            });
        });
    });
});

// 카트 상품 변경
router.post('/changeCartQuantity', auth, (req,res) => {
    // User Collection > Cart > id에 해당하는 quantity 변경

    let target  = req.body.target * 1,
        chgCart = req.body.item.writer.cart[target],
        newCart = req.body.item.writer.cart,
        quan    = req.body.quantity * 1;

    // 수량 변경
    chgCart.quantity = quan;
    newCart[target] = chgCart;

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            $set: {cart: newCart} // 카트 변경
        },
        { new: true },
        (err, user) => {
            if(err) {
                return res.json({ success: false, err });
            }
            res.status(200).json({
                success: true,
                cart: user.cart
            });
        }
    );
});

// 결제 완료 후 처리
router.post('/successBy', auth, (req,res) => {
    // 1-1. user Collection > history field 내에 결제정보 INSERT
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => { // onSuccessBuy(in CartPage)로부터 받은 cartDetail 작업
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        });
    });

    // 1-2. payment Collection 결제 상세정보 INSERT
    transactionData.user = { // 구매한 고객 정보
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };
    transactionData.data    = req.body.paymentData; // 결제 정보(상세)
    transactionData.product = history; // 결제정보(기본)

    // 2. 정리된 유저들 정보를 INSERT 한다.
    User // history 정보 저장
    .findOneAndUpdate(
        { _id: req.user._id },
        { 
            $push: { history: history }, // 결제 정보 저장
            $set: { cart: [] } // 카트 비우기
        },
        { new : true },
        (err, user) => {
            if(err) {
                return res.json({ success: false, err });
            }

            // payment에 transactionData 저장
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if(err) {
                    return res.json({ success: false, err });
                }

                // 3. product Collection > sold field 값 +1 (주의: 상품 당 몇개의 수량(quantity)을 구매하였는가 알아야함)
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id:item.id, quantity:item.quantity });
                });

                // 각 id에 대해 for문을 돌리면 가독성이 떨어질 수 있어, async.eachSeries로 돌려줌 
                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    );
                }, err => {
                    if(err) {
                        return res.status(400).json({ success: false, err });
                    }
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    });
                });
            });
        }
    );
});

module.exports = router;
