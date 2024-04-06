export default function CounterLetDocumentPage() {
  const handleClickCountUp = () => {
    let count = Number(document.querySelector("#count").innerText) + 1;
    document.querySelector("#count").innerText = count;
  };

  const handleClickCountDown = () => {
    let count = Number(document.querySelector("#count").innerText) - 1;
    document.querySelector("#count").innerText = count;
  };

  return (
    <>
      <div id="count"></div>
      <button onClick={handleClickCountUp}>카운트 올리기!!</button>
      <button onClick={handleClickCountDown}>카운트 내리기!!</button>
    </>
  );
}
