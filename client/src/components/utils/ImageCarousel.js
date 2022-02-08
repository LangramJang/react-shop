import { Carousel } from 'antd';
import React from 'react';
import Styled from 'styled-components';

function ImageCarousel(props) {
    const images = [...props.images];

    return (
        <Carousel autoplay alt={props.name} style={{  }}>
            {images.map((image,index) => (
                <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    style={{ border:'1px solid lightgray'}}
                />
            ))}
        </Carousel>
    )
}

export default ImageCarousel;