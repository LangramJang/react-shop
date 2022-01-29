import React from 'react';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';

function Manage(props) {

    return (
        <Row gutter={[16,16]} align='middle' style={{margin: '16px'}} >
            <Col lg={12} xs={24}>
                <Link to="/product/upload"> {/* 상품 등록/수정/삭제 */}
                    <Card>
                        <Meta 
                            title="상품관리"
                            description="판매자님의 상품을 등록/수정/삭제합니다."
                        />
                    </Card>
                </Link>
            </Col>
            <Col lg={12} xs={24}>
                <Link to="/"> {/* 주문내역 */}
                    <Card>
                        <Meta 
                            title="주문내역"
                            description="판매자님의 주문내역 목록을 확인합니다."
                        />
                    </Card>
                </Link>
            </Col>
            <Col lg={12} xs={24}>
                <Link to="/"> {/*  */}
                    <Card>
                        <Meta 
                            title="미지정"
                            description="판매자님의 ..."
                        />
                    </Card>
                </Link>
            </Col>
            <Col lg={12} xs={24}>
                <Link to="/"> {/*  */}
                    <Card>
                        <Meta 
                            title="미지정"
                            description="판매자님의 ..."
                        />
                    </Card>
                </Link>
            </Col>
        </Row>
    );
}

export default Manage;
