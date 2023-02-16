import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductEditUI from "./ProductEdit.presenter";
import { FETCH_PRODUCT, UPDATE_PRODUCT } from "./ProductEdit.queries";

export default function ProductEdit() {
  // Router
  const router = useRouter();

  // GQL
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: router.query.productId,
    },
  });

  // Properties
  const [info, setInfo] = useState({
    seller: "",
    name: "",
    detail: "",
    price: 0,
  });

  // Handler
  const onChangeInputInfo = (e) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  const onClickSubmit = async () => {
    try {
      const result = await updateProduct({
        variables: getVariablesForUpdate(),
      });

      console.log(result);
      alert(result.data.updateProduct.message);

      router.push(`/08/${result.data.updateProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  // Helper
  function getVariablesForUpdate() {
    const variables = {
      productId: router.query.productId,
      updateProductInput: {},
    };

    if (info.name) variables.updateProductInput.name = info.name;
    if (info.detail) variables.updateProductInput.detail = info.detail;
    if (info.price) variables.updateProductInput.price = Number(info.price);

    return variables;
  }

  return (
    <ProductEditUI
      isEdit={true}
      data={data}
      onChangeInputInfo={onChangeInputInfo}
      onClickSubmit={onClickSubmit}
    />
  );
}
