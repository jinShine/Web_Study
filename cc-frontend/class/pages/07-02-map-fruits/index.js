const FRUITS = [
  { number: 1, title: "레드향1" },
  { number: 2, title: "레드향2" },
  { number: 3, title: "레드향3" },
  { number: 4, title: "레드향4" },
  { number: 5, title: "레드향5" },
  { number: 6, title: "레드향6" },
  { number: 7, title: "레드향7" },
  { number: 8, title: "레드향8" },
  { number: 9, title: "레드향9" },
  { number: 10, title: "레드향10" },
];

export default function MapFruitsPage() {
  const aaa = [
    { number: 1, title: "레드향1" },
    { number: 2, title: "레드향2" },
    { number: 3, title: "레드향3" },
  ].map((el) => (
    <div>
      {el.number} {el.title}s
    </div>
  ));

  // 위의 가공 데이터를 변수에 직접 넣은 다음 사용하는 것 보다,
  // presenter에서 바로 map을 돌려서 어떤로직인지 보여주는것이 더 이상적
  return (
    <>
      {FRUITS.map((el) => (
        <div>
          {el.number} - {el.title}
        </div>
      ))}
    </>
  );
}
