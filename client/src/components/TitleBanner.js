import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const TitleBanner = ({history}) => (
    <div className="background-main">
        <div className="title-bar wrapped top-padding">
            <Link to="/" className="no-decoration"><h1 className="primary-font-color">Fence Share</h1></Link>
            <Search history={history} />
            <div className="customer-support-wrapper primary-font-color">
                <span>Customer Support</span>
                <span>504-905-5138</span>
            </div>
        </div>
    </div>
);

export default TitleBanner;
