export default function Page() {
  const onClickButton = (num) => () => {
    console.log(num);
  };

  return (
    <>
      <button onClick={onClickButton(123)}>버튼</button>
    </>
  );
}
