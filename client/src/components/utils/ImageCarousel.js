import { Carousel } from 'antd';
import React from 'react';
import Styled from 'styled-components';

function ImageCarousel(props) {
    const images = [...props.images];
    const CardImage = Styled.img`
        height: 150px;
        width: auto;
        border: 1px solid lightgray;
    `;

    return (
        <Carousel autoplay style={{padding: '10px' }}>
            {images.map((image,index) => (
                <CardImage key={index} src={`http://localhost:5000/${image}`} />
            ))}
        </Carousel>
    )
}

export default ImageCarousel;