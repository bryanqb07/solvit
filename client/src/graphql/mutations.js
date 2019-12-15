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
    mutation CreateProduct(
        $name: String!, 
        $description: String!, 
        $width: Float!, 
        $height: Float!, 
        $category: ID!,
        $flatInstallationFee: Float!,
        $perFtInstallationFee: Float!,
        $unitPrice: Float!,
        $perFtUnitPriceThreeMonths: Float!,
        $perFtUnitPriceSixMonths: Float!,
        $perFtUnitPriceNineMonths: Float!,
        $perFtUnitPriceTwelveMonths: Float!
        ){
        newProduct(
            name: $name, 
            description: $description, 
            width: $width, 
            height: $height, 
            category: $category,
            flatInstallationFee: $flatInstallationFee,
            perFtInstallationFee: $perFtInstallationFee,
            unitPrice: $unitPrice,
            perFtUnitPriceThreeMonths: $perFtUnitPriceThreeMonths,
            perFtUnitPriceSixMonths: $perFtUnitPriceSixMonths,
            perFtUnitPriceNineMonths: $perFtUnitPriceNineMonths,
            perFtUnitPriceTwelveMonths: $perFtUnitPriceTwelveMonths        
        ){
            id,
            name,
            description,
            width,
            height,
            category{
                id,
                name
            }
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
        $productId: ID!,
        $name: String!, 
        $description: String!, 
        $width: Float!, 
        $height: Float!, 
        $category: ID!,
        $flatInstallationFee: Float!,
        $perFtInstallationFee: Float!,
        $unitPrice: Float!,
        $perFtUnitPriceThreeMonths: Float!,
        $perFtUnitPriceSixMonths: Float!,
        $perFtUnitPriceNineMonths: Float!,
        $perFtUnitPriceTwelveMonths: Float!
    ){
        updateProduct(
            productId: $productId,
            name: $name, 
            description: $description, 
            width: $width, 
            height: $height, 
            category: $category,
            flatInstallationFee: $flatInstallationFee,
            perFtInstallationFee: $perFtInstallationFee,
            unitPrice: $unitPrice,
            perFtUnitPriceThreeMonths: $perFtUnitPriceThreeMonths,
            perFtUnitPriceSixMonths: $perFtUnitPriceSixMonths,
            perFtUnitPriceNineMonths: $perFtUnitPriceNineMonths,
            perFtUnitPriceTwelveMonths: $perFtUnitPriceTwelveMonths  
        ){
            id,
            name,
            description,
            width,
            height,
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
        $user: ID,
        $email: String!,
        $name: String!,
        $telephone: String!,
        $token: String!
        $products: [ID]!, 
        $subtotal: Float!,
        $installationFee: Float!,
        $insured: Boolean!,
        $insuranceFee: Float!,
        $salesTax: Float!,
        $totalFootage: Int!,
        $total: Float!, 
        $productRentalPeriods: [String!],
        $shippingName: String!,
        $address1: String!,
        $address2: String!,
        $city: String!,
        $state: String!,
        $zipcode: String!
        ){
        newOrder(
            token: $token,
            products: $products, 
            subtotal: $subtotal,
            installationFee: $installationFee,
            insured: $insured,
            insuranceFee: $insuranceFee,
            salesTax: $salesTax,
            total: $total,
            totalFootage: $totalFootage,
            user: $user,
            email: $email,
            telephone: $telephone,
            productRentalPeriods: $productRentalPeriods,
            name: $name,
            shippingName: $shippingName,
            address1: $address1,
            address2: $address2,
            city: $city,
            state: $state,
            zipcode: $zipcode,
        ){
            id,
            email,
            total
        }
    }
`;