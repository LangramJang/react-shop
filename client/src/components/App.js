import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import Manage from './views/Manage/Manage';

import Styled from 'styled-components';

// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside

const Container = Styled.div`
padding-top: 69px;
min-height: calc(100vh - 80px);
`;

function App() {
    return (
        <Suspense fallback={(
                <div>Loading...</div>
            )}>
            <NavBar/>
            <Container>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/product/upload" component={Auth(UploadProductPage, true, true)} />
                    <Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
                    <Route exact path="/user/cart" component={Auth(CartPage, true)} />
                    <Route exact path="/history" component={Auth(HistoryPage, true)} />
                    <Route exact path="/manage" component={Auth(Manage, true)} />
                </Switch>
            </Container>
            <Footer/>
        </Suspense>
    );
}

export default App;

