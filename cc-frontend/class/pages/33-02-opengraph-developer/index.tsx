// 개발자일때 => 디스코드 개발자

import axios from "axios";

export default function OpenGraphDeveloperPage() {
  const onClickEnter = async () => {
    // 1. 채팅데이터에 주소가 있는지 찾기(http://~~ 로 시작하는것)

    // 2. 해당 주소로 스크래핑하기
    const result = await axios.get("https://www.idus.com"); //CORS문제 떄문에 백엔드에서 작업한다.
    // console.log(result.data);

    // 3. 메타태그에서 og(open graph) 찾기
    console.log(result.data.split("<meta").filter((el) => el.includes("og:")));
    //[' property="og:title" content="아이디어스"/>\n', ' property="og:type" content="website"/>\n', ' property="og:description" content="아이디어스와 함께 취향 발견! 나만의 라이프 스타일을 완성하다."/>\n', ' property="og:url" content="https://www.idus.com/"/>\n', ' property="og:image" content="https://www.idus.com…       });\n        \x3C/script>\n    </body>\n</html>\n']
  };

  return (
    <>
      <button onClick={onClickEnter}>채팅 입력 후 엔터쳤다고 가정</button>
    </>
  );
}
