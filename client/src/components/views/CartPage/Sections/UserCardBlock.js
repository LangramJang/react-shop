import { Button } from 'antd';
import React from 'react';
import Styled from 'styled-components';
// import './UserCardBlock.css';

function UserCardBlock(props) {
    const tableTitle = ["Product Image", "Product Quantity", "Product Price", " "];

    const ImageProduct = Styled.img`
        width: 70px;
    `;
    
    const CardTable = Styled.table`
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;

        tr {
            &nth-child(even) {
                background-color: #dddddd;
            }
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    `;

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };

    const RenderTable = () => (
        <CardTable>
            <colgroup>
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    {tableTitle.map((title, index) => (<th key={index}>{title}</th>))}
                </tr>
            </thead>
            <tbody>
                {props.products.map(item => (
                    <tr key={item.id}>
                        <td><ImageProduct src={renderCartImage(item.images)} alt="product" /></td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td><Button onClick={() => props.removeItem(item._id)}>Remove</Button></td>
                    </tr>
                ))}
            </tbody>
        </CardTable>
    );

    return (
        <RenderTable />
    );
}

export default UserCardBlock;