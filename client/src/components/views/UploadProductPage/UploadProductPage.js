import React, { useState } from 'react';
import { Typography, Button, Form, Input, Select, Checkbox } from 'antd';
import { continent, switches, connects, contacts } from '../../../data/Datas'
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import styled from 'styled-components';

const { Title }    = Typography;
const { Option }   = Select;
const { TextArea } = Input; 

// const Continents = [...continent];
const Switches = [...switches];
const Connects = [...connects];
const Contacts = [...contacts];

function UploadProductPage(props) {
    const [ name, setName ] = useState(""); // 상품명
    const [ description, setDesc ] = useState(""); // 설명

    const [ price, setPrice ] = useState(0); // 가격
    // const [ continent, setContinent ] = useState(1); // 대륙
    const [ switches, setSwitches ]   = useState(5); // 스위치
    const [ connects, setConnects ]   = useState(1); // 연결
    const [ contacts, setContacts ]   = useState(1); // 접점
    
    const [ images, setImages ] = useState([]); // 이미지 정보
    const [ loading, setLoading ] = useState(false); // FormEvent loading

    const nameChangeHandler      = (event) => { setName(event.currentTarget.value); } // 이름 변경 핸들러
    const descChangeHandler      = (event) => { setDesc(event.currentTarget.value); }// 설명 변경 핸들러

    const priceChangeHandler     = (event) => { setPrice(event.currentTarget.value); } // 가격 변경 핸들러
    // const continentChangeHandler = (event) => { setContinent(event); } // 지역 선택 핸들러
    const switchesChangeHandler  = (event) => { setSwitches(event); } // 스위치 선택 핸들러
    const connectsChangeHandler  = (event) => { setConnects(event); } // 연결 선택 핸들러
    const contactsChangeHandler  = (event) => { setContacts(event); } // 접점 선택 핸들러
    
    const updateImages           = (newImages) => { setImages(newImages); }// 이미지 정보 변경 핸들러

    const submitHandler = (event) => { // 제출 이벤트 핸덜르
        event.preventDefault();
        setLoading(true);

        if(!name || !description || !price || !contacts || !connects || !images) {
            if(contacts === "mechanical" && !switches) {
                let f = window.confirm("기계식 키보드에서 스위치를 선택하지 않은 경우\n기본값으로 청축으로 진행됩니다.\n계속 진행하시겠습니까?");
                if(f) {
                    setSwitches('blue');
                }
            }
            else {
                alert("등록을 위해 모든 칸을 채워주시기 바랍니다.");
            }
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
            // continent: continent,
            switches: switches,
            connects: connects,
            contacts: contacts,
            images: images
        };
        Axios
        .post("/api/product", body)
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
                <Title level={2}>상품 업로드</Title>
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
                <label>가격(￦)</label>
                <Input onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                {/* <Select onChange={continentChangeHandler} value={continent}>
                    {
                        Continents.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)
                    }
                </Select> */}
                <label>스위치</label>
                <Select onChange={switchesChangeHandler} value={switches}>
                    {
                        Switches.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)
                    }
                </Select>
                <br />
                <br />
                <label>연결 방식</label>
                <Select onChange={connectsChangeHandler} value={connects}>
                    {
                        Connects.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)
                    }
                </Select>
                <br />
                <br />
                <label>접점 방식</label>
                <Select onChange={contactsChangeHandler} value={contacts}>
                    {
                        Contacts.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)
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