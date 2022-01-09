import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';

function DetailProductPage(props) {
    
    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios
        .get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if(response.data.success) {
                // console.log(response.data);
                setProduct(response.data.product[0]);
            }
            else {
                alert("제품의 정보를 가져오지 못하였습니다.\n잠시 후 다시 시도해주시기 바랍니다.");
            }
        })
    }, []);
    
    return (
        <div style={{ width: '100%', padding: '3rem 4rem'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <h1>{Product.name}</h1>
            </div>
            <hr />
            <br />

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
        </div>
    );
}

export default DetailProductPage;