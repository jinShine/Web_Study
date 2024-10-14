// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// ========================================
// ISR(Incremental Static Regeneration) 예제
// ========================================
export const getStaticProps = async () => {
  console.log("getStaticProps 한번만 호출되는지 확인하는 로그");

  // 병렬방식
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
    revalidate: 3, // 초단위로, 3초마다 재생성(재검증)
  };
};

export default function Home({
  allBooks,
  recommendedBooks,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allBooks, recommendedBooks);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendedBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
