import React from 'react';
import Styled from 'styled-components';
 
function HistoryPage(props) {

    const Container = Styled.div`
        width: 80%;
        margin: 3rem auto;
    `;

    const Title = Styled.h1`
        
    `;

    return (
        <Container>
            
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData 
                        && props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.dateOfPurchase}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    )
}

export default HistoryPage;