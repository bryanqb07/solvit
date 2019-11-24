import React from 'react';
import CreateCategory from './CreateCategory';
import { FETCH_CATEGORY } from "../../graphql/queries";
import { Query } from "react-apollo";

const CategoryEditContainer = props => {
    if(props.match.params.id){
        return (
            <Query query={FETCH_CATEGORY} variables={props.match.params}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader">Loading...</div>
                    if (error) return `Error! ${error.message}`;
                    const category = data.category;
                    return (
                        <CreateCategory
                            category={category}
                            update={true} />
                    );
                }}
            </Query>
        );
    }else{
        return <CreateCategory update={false} />;
    }
}

export default CategoryEditContainer;