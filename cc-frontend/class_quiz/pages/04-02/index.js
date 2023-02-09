import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

//-----------------------------------------------
// 1. CREATE_BOARD
//-----------------------------------------------

// const CREATE_BOARD = gql`
//   mutation createBoard($writer: String, $title: String, $contents: String) {
//     createBoard(writer: $writer, title: $title, contents: $contents) {
//       _id
//       number
//       message
//     }
//   }
// `;
// export default function QuizPage4_2() {
//   const [createBoard] = useMutation(CREATE_BOARD);

//   const [writer, setWriter] = useState("");
//   const [title, setTitle] = useState("");
//   const [contents, setContents] = useState("");

//   const onChangeWriter = (e) => {
//     setWriter(e.target.value);
//   };
//   const onChangeTitle = (e) => {
//     setTitle(e.target.value);
//   };
//   const onChangeContents = (e) => {
//     setContents(e.target.value);
//   };

//   const onClickSubmit = async () => {
//     const result = await createBoard({
//       variables: {
//         writer: writer,
//         title: title,
//         contents: contents,
//       },
//     });
//     console.log(result);
//   };
//   return (
//     <>
//       작성자 : <input type="text" onChange={onChangeWriter} />
//       <br />
//       제목 : <input type="text" onChange={onChangeTitle} />
//       <br />
//       내용 : <input type="text" onChange={onChangeContents} />
//       <br />
//       <button onClick={onClickSubmit}>등록하기</button>
//     </>
//   );
// }

//-----------------------------------------------
// 2. CREATE_PRODUCT
//-----------------------------------------------

const CREATE_PRODUCT = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function QuizPage4_2() {
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  const onChangeSeller = (e) => {
    setSeller(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeDetail = (e) => {
    setDetail(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(Number(e.target.value));
  };

  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        seller: seller,
        createProductInput: { name: name, detail: detail, price: price },
      },
    });

    console.log(result);
  };

  return (
    <>
      Seller : <input type="text" onChange={onChangeSeller} />
      <br />
      상품 이름 : <input type="text" onChange={onChangeName} />
      <br />
      내용 : <input type="text" onChange={onChangeDetail} />
      <br />
      가격 : <input type="text" onChange={onChangePrice} />
      <br />
      <button onClick={onClickSubmit}>GraphQL API 요청하기 (동기)</button>
    </>
  );
}
