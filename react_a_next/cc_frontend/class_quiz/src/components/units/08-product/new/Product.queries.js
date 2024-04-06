import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createBoard($seller: String, $createProductInput: CreateProductInput!) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;
