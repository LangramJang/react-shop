import React, { useEffect, useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

function RadioBox(props) {
    const [Value, setValue] = useState(0);

    useEffect(() => {
        setValue(props.index[0]);
    }, []);

    // 라디오박스 렌더링
    const renderRadioboxLists = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
        ))
    );

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleFilters([event.target.value]);
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header={props.title} key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioboxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox; 