import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

export const getStaticPaths = () => {
  return {
    // 리턴으로 배열의 params 객체에 문자열만 가능
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // fallback(대비책)
    // 예를들어 id가 4인 경우 페이지가 없을때 에러가 발생할 수 있지?
    // 그럴때 페이지를 보여줄 수 있는 방법

    // fallback에는 3가지 옵션이 있다.
    // false: 없는 옵션경로로 요청시 404 에러 발생
    // true: 없는 옵션경로로 요청이 오면 페이지를 먼저 보여주고 getStaticProps를 실행하여 페이지를 만들어줌, isFallback이 상태로 로딩화면 추가 가능
    // "blocking": true와 비슷하지만 페이지 생성중에 fallback 페이지를 보여주지 않고(이전화면이 멈춘것처럼 보임), SSR처럼 동작해서 아무것도 미리 보여주지 않게 된다. isFallback이 상태로 로딩화면 불가
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  console.log("Context", context.params!.id);
  const id = Number(context.params!.id);
  // const book = await fetchOneBook(id);
  // const book = await fetchOneBook(id);

  const [book, _] = await Promise.all([
    fetchOneBook(id),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>로딩중...</div>;
  }

  if (!book) {
    return <div>문제가 발생하였습니다. 다시 시도해주세요.</div>;
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
