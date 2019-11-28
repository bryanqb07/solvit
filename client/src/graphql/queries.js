import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products{
      id,
      name,
      description,
      weight,
      price
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query FetchProduct($id: ID!){
    product(id: $id){
      id,
      name,
      description,
      weight,
      price
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client,
    userId @client
  } 
`;

export const FETCH_CART_ITEMS = gql`
  query FetchCartItems{
    cart @client
  }
`;

export const FETCH_CATEGORIES = gql`
  {
    categories{
      id,
      name
    }
  }
`;

export const FETCH_CATEGORY = gql`
  query FetchCategory($id: ID!){
    category(id: $id){
      id,
      name,
      products{
        id,
        name,
        description,
        price
      }
    }
  }
`;

export const FETCH_ORDERS = gql`
  {
    orders{
      id,
      total,
      products{
        id,
        name,
        price
      },
      user{
        name,
        email
      }
    }
  }
`;

export const FETCH_ORDER = gql`
  query FetchOrder($id: ID!){
    order(id: $id){
      id,
      total,
      products{
        id,
        name,
        price
      },
      user{
        name,
        email
      }
    }
  }
`;

export const FETCH_USER_ORDERS = gql`
  query FetchUserOrders($user: ID!){
    userOrders(user: $user){
      id,
      total,
      products{
        id,
        name,
        price
      }
    }
  }
`;

export const FETCH_USER = gql`
  query FetchUser($id: ID!){
    user(id: $id){
      id,
      name,
      email
    }
  }
`;

export const FETCH_PRODUCT_AND_CATEGORIES = gql`
  query FetchProduct($id: ID!){
    product(id: $id){
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
    categories{
      id,
      name
    }
  }
`;

export const FETCH_PRODUCT_PRICE = gql`
  query FetchProductPrice($id: ID!){
    getProductPrice(id: $id){
      price
    }
  }
`;