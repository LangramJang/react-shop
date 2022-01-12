import { Button, Empty, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions';
import Paypal from '../../utils/Paypal';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const dispatch = useDispatch();
    const [ Total, setTotal ] = useState(0);
    const [ ShowTotal, setShowTotal ] = useState(false); // 상품이 빈 경우 표시
    const [ ShowSuccess, setShowSuccess ] = useState(false);

    useEffect(() => { // 상품을 가져오기 위한 useEffect
        let cartItems = []; // 카트에 있는 아이템의 정보들
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) { // 카트에 상품이 들어있는 경우
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

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        setTotal(total);
        setShowTotal(true);
    };

    /* 카트에서 아이템 제서 */
    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                // 카트에 상품이 남지 않은 경우
                if(response.payload.productInfo.length <= 0) {
                    setShowTotal(false);
                }
            })
        ;
    };

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
    }

    return (
        <div style={{ width:'85%', margin:'3rem auto' }}>
            <h1> My Cart</h1>
            
            {
                ShowTotal 
                ?   <div style={{ marginTop: '3rem' }}>
                        <UserCardBlock 
                            products={props.user.cartDetail}
                            removeItem={removeFromCart}
                        />
                        <h2>Total Amount: ${Total}</h2>
                        <Paypal 
                            total={Total}
                            onSuccess={transactionSuccess}
                        />
                    </div> 
                :   ShowSuccess
                    ?   <Result 
                            status="success"
                            title="결제가 정상적으로 완료되었습니다! (테스트)"
                        /> 
                    :   <Empty 
                            style={{marginTop: '20px'}}
                            description={"카트에 상품이 비어있습니다."}
                         />
            }
        </div>
    );
}

export default CartPage;