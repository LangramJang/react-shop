import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([]);

    // 체크박스 핸들링
    const handleToggle = (value) => {
        // checked state 변경
        const currentIndex = Checked.indexOf(value); // 선택한 index
        const newChecked = [...Checked]; // 현재 선택된 값

        if(currentIndex === -1) { // 미선택 값 > 선택 값
            newChecked.push(value);
        }
        else { // 선택 값 > 미선택 값
            newChecked.splice(currentIndex, 1);
        }
        
        setChecked(newChecked);
        props.handleFilters(newChecked); // 핸들링 필터링
    }

    // 체크박스 렌더링
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)} 
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            >{value.name}</Checkbox>
        </React.Fragment>
    ));

    return (
        <>
            <Collapse defaultActiveKey={['0']}>
                <Panel header={props.title} key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </>
        
    )
}

export default CheckBox;