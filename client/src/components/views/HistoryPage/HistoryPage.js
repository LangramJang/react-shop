import { Card, Col } from 'antd';
import React from 'react';
import Styled from 'styled-components';
import { millisToDate, toPriceFormat } from '../../../module';
 
function HistoryPage(props) {

    const Container = Styled.div`
        width: 80%;
        margin: 3rem auto;
    `;

    const Title = Styled.h2`
        text-align: center;
        font-size: 32px;
        font-weight: bold;
    `;

    const Description = Styled.p`
        text-align: center;
        margin-bottom: 15px;
        font-size: 20px;
    `;
    
    const renderImage = (images) => {
        if(images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };

    return (
        <Container>
            <Title> 구매내역</Title>
            <Description>고객님의 주문내역입니다.</Description>
            <Card>
                <Col span={6} style={{textAlign:'center'}}>
                    <span>구매일</span>
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <span>구매 상품</span>
                </Col>
                <Col span={3} style={{textAlign:'center'}}>
                    <span>수량</span>
                </Col>
                <Col span={3} style={{textAlign:'center'}}>
                    <span>가격</span>
                </Col>
            </Card>
            {props.user.userData 
                && props.user.userData.history.reverse().map((item, idx) => (
                <Card key={item.id} style={{margin: '10px 0', textAlign:'center'}}>
                    <Col span={6}>
                        <p>{millisToDate(item.dateOfPurchase)}</p>
                    </Col>
                    <Col span={12}>
                        <p>
                            {item.id}
                        </p>
                    </Col>
                    <Col span={3}>
                        <p>
                            {item.quantity}
                        </p>
                    </Col>
                    <Col span={3}>
                        <p>
                            ${toPriceFormat(item.price)}
                        </p>
                    </Col>
                </Card>
            ))}
        </Container>
    )
}

export default HistoryPage;