import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BY,
    CHANGE_CART_QUANTITY
} from './types';
import { USER_SERVER } from '../components/Config.js';

/* 유저등록 */
export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

/* 로그인 */
export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

/* 유저 인증 */
export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

/* 로그아웃 */
export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

/* 카트 아이템 추가 */
export function addToCart(id){
    let body = {
        productId: id
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return ({
        type: ADD_TO_CART,
        payload: request
    });
}

/* 카트 아이템 조회 */
export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => { //
            // CartItem에 해당하는 정보들을 
            // Product Collection에서 가져온 후에
            // Quantity 정보를 획득한다
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id) { // 받아온 ProductDetail의 id 비교
                        // response.data[index].writer.cart[index].quantity = cartItem.quantity;
                        response.data[index].quantity = cartItem.quantity;
                    }
                });
            });
            return response.data;
        });

    return ({
        type: GET_CART_ITEMS,
        payload: request
    });
}

/* 카트 아이템 삭제 */
export function removeCartItem(productId) {
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {

            // productInfo, cart 정보를 조합하여 cartDetail을 제작 및 반환한다.
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if( item.id === product._id ) {
                        response.data.productInfo[index].quantity = item.quantity;
                    }
                });
            });

            return response.data;
        })
        .catch(err => alert(`카트 목록 삭제를 실패하였습니다.\n${err}`));

    return ({
        type: REMOVE_CART_ITEM,
        payload: request
    });
}

/* 카트 수량 변경 */
export function changeCartQuantity(data) {
    const request = axios.post(`/api/users/changeCartQuantity`, data)
        .then(response => {
            let cartId = [];
            
            response.data.cart.forEach(item => {
                cartId.push(item.id);
            });

            return {
                cartId: cartId,
                cart: response.data.cart
            };
        });
    return ({
        type: CHANGE_CART_QUANTITY,
        payload: request
    })
}

/* 결제 완료 */
export function onSuccessBuy(data) {
    const request = axios.post(`/api/users/successBy`, data)
        .then(response => response.data);
    return ({
        type: ON_SUCCESS_BY,
        payload: request
    });
}