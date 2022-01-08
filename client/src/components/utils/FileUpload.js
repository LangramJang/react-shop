import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload(props) {
    
    const [ images, setImages ] = useState([]);

    // 파일 드랍 OR 선택 시 이벤트 핸들러
    const dropHandler = (Files) => {

        const config = { // 파일 전송을 위한 Request Data 설정
            header: {'content-type': 'multipart/form-data'}
        }
        let formData = new FormData();
        formData.append("file", Files[0]);

        // 이미지 전송(POST)
        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success) { // 데이터 전송 완료
                    // console.log(response.data);
                    setImages([...images, response.data.filePath]);
                    props.refreshFunction([...images, response.data.filePath]);
                } else {
                    alert("파일 저장에 실패하였습니다.\n다시 시도해주시기 바랍니다.");
                }
            })
            .catch(e => {
                alert("오류가 발생하였습니다!\n다시 시도해주시 바랍니다.");
            })
    }

    // 파일 삭제 핸들러
    const deleteHandler = (image) => {
        const targetIndex = images.indexOf(image);
        
        let newImages = [...images];
        newImages.splice(targetIndex, 1); // 삭제할 이미지 부분을 삭제

        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{display: 'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={ dropHandler }>
                {({ getRootProps, getInputProps}) => (
                    <section>
                        <div 
                            style={{
                                width: '300px', height: '240px', border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>

            <div style={{ 
                display:'flex', width:'350px', height: '240px', overflowX:'scroll', overflowY:'hidden',
                border: '1px solid lightgray', }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px', margin: '0 1px'}} 
                            onClick={() => deleteHandler(image)}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;