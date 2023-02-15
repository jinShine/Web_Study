import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductNewUI from "./Product.presenter";
import { CREATE_PRODUCT } from "./Product.queries";

export default function ProductNew() {
  // Router
  const router = useRouter();

  // GQL
  const [createProduct] = useMutation(CREATE_PRODUCT);

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
      const result = await createProduct({
        variables: {
          seller: info.seller,
          createProductInput: {
            name: info.name,
            detail: info.detail,
            price: Number(info.price),
          },
        },
      });

      console.log(result);
      alert(result.data.createProduct.message);

      router.push(`/08/${result.data.createProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProductNewUI
      isEdit={false}
      onChangeInputInfo={onChangeInputInfo}
      onClickSubmit={onClickSubmit}
    />
  );
}
