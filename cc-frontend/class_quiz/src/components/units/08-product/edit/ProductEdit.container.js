import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductEditUI from "./ProductEdit.presenter";
import { UPDATE_PRODUCT } from "./ProductEdit.queries";

export default function ProductEdit() {
  // Router
  const router = useRouter();

  // GQL
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

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
        variables: {
          productId: router.query.productId,
          updateProductInput: {
            name: info.name,
            detail: info.detail,
            price: Number(info.price),
          },
        },
      });

      console.log(result);
      alert(result.data.updateProduct.message);

      router.push(`/08/${result.data.updateProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProductEditUI
      isEdit={true}
      onChangeInputInfo={onChangeInputInfo}
      onClickSubmit={onClickSubmit}
    />
  );
}
