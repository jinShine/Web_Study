import axios from "axios";
import cheerio from "cheerio";

const createMessage = async () => {
  // 입력된 메시지: "안녕하세요~ https://www.naver.com/"

  // 1. 입력된 메시지에 http로 시작하는 문장에 있는지 먼저 찾기
  const url = "https://www.naver.com";

  // 2. axios.get으로 용청해서 html 코드 받아오기 => 스크래핑
  const result = await axios.get(url);
  // console.log(result.data);

  // 3. 스크래핑 결과에서 OG(오픈그래프)를 골라내서 변수에 담기 => cheerio 도움 받기

  const $ = cheerio.load(result.data);
  $("meta").each((index, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property"); // og:title, og:description, og:image, og:video, og:site_name
      const value = $(el).attr("content"); // og:title, og:description, og:image, og:video, og:site_name
      console.log("@@@@@", key, value);
    }
  });
};

createMessage();
