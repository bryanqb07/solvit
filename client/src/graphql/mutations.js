import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token,
            loggedIn,
            isStaff,
            id
        }
    }
`;

export const VERIFY_USER = gql`
    mutation VerifyUser($token: String!){
        verifyUser(token: $token){
            loggedIn,
            isStaff,
            id
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $name: String!, $password: String!){
        register(email: $email, name: $name, password: $password){
            token,
            loggedIn
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $description: String!, $weight: Int!, $price: Int!, $category: ID!){
        newProduct(name: $name, description: $description, weight: $weight, price: $price, category: $category){
            id,
            name,
            description,
            weight,
            price,
            category{
                id,
                name
            }
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($productId: ID!, $name: String!, $description: String!, $weight: Int!, $price: Int!, $category: ID!){
        updateProduct(productId: $productId, name: $name, description: $description, weight: $weight, price: $price, category: $category){
            id,
            name,
            description,
            weight,
            price,
            category{
                id,
                name
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!){
        deleteProduct(id: $id){
            id
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($name: String!){
        newCategory(name: $name){
            id,
            name
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: ID!, $name: String!){
        updateCategory(id: $id, name: $name){
            id,
            name
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!){
        deleteCategory(id: $id){
            id
        }
    }
`;

export const CREATE_ORDER = gql`
    mutation CreateOrder(
        $products: [ID]!, 
        $total: Int!, 
        $user: ID,
        $shipping_name: String!,
        $shipping_address1: String!,
        $shipping_address2: String!,
        $shipping_city: String!,
        $shipping_state: String!,
        $shipping_zipcode: String!,
        $billing_name: String!,
        $billing_address1: String!,
        $billing_address2: String!,
        $billing_city: String!,
        $billing_state: String!,
        $billing_zipcode: String!
        ){
        newOrder(
            products: $products, 
            total: $total, 
            user: $user,
            shipping_name: $shipping_name,
            shipping_address1: $shipping_address1,
            shipping_address2: $shipping_address2,
            shipping_city: $shipping_city,
            shipping_state: $shipping_state,
            shipping_zipcode: $shipping_zipcode,
            billing_name: $billing_name,
            billing_address1: $billing_address1,
            billing_address2: $billing_address2,
            billing_city: $billing_city,
            billing_state: $billing_state,
            billing_zipcode: $billing_zipcode
        ){
            id,
            products{
                id,
                name,
                price
            },
            total
        }
    }
`;