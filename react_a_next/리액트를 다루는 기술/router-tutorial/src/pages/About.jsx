import { useLocation, useSearchParams } from "react-router-dom";

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get("detail");
  const mode = searchParams.get("mode");

  const location = useLocation();

  return (
    <>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      <p>쿼리스트링: {location.search}</p>
      <p>쿼리스트링: {detail}</p>
      <p>쿼리스트링: {mode}</p>
    </>
  );
};

export default About;
