import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products{
      id,
      name,
      description,
      width,
      height
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query FetchProduct($id: ID!){
    product(id: $id){
      id,
      name,
      description,
      width,
      height
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

export const FETCH_CART_ITEMS_AND_USER = gql`
  query FetchCartItems{
    cart @client,
    userId @client,
    insuranceFee @client
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
        description
      }
    }
  }
`;

export const FETCH_ORDERS = gql`
  {
    orders{
      id,
      email,
      subtotal,
      installationFee,
      insuranceFee,
      insured,
      shippingInfo{
        shippingStatus
      },
      billingInfo{
        name
      },
      date,
      total,
      products{
        id,
        name
      },
      billingInfo{
        name
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
      },
      user{
        name,
      }
      email
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
        name
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
      width,
      height,
      category{
        id,
        name
      },
      flatInstallationFee,
      perFtInstallationFee,
      unitPrice,
      perFtUnitPriceThreeMonths,
      perFtUnitPriceSixMonths,
      perFtUnitPriceNineMonths,
      perFtUnitPriceTwelveMonths
    }
    categories{
      id,
      name
    }
  }
`;

export const FETCH_PRODUCT_PRICE = gql`
  query FetchProductPrice($id: ID!, $totalFeet: Float!, $startDate: String!, $endDate: String!){
    getProductPrice(id: $id, totalFeet: $totalFeet, startDate: $startDate, endDate: $endDate){
      id,
      name
      price,
      installationFee
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($queryString: String!){
    searchProducts(queryString: $queryString){
      id,
      name,
      description,
      weight
    }
  }
`;