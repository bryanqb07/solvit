import React, { useState } from "react";
import { withRouter } from "react-router";

const Search = ({ history }) => {
    const [queryString, setqueryString] = useState('');

    const handleClick = e => {
        e.preventDefault();
        history.push({
            pathname: "/search",
            search: `queryString=${queryString}`
        });
    };

    return (
        <div className="search-wrapper">
                <input className="search-input"
                    type="text"
                    placeholder="Search product..."
                    value={queryString}
                    onChange={e => setqueryString(e.target.value)}
                />
                <i className="fa fa-search search-button" onClick={handleClick}></i>
        </div>
    );
};

export default withRouter(Search);
