import ChildPage from "./02-child";

// 컴포넌트는 그냥 함수에 불과
// 따라서 props도 그냥 매개변수에 불과, 즉 내 마음대로 이름 변경 가능
export default function ParentPage() {
  return (
    <div>
      {/* <ChildPage count={3} /> */}
      {ChildPage({ count: 3 })}
    </div>
  );
}
