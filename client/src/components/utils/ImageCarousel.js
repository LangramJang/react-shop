import { Carousel } from 'antd';
import React from 'react';

function ImageCarousel(props) {
    const images = [...props.images];
    return (
        <div>
            <Carousel autoplay>
                {images.map((image,index) => (
                    <img key={index}
                        height="150px"
                        style={{width:'auto'}}
                        src={`http://localhost:5000/${image}`} />
                ))}
            </Carousel>
        </div>
    )
}

export default ImageCarousel;