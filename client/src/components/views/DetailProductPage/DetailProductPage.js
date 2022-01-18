import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';
import Styled from 'styled-components';

function DetailProductPage(props) {
    
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios
        .get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => setProduct(response.data[0]))
        .catch(err => alert(err))
    }, []);

    const DetailContainer = Styled.div`
        width: 100%;
        padding: 3rem 4rem;
    `;

    return (
        <DetailContainer>
            <Row gutter={[16,16]}>
                <Col lg={12} sm={24}>
                    {/* ProductImages */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </DetailContainer>
    );
}

export default DetailProductPage;