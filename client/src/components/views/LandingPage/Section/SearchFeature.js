import React, { useState } from 'react';
import { Input } from 'antd';

const {Search} = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState(""); 

    // 검색기능 핸들러
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value); // 부모컴포넌트(LandingPage)로 데이터 전송
    }

    return (
        <div>
            <Search 
                placeholder="Input Search here"
                onChange={searchHandler}
                style={{ width: 200}}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature;