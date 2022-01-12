import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const dispatch = useDispatch();

    useEffect(() => { // 상품을 가져오기 위한 useEffect
        let cartItems = []; // 카트에 있는 아이템의 정보들
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) { // 카트에 상품이 들어있는 경우
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart));
            }
        }
    }, [props.user.userData]);

    return (
        <div style={{ width:'85%', margin:'3rem auto' }}>
            <h1> My Cart</h1>

            <div>
                <UserCardBlock products={props.user.cartDetail} />
            </div>
            
        </div>
    );
}

export default CartPage;