import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>마이 페이지</>;
};

export default MyPage;
