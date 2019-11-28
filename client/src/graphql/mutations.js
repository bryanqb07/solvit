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
    mutation CreateProduct($name: String!, $description: String!, $weight: Int!, $price: Int!, $category: ID!, $photo: Upload!){
        newProduct(name: $name, description: $description, weight: $weight, price: $price, category: $category, photo: $photo){
            id,
            name,
            description,
            weight,
            price,
            category{
                id,
                name
            },
            photo{
                filename
                mimetype
                encoding
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
    mutation CreateOrder($products: [ID]!, $prices: [Int]!, $userId: ID!){
        newOrder(products: $products, prices: $prices, userId: $userid){
            id,
            products{
                id,
                name,
                price
            }
        }
    }
`;