import React from 'react';
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    // Redux 사용
    const dispatch = useDispatch();

    // 카트 추가 핸들러
    const clickHandler = () => {
        // 필요한 정보를 Cart Field로 넣어준다
        dispatch(addToCart(props.detail._id));
    }

    return (
        <div>
            <Descriptions title="Product Info" >
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    <div>{props.detail.description}</div>
                </Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />

            <div style={{ display:'flex', justifyContent:'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default ProductInfo;