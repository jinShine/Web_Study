import { withAuth } from "../hocs/withAuth";

function Home() {
  return <h1>로그인 성공</h1>;
}

export default withAuth(Home);
