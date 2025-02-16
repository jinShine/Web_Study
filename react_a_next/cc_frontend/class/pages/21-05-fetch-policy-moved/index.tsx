import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import FetchPolicyExample from "../../src/components/units/21-fetch-policy";

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;
export default function GlobalStatePage() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery(FETCH_BOARDS, { fetchPolicy: "network-only" });

  const onClickIsOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={onClickIsOpen}>
        버튼을 클릭하면 새로운 컴포넌트가 나타납니다!
      </button>
      {isOpen && <FetchPolicyExample />}
    </>
  );
}
