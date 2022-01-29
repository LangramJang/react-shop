import React from 'react';
import { Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import Styled from 'styled-components';
import { toPriceFormat } from '../../../../module';

function ProductInfo(props) {

    // Use Redux
    const dispatch = useDispatch();

    // Add to Cart
    const clickHandler = () => dispatch(addToCart(props.detail._id)); // 필요 정보를 cart collection에 저장
    
    // Styled
    const AddToCart = Styled.button`
        background-color: red;
        color: white;
    `;

    return (
        <>
            <Descriptions bordered>
                <Descriptions.Item label="Price">$ {toPriceFormat(props.detail.price)}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <AddToCart size="large" shape="round" type="danger" onClick={clickHandler}>
                Add to Cart
            </AddToCart>
        </>
    );
}

export default ProductInfo;