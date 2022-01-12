import Axios from 'axios';
import React from 'react';

function HistoryPage(props) {

    // Redux history 안에 데이터가 있으니 굳이 없어도 됨
    // const [ History, setHistory ] = useState([]);
    // useEffect(() => {
    //     Axios.get('/api/users/history')
    //     .then(response => {
    //         if(response.data.success) {
                
    //         } else {
    //             alert("구매내역 정보를 가져오는데 실패하였습니다.");
    //         }
    //     })
    // });

    return (
        <div style={{ width:'80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

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
        </div>
    )
}

export default HistoryPage;