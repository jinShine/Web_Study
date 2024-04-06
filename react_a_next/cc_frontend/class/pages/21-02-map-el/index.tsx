export default function MapElPage() {
  // 1. 기본 방법
  ["철수", "영희", "훈이"].forEach((el, index) => {
    console.log("el :", el);
    console.log("index :", index);
  });

  // 2. 매개변수를 변경한 방법
  ["철수", "영희", "훈이"].forEach((test, testIndex) => {
    console.log("el :", test);
    console.log("index :", testIndex);
  });

  // 3. 함수선언식 방법
  ["철수", "영희", "훈이"].forEach(function (tE, tI) {
    console.log("el :", tE);
    console.log("index :", tI);
  });

  // 4. el과 index 바꾸기
  ["철수", "영희", "훈이"].forEach(function (index, el) {
    console.log("el :", index);
    console.log("index :", el);
  });

  return <></>;
}
