import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation {
    createBoard(
      writer: "버즈2"
      title: " 제목입니다."
      contents: "내용이에요"
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  // useMutation은 바로 사용하지 못한다.
  // _app.js
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard();
    console.log(result);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GraphQL API 요청하기 (동기)</button>
    </>
  );
}
