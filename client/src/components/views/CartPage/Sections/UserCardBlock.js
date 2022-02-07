import { Card, Col, Row, Select } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { toPriceFormat } from '../../../../module';
// import './UserCardBlock.css';

function UserCardBlock(props) {
    const [Quantity, setQuantity] = useState([]);

    const { Option } = Select;
    let quanOpt = [
        <Option key={1} value={1}>1개</Option>,
        <Option key={2} value={2}>2개</Option>,
        <Option key={3} value={3}>3개</Option>,
        <Option key={4} value={4}>4개</Option>,
        <Option key={5} value={5}>5개</Option>,
        <Option key={6} value={6}>6개</Option>,
        <Option key={7} value={7}>7개</Option>,
        <Option key={8} value={8}>8개</Option>,
        <Option key={9} value={9}>9개</Option>
    ];
    
    useEffect(() => { // 카트 변경 후 데이터
        if(props.cart) {
            let quan = [];
            props.cart.map(e => {
                quan.push(e.quantity);
            });
            setQuantity(quan);
        }
    }, [props.cart])

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };

    const ImageProduct = Styled.img` // 카트 상품 이미지
        display: inline;
        width: 50px;
    `;

    const RemoveButton = Styled.button` // 카트 내 상품 삭제 버튼
        display: inline;
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 0;
        font-size: 12px;
        color: white;
        margin: auto;
    `;

    const PriceText = Styled.span` // 상품 가격(총합)
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        width: 120px;
    `;

    const TotalPrice = Styled.div` // 카트 총 총합
        display: inline-block;
        width: 100%;
        text-align: right;
        padding-right: 30px;
    `;

    const RenderTable = () => (
        <>
        <Row>
            {props.products.map((item, idx) => (
                <Card key={item.id} style={{margin: '10px 0'}}>
                    <Col span={3}>
                        <ImageProduct 
                            src={renderCartImage(item.images)} 
                            alt={item.name}
                            key={item.id}
                        />
                    </Col>
                    <Col span={12}>
                        <Meta 
                            title={item.name}
                            description={item.description}
                        />
                    </Col>
                    <Col span={8}>
                        <PriceText>￦ {toPriceFormat(item.price * Quantity[idx])}</PriceText>
                        <Select
                            key={item.id}
                            style={{width:'80px'}}
                            defaultValue={Quantity[idx]}
                            onChange={(e) => changeQuantities(e, idx)}
                        >
                            {quanOpt}
                        </Select>
                    </Col>
                    <Col span={1}>
                        <RemoveButton onClick={() => props.removeItem(item._id)}>Ｘ</RemoveButton>
                    </Col>
                </Card>
            ))
            }
            <TotalPrice>
                <Col>
                    <Meta title={`Total Price: $${toPriceFormat(props.total)}`} />
                </Col>
            </TotalPrice>
        </Row>
        </>
    );

    const changeQuantities = (e, idx) => {
        let quan = [...Quantity];
        quan.splice(idx, 1, e);
        setQuantity(quan);
        props.changeQuantity(props.products[idx], idx, e);
    }

    return (
        <RenderTable key={0} />
    );
}
export default UserCardBlock;