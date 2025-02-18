export default function RatioScalingPage() {
  // 1. 고정화면(px 실습)
  // return (
  //   <div
  //     style={{
  //       width: "100vw",
  //       height: "100vh",
  //       backgroundColor: "yellow",
  //     }}
  //   >
  //     <div style={{ width: "300px", height: "400px", backgroundColor: "red" }}>
  //       네모상자
  //     </div>
  //   </div>
  // );

  // 2. 비율화면(rem 실습)
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "yellow",
      }}
    >
      <div
        style={{ width: "18.75rem", height: "25rem", backgroundColor: "red" }}
      >
        네모상자
      </div>
    </div>
  );
}
