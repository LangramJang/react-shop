import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageCarousel from '../../utils/ImageCarousel';
import CheckBox from './Section/CheckBox';
import {continents, price} from './Section/Datas';
import RadioBox from './Section/RadioBox';
import SearchFeature from './Section/SearchFeature';

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip , setSkip] = useState(0);
    const [Limit] = useState(6);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("");

    useEffect(() => { 
        let body = {
            skip: Skip,
            limit: Limit
        };
        getProducts(body);
    }, []);

    // 카드 랜더링 함수
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <a href={`/product/${product._id}`}>
                    <Card cover={
                            <ImageCarousel images={product.images} />
                    }>
                        <Meta 
                            title={product.name}
                            description={`$${product.price}`}
                        />
                    </Card>
                </a>
            </Col>
        );
    });

    
    // 카드 더 보기 함수
    const loadMoreHandler = () => {
        let currentSkip = Skip + Limit;
        let body = {
            skip: currentSkip,
            limit: Limit,
            loadMore: true
        };
        getProducts(body);
        setSkip(currentSkip);
    }

    // 상품 목록을 가져오는 함수
    const getProducts = (body) => {
        axios.post('/api/product/products', body) // 상품 목록 획득
            .then(response => {
                console.log(response.data);
                if(response.data.success) {
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo]);
                    }
                    else {
                        setProducts(response.data.productInfo);
                    }
                    setPostSize(response.data.postSize);
                }
                else {
                    alert("상품정보 획득에 실패하였습니다.\n새로고침 하여주시기 바랍니다.");
                }
            })
            .catch(e => alert("알수없는 에러가 발생하였습니다.\n잠시 후 다시 시도해주시기 바랍니다."));
    }

    // 필터링을 적용하여 아이템들을 가져옴
    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
            searchTerm: SearchTerm
        };
        setSkip(0);
        getProducts(body);
    }

    // 가격 필터링 핸들러
    const handlePrice = (value) => {
        const data = price;

        let priceArray = [];
        for(let key in data) { // key: 0 ~ 6
            if(data[key]._id === parseInt(value)) { // 라디오박스 값 === id
                priceArray = data[key].array;
            }
        }

        return priceArray;
    }

    // 필터링 핸들러
    const handleFilters = (filters, category) => { // category: continent | price
        const newFilters = {...Filters};
        
        newFilters[category] = filters; // 지역 필터(체크박스)

        // console.log(`[${category}] ${filters}`);
        if(category === "price") { // 가격 필터(라디오박스)
            let priceValues = handlePrice(filters); // [N ~ N]
            newFilters[category] = priceValues;
        }

        showFilteredResults(newFilters); // 변경된 필터 값을 가져옴
        setFilters(newFilters);
    }

    // 검색기능 핸들러
    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        };
        setSkip(0);
        setSearchTerm(newSearchTerm);
        
        getProducts(body);
    }

    // 렌더링
    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's Travel Anywhere<Icon type="rocket" /></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filter => handleFilters(filter, "continent")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filter => handleFilters(filter, "price")}  />
                </Col>
            </Row>

            {/* Search */}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/*  Card  */}
            <Row gutter={[16,16]}style={{margin: '10px auto'}}>
                {renderCards}
            </Row>
            
            <br />
            {
                PostSize >= Limit 
                ? <div style={{textAlign:'center'}}><Button onClick={loadMoreHandler}>더보기</Button></div>
                : null
            }

            
        </div>
    );
}

export default LandingPage;
