import { Drawer, Icon } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

function NavBar() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);
    
    const Navbar = Styled.nav`
        position: fixed;
        z-index: 5;
        width: 100%;
        padding: 0px 20px;
        border-bottom: solid 1px #e8e8e8;
        overflow: auto;
        box-shadow: 0 0 30px #f3f1f1;
        background-color: white;
    `;

    const MenuLogo = Styled.div`
        display: inline-block;
        width: 150px;
        float: left;
        font-size: 20px;
        margin: 7px;
    `;

    const MenuContainer = Styled.div``;
    const Left = Styled.div`float: left;`;
    const Right = Styled.div`
        float: right;

        @media (max-width: 767px) {
            display: none !important;
        }
    `;

    const MenuMobileButton = Styled.button`
        float: right;
        width: 68px;
        height: 32px;
        padding: 6px;
        padding-top: 4px;
        margin-top: 8px;
        display: none !important; /* use of important to overwrite ant-btn */
        // background: #3e91f7;
        display: flex;
        border: none;
        border-radius: 15px; 
        text-align: center;
        justify-content: center;

        @media (max-width: 767px) {
            display: inline-block !important;
        }
    `;

    return (
        <Navbar>
            <MenuLogo>
                <Link to='/' style={{ fontSize:'24px' }}>
                    <img src="http://localhost:5000/images/logo.jpg" />
                </Link>
            </MenuLogo>
            <MenuContainer>
                <Left>
                    <LeftMenu mode="horizontal" />
                </Left>
                <Right>
                    <RightMenu mode="horizontal" />
                </Right>

                <MenuMobileButton
                    type="primary"
                    onClick={showDrawer}
                >
                    <Icon type="align-right" />
                </MenuMobileButton>
                <Drawer
                    title="Basic Drawer" 
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </MenuContainer>
        </Navbar>
    )
}

export default NavBar;