import React, { useState } from 'react';
import {Typography, Button, Form, Input, Select } from 'antd';

import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title }    = Typography;
const { Option }   = Select;
const { TextArea } = Input; 

const Continents = [
    {key:1, value: "Africa"},
    {key:2, value: "Europe"},
    {key:3, value: "Asia"},
    {key:4, value: "NorthAmerica"},
    {key:5, value: "SouthAmerica"},
    {key:6, value: "Austraila"},
    {key:7, value: "Antarctica"}
]

function UploadProductPage(props) {

    const [ name, setName ] = useState(""); // 상품명
    const [ description, setDesc ] = useState(""); // 설명
    const [ price, setPrice ] = useState(0); // 가격
    const [ continent, setContinent ] = useState(1); // 대륙
    const [ images, setImages ] = useState([]); // 이미지 정보

    const [ loading, setLoading ] = useState(false); // FormEvent loading

    const nameChangeHandler = (event) => { // 이름 변경 핸들러
        setName(event.currentTarget.value);
    }
    const descChangeHandler = (event) => { // 설명 변경 핸들러
        setDesc(event.currentTarget.value);
    }
    const priceChangeHandler = (event) => { // 가격 변경 핸들러
        setPrice(event.currentTarget.value);
    }
    const continentChangeHandler = (event) => { // 지역 선택 핸들러
        // antd Select-Option 
        setContinent(event);

        // Native select-option
        // setContinent(event.currentTarget.value);
    }
    const updateImages = (newImages) => { // 이미지 정보 변경 핸들러
        setImages(newImages);
    }
    const submitHandler = (event) => { // 제출 이벤트 핸덜르
        event.preventDefault();
        setLoading(true);

        if(!name || !description || !price || !continent || !images) {
            alert("등록을 위해 모든 칸을 채워주시기 바랍니다.");
            setLoading(false);
            return;
        }

        // data request for Server
        const body = {
            // loginUser
            writer: props.user.userData._id,
            name: name,
            description: description,
            price: price,
            continent: continent,
            images: images
        };
        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert("상품 등록이 완료되었습니다.");
                    setLoading(false);
                }else {
                    alert("등록에 실패하였습니다.");
                    setLoading(false);
                }
            })
            .catch(e => {
                alert("에러가 발생하였습니다.\n잠시 후 다시 시도해주시기 바랍니다.");
                setLoading(false);
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>

            {/* <form onSubmit={submitHandler}> */}
            <Form>
                <FileUpload refreshFunction={updateImages} /> {/* Dropzone */}

                <br />
                <br />
                <label>이름</label>
                <Input onChange={nameChangeHandler} value={name} />
                <br />
                <br />
                <label>설명</label> 
                <TextArea onChange={descChangeHandler} value={description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                <Select onChange={continentChangeHandler} value={continent}>
                    {
                        Continents.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)
                    }
                </Select>
                <br />
                <br />
                <Button style={{
                    width:'100%', height: '40px', textAlign: 'center', margin: '0 auto', 
                    fontSize: '1.6rem', fontWeight:'bold'}} 
                    type="primary" onClick={submitHandler} loading={loading}>상품 등록하기</Button>
            </Form>
            {/* </form> */}
        </div>
    )
}

export default UploadProductPage;