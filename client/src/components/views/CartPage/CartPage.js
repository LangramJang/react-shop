import { Empty, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import { getCartItems, removeCartItem, onSuccessBuy, changeCartQuantity } from '../../../_actions/user_actions';
import Paypal from '../../utils/Paypal';
import UserCardBlock from './Sections/UserCardBlock';
import message from '../../../messages/ko';

function CartPage(props) {
    const dispatch = useDispatch();
    const [ Total, setTotal ] = useState(0);
    const [ ShowTotal, setShowTotal ] = useState(false); // 상품이 빈 경우 표시
    const [ ShowSuccess, setShowSuccess ] = useState(false);
    const [ Cart, setCart ] = useState([]);

    useEffect(() => { // 상품을 가져오기 위한 useEffect
        let cartItems = []; // 카트에 있는 아이템의 정보들
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) { // 카트에 상품이 들어있는 경우
                setCart([...props.user.userData.cart]);
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => getTotalPrice(response.payload));
            }
        }
    }, [props.user.userData]);

    const getTotalPrice = (cartDetail) => {
        let total = 0;
        cartDetail.map((item, idx) => total += parseInt(item.price, 10) * item.quantity);
        setTotal(total);
        setShowTotal(true);
    };

    /* 카트에서 아이템 제거 */
    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(response => {
            // 카트에 상품이 남지 않은 경우
            if(response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
        });
    };

    /* 카트 아이템 수량 변경 */
    const changeQuantity = (product, index, quantity) => {
        dispatch(changeCartQuantity({ 
            item: product,
            target: index,
            quantity: quantity
        }))
        .then(response => {
            if(response) {
                setCart(response.payload.cart);
                dispatch(getCartItems(response.payload.cartId, response.payload.cart))
                    .then(res => {
                        console.log(res.payload);
                        getTotalPrice(res.payload);
                    });
            }
        });
    }

    /* 결제 성공 후 처리 */
    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
        .then(response => { 
            if(response.payload.success) { // 결제 성공 이후 처리
                setShowTotal(false);
                setShowSuccess(true);
            }
        });
    };

    const CartContainer = Styled.div`
        width: 85%;
        margin: 3rem auto;
        text-align: center;
    `;
    
    const GoHome = Styled.button`
        width: 30%;
        height: 40px;
        border-radius: 10px;
        font-size: 20px;
        box-shadow: none;
        background-color: #aaaaff;
    `;

    return (
        <CartContainer>
            {
            ShowTotal ?   
            <>
                <UserCardBlock 
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                    changeQuantity={changeQuantity}
                    cart={Cart}
                    total={Total}
                />
                <Paypal total={Total} onSuccess={transactionSuccess} />
            </> 
            : ShowSuccess 
            ? <Result status="success" title={message.cartpage.success} />
            : <Empty description={message.cartpage.empty} />}
            <GoHome>
                <Link to="/" style={{color: 'white'}}>홈으로 이동하기</Link>
            </GoHome>
        </CartContainer>
    );
}

export default CartPage;