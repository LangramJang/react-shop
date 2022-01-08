import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [checked, setChecked] = useState([]);

    // 체크박스 핸들링
    const handleToggle = (value) => {

        // checked state 변경
        const currentIndex = checked.indexOf(value); // 선택한 index
        const newChecked = [...checked]; // 현재 선택된 값

        if(currentIndex === -1) { // 미선택 값 > 선택 값
            newChecked.push(value);
        }
        else { // 선택 값 > 미선택 값
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);

        // 핸들링 필터림
        props.handleFilters(newChecked);
    }

    // 체크박스 렌더링
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index} >
            <span style={{margin:'0 5px'}}>
                <Checkbox onChange={() => handleToggle(value._id)} 
                    checked={checked.indexOf(value._id) === -1 ? false : true}
                />
                <span>{value.name}</span>
            </span>
        </React.Fragment>
    ));

    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
        
    )
}

export default CheckBox; 