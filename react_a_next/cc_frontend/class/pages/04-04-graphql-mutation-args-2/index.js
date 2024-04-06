import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  // useMutation은 바로 사용하지 못한다.
  // _app.js
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        seller: "훈이",
        createProductInput: { name: "마우스", detail: "좋은 마우스", price: 10000 },
      },
    });
    console.log(result);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GraphQL API 요청하기 (동기)</button>
    </>
  );
}
