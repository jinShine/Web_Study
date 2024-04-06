// 함수
function aaa1(apple) {
  return function (banana) {
    return function (tomato) {
      console.log(apple);
      console.log(banana);
      console.log(tomato);
    };
  };
}

aaa1(10)(20)(30);

// 화살표 함수
const aaa2 = (apple) => (banana) => (tomato) => {
  console.log(apple);
  console.log(banana);
  console.log(tomato);
};

aaa2(10)(20)(30);
