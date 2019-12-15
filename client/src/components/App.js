import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AuthRoute from '../util/route_util';
import Login from './Login';
import ProductDetail from './products/ProductDetail';
import Cart from "./cart/Cart";
import CategoriesIndex from "./categories/CategoriesIndex";
import CategoryDetail from "./categories/CategoryDetail";
import CategoryBar from "./CategoryBar";
import ProductsIndex from "./products/ProductsIndex";
import TopNav from "./TopNav";
import Sidebar from "./staff/Sidebar";
import StaffHeader from "./staff/StaffHeader";
import OrdersIndex from "./orders/OrdersIndex";
import UserProfile from "./profile/UserProfile";
import EditProductContainer from "./products/EditProductContainer";
import UserOrders from "./orders/UserOrders";
import OrderDetail from "./orders/OrderDetail";
import CategoryEditContainer from "./categories/CategoryEditContainer";
import Checkout from "./checkout/Checkout";
import ConfirmationPage from "./ConfirmationPage";
import ProductsSearch from "./products/ProductSearch";
import Upload from './Upload';
import Nav from "./Nav";
import TitleBanner from "./TitleBanner";
import MenuBar from "./MenuBar";
import Footer from "./Footer";


const App = (props) => (
  <div className="">
    <Switch>
      <Route path="/staff">
        <Sidebar />
        <div className="">
          <div className="" id="hideLargeMain"></div>
            <StaffHeader />
            <div className="">
              <Switch>
                <AuthRoute exact path="/staff/index" component={ProductsIndex} routeType={"protected"} />
                <AuthRoute exact path="/staff/login" component={Login} routeType={"auth"} />
                <AuthRoute exact path="/staff/products/new" component={EditProductContainer} routeType={"protected"} />
                <AuthRoute exact path="/staff/products/edit/:id" component={EditProductContainer} routeType={"protected"} />
                <AuthRoute exact path="/staff/products" component={ProductsIndex} routeType={"protected"} />
                <AuthRoute exact path="/staff/categories/new" component={CategoryEditContainer} routeType={"protected"} />
                <AuthRoute exact path="/staff/categories/edit/:id" component={CategoryEditContainer} routeType={"protected"} />
                <AuthRoute exact path="/staff/categories" component={CategoriesIndex} routeType={"protected"} />
                <AuthRoute exact path="/staff/orders" component={OrdersIndex} routeType={"protected"} />
                <AuthRoute exact path="/staff/orders/:id" component={OrderDetail} routeType={"protected"} />
              </Switch>
          </div>
        </div>
      </Route>

      <Route path="/" >
          <Nav />
          <TitleBanner history={props.history} />
          <MenuBar />

          <div className="main-content-wrapper wrapped">
            <Switch>
              <Route exact path="/products/:id" component={ProductDetail} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/users/:id" component={UserProfile} />
              <Route exact path="/orders/:id" component={UserOrders} />
              <Route exact path="/categories/:id" component={CategoryDetail} />
              <Route path="/confirmation" component={ConfirmationPage} />
              <Route path="/search" component={ProductsSearch} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/" component={ProductsIndex} />
            </Switch>
          </div>
          <div>

          </div>
          {/* <div className="bottom-banner wrapped">
            <h1>Fence Share</h1>
          </div> */}
        <Footer />
      </Route>
    </Switch>
  </div>
);
export default App;