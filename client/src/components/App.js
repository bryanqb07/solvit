import React from "react";
import { Route, Switch } from "react-router-dom";
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

const App = () => (
  <div className="w3-content">
    <Switch>
      <Route path="/staff">
        <Sidebar />
        <div className="w3-main">
          <div className="w3-hide-large" id="hideLargeMain"></div>
            <StaffHeader />
            <div className="w3-row">
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
          <CategoryBar />
          <div className="w3-main">
            <div className="w3-hide-large" id="hideLargeMain"></div>
            <TopNav />
            <div className="w3-row">
              <Switch>
                <Route exact path="/products/:id" component={ProductDetail} />
                <Route exact path="/cart/checkout" component={Checkout} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/users/:id" component={UserProfile} />
                <Route exact path="/orders/:id" component={UserOrders} />
                <Route exact path="/categories/:id" component={CategoryDetail} />
                <Route exact path="/" component={ProductsIndex} />
              </Switch>
            </div>
          </div>
      </Route>
    </Switch>
  </div>
);
export default App;
