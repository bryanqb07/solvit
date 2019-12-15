import React from "react";
import { FETCH_USER } from "../../graphql/queries";
import { Query } from "react-apollo";

const UserProfile = (props) => (
    <Query query={FETCH_USER} variables={props.match.params}>
        {({ loading, error, data }) => {
            if (loading) return <div className="loader"></div>
            if (error) return <div className="error">`Error! ${error.message}`</div>

            const user = data.user;
            return (
                <div>
                    <h3>User Information</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )
        }}
    </Query>
);


export default UserProfile;