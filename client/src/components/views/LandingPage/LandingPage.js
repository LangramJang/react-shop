import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageCarousel from '../../utils/ImageCarousel';
import CheckBox from './Section/CheckBox';
import {connects, contacts, price, switches} from '../../../data/Datas';
import RadioBox from './Section/RadioBox';
import SearchFeature from './Section/SearchFeature';
import Styled from 'styled-components';
import { toPriceFormat } from '../../../module';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [Index, setIndex] = useState({});
    const [Products, setProducts] = useState([]);
    const [Skip , setSkip] = useState(0);
    const [Limit] = useState(4);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({switches:[], connect:[], contact:[1], price:[]});
    const [SearchTerm, setSearchTerm] = useState("");
    const [PriceIndex, setPriceIndex] = useState([0]);
    
    useEffect(() => { 
        let body = { 
            skip: Skip,
            limit: Limit
        };
        getProducts(body);
        setIndex(Filters)
    }, []);

    // 카드 랜더링 함수
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Link to={`/product/${product._id}`}>
                    <Card cover={<ImageCarousel images={product.images} /> }>
                        <Meta 
                            title={product.name}
                            description={`￦ ${toPriceFormat(product.price)}`}
                        />
                    </Card>
                </Link>
            </Col>
        );
    });
    
    // 카드 더 보기 함수
    const loadMoreHandler = () => {
        let currentSkip = Skip + Limit;
        let body = {
            skip: currentSkip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        };
        getProducts(body);
        setSkip(currentSkip);
    };

    // 상품 목록을 가져오는 함수
    const getProducts = (body) => {
        axios
        .post('/api/product/products', body) // 상품 목록 획득
        .then(response => {
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
    };

    // 필터링을 적용하여 아이템들을 가져옴
    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
            searchTerm: SearchTerm
        };

        getProducts(body);
        setSkip(0);
    };

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
        let datas = {
            switches: category==="switches" ? filters : Index.switches,
            connect : category==="connect"  ? filters : Index.connect,
            contact : category==="contact"  ? filters : Index.contact,
            price: category==="price" ? filters : Index.price
        };
        setIndex(datas);

        const newFilters = { ...Filters };
        newFilters[category] = filters; 

        if(category === "price") { // 가격 필터(라디오박스)
            let priceValues = handlePrice(filters); // [N ~ N]
            newFilters[category] = priceValues;
            setPriceIndex(filters);
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

    const Container = Styled.div`
        width: 75%;
        margin: 3rem auto;
    `;

    const Search = Styled.div`
        display: flex;
        justify-contents: center;
        width: 100%;
        margin: 1rem auto;
    `;

    return ( // 렌더링
        <Container>
            {/* Filter */}
            <Row gutter={[16, 16]}>

                <Col lg={6} md={12} xs={24}>
                    <CheckBox 
                        title="스위치"
                        list={switches}
                        checked={Filters.switches}
                        handleFilters={filters => handleFilters(filters, "switches")}
                    />
                </Col>
                
                <Col lg={6} md={12} xs={24}>
                    <CheckBox 
                        title="연결방식"
                        list={connects}
                        checked={Filters.connect}
                        handleFilters={filters => handleFilters(filters, "connect")} 
                    />
                </Col>
                
                <Col lg={6} md={12} xs={24}>
                    <RadioBox 
                        title="접점방식"
                        list={contacts}
                        index={Filters.contact}
                        handleFilters={filters => handleFilters(filters, "contact")} 
                    />
                </Col>
                
                <Col lg={6} md={12} xs={24}>
                    <RadioBox
                        title="가격"
                        list={price}
                        index={PriceIndex}
                        handleFilters={filters => handleFilters(filters, "price")} 
                    />
                </Col>
            </Row>

            <Search> {/* Search */}
                <SearchFeature refreshFunction={updateSearchTerm} />
            </Search>

            <Row gutter={[16,16]} style={{margin: '10px auto'}}> {/*  Card  */}
                {renderCards}
            </Row>
            {
                PostSize >= Limit 
                ? 
                <div style={{textAlign:'center'}}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
                : null
            }
        </Container>
    );
}

export default LandingPage;
