// 함수의 인자값에는 타입을 지정해줘야 한다.
function add(x: number, y: number) {
  return x + y;
}

function buildUserInfo(name: string = "기본값", email?: string) {
  return { name, email };
}
const user = buildUserInfo();

interface Storage {
  a: string;
}
interface ColdStorage {
  b: string;
}

function store(type: "통조림"): Storage;
function store(type: "아이스크림"): ColdStorage;

function store(type: "통조림" | "아이스크림") {
  if (type === "통조림") {
    return { a: "통조림" };
  } else if (type === "아이스크림") {
    return { b: "아이스크림" };
  } else {
    throw new Error("unsupported type");
  }
}

const s = store("통조림");
s.a;
