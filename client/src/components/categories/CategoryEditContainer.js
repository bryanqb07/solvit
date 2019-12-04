import React from 'react';
import CreateCategory from './CreateCategory';
import DeleteButton from '../DeleteButton';
import { FETCH_CATEGORY } from "../../graphql/queries";
import { Query } from "react-apollo";

const CategoryEditContainer = props => {
    if(props.match.params.id){
        return (
            <Query query={FETCH_CATEGORY} variables={props.match.params}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader"></div>
                    if (error) return `Error! ${error.message}`;
                    const category = data.category;
                    return (
                        <div>
                            <CreateCategory
                                category={category}
                                update={true} />
                                <DeleteButton id={category.id} category={true} />
                        </div>
                    );
                }}
            </Query>
        );
    }else{
        return <CreateCategory update={false} />;
    }
}

export default CategoryEditContainer;