import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
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

export default function RegisterPage() {
  const router = useRouter();
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  const onChangeSeller = (e) => {
    setSeller(e.target.value);
  };
  const onChangeProductName = (e) => {
    setName(e.target.value);
  };
  const onChangeProductDetail = (e) => {
    setDetail(e.target.value);
  };
  const onChangeProductPrice = (e) => {
    setPrice(Number(e.target.value));
  };

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          seller,
          createProductInput: { name, detail, price },
        },
      });

      router.push(`/05/boards/${result.data.createProduct._id}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        판매자: <input type="text" onChange={onChangeSeller} />
      </div>
      <div>
        상품명: <input type="text" onChange={onChangeProductName} />
      </div>
      <div>
        상품내용: <input type="text" onChange={onChangeProductDetail} />
      </div>
      <div>
        상품가격: <input type="text" onChange={onChangeProductPrice} />
      </div>
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}
