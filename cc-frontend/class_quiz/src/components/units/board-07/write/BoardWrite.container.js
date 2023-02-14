import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import BoardRegisterUI from "./BoardWrite.presenter";
import { CREATE_PRODUCT } from "./BoardWrite.queries";

export default function BoardRegister() {
  const router = useRouter();
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [isActive, setIsActive] = useState(false);
  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  const onChangeSeller = (e) => {
    setSeller(e.target.value);
    setIsActive(e.target.value && name && detail && price);
  };
  const onChangeProductName = (e) => {
    setName(e.target.value);
    setIsActive(seller && e.target.value && detail && price);
  };
  const onChangeProductDetail = (e) => {
    setDetail(e.target.value);
    setIsActive(seller && name && e.target.value && price);
  };
  const onChangeProductPrice = (e) => {
    setPrice(Number(e.target.value));
    setIsActive(seller && name && detail && e.target.value);
  };

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          seller,
          createProductInput: { name, detail, price },
        },
      });

      alert("상품이 등록 되었습니다.");
      router.push(`/06/boards/${result.data.createProduct._id}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <BoardRegisterUI
      onChangeSeller={onChangeSeller}
      onChangeProductName={onChangeProductName}
      onChangeProductDetail={onChangeProductDetail}
      onChangeProductPrice={onChangeProductPrice}
      onClickSubmit={onClickSubmit}
      isActive={isActive}
    />
  );
}
