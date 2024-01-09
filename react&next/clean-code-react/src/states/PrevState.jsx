const { useEffect, useRef } = require("react");

function PrevState() {
  const [age, setAge] = useState(30);

  function updateAge1() {
    setAge(age + 1); // 30 + 1
    setAge(age + 1); // 30 + 1
    setAge(age + 1); // 30 + 1
  }

  function updateAge2() {
    setAge((prevAge) => prevAge + 1); // 30 + 1
    setAge((prevAge) => prevAge + 1); // 31 + 1
    setAge((prevAge) => prevAge + 1); // 32 + 1
  }
}
