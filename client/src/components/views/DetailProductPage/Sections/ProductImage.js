import React, { useEffect, useState } from 'react';
import ImageGallary from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([]);


    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0) {
            let images = [];
            let key = [];

            props.detail.images.map((item,idx) => {
                images.push({
                    original : `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                });
                key.push(idx);
            });
            setImages(images);

            console.log("Images: ", Images);
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallary 
                showPlayButton={false}
                // showNav={false}
                useBrowserFullscreen={true}
                thumbnailPosition='left'
                key={Images}
                items={Images}
            />
        </div>
        
    );
}

export default ProductImage;