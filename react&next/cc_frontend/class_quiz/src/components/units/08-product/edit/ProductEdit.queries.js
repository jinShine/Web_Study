import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($productId: ID, $updateProductInput: UpdateProductInput!) {
    updateProduct(productId: $productId, updateProductInput: $updateProductInput) {
      _id
      number
      message
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID) {
    fetchProduct(productId: $productId) {
      seller
      name
      detail
      price
    }
  }
`;
