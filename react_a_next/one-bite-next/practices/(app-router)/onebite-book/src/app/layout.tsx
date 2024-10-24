import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  // 이런 동일한 API코드가 search페이지에 AllBooks() 함수로 있음
  // 그래서 누군가 데이터를 한번 가져왔다면 동일한 코드기 때문에 다시 부를 필요가 없을듯
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{books.length}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          {/* <footer>제작 @winterlood</footer> */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
