/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge, Icon, Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import Styled from 'styled-components';

function RightMenu(props) {
    const user = useSelector(state => state.user);
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed');
            }
        });
    };

    const LogoutButton = Styled.a``;

    if (user.userData && !user.userData.isAuth) { // 정보 없는 경우 
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <Link to="/login">로그인</Link>
                </Menu.Item>
                <Menu.Item key="app">
                    <Link to="/register">회원가입</Link>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="history">
                    <Link to="/history">구매내역</Link>
                </Menu.Item>
                <Menu.Item key="upload">
                    <Link to="/product/upload">상품 업로드</Link>
                </Menu.Item>
                <Menu.Item key="cart" style={{ lineHeight:'2.3rem' }} >
                    <Badge count={ user.userData && user.userData.cart.length }>
                        <Link to="/user/cart" style={{marginRight:-12, color:"#667777"}}>
                            <Icon type="shopping-cart" style={{ fontSize:25, marginBottom:'-5px' }} />
                        </Link>
                    </Badge>
                </Menu.Item>
                <Menu.Item key="logout">
                    <LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);

