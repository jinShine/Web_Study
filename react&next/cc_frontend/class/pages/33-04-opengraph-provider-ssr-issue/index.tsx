// 제공자일떄 => 네이버(제공자)
import { gql, useQuery } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";

const FETCH_USEDITEM = gql`
  query fetchUseditem(useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;
// export default function OpenGraphProviderPage() {
//   const { data } = useQuery(FETCH_USEDITEM, {
//     variables: { useditemId: "64118a481182750028ee7bfb" },
//   });

//   return (
// <>
{
  /* 데이터를 받아가지고 내용을 채워넣어도 값이 보이지 않는다. */
}
{
  /* 왜냐하면 데이터를 받고 서버에서 HTML을 보내는것이 아니라 HTML을 먼저 보내고 데이터를 요청하기 때문이다. */
}

{
  /* <Head>
        <meta property="og:title" content={data?.fetchUseditems.name} />
        <meta
          property="og:description"
          content={data?.fetchUseditems.remarks}
        />
        <meta property="og:image" content={data?.fetchUseditems.images?.[0]} />
      </Head> */
}
{
  /* </>
  );
} */
}

export default function OpenGraphProviderPage(props) {
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: { useditemId: "64118a481182750028ee7bfb" },
  });

  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
    </>
  );
}

// 렌더가 되기전에 서버에서 데이터를 받고, 받은 데이터를 채워넣은 다음, 서버로 보낸다고 생각하면된다.

// getServerSideProps는 기존에 존재하는 것임으로 변경 불가능
export const getServerSideProps = async () => {
  console.log("여기는 서버입니다.");

  // 1. 여기서 API 요청
  const graphqlClient = new GraphQLClient(
    "https://backendonline.codebootcamp.co.kr/graphql"
  );

  const result = await graphqlClient.request(FETCH_USEDITEM, {
    useditemId: "64118a481182750028ee7bfb",
  });

  // 2. 받은 결과물 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditems.name,
        remarks: result.fetchUseditems.remarks,
        images: result.fetchUseditems.images,
      },
    },
  };
};
