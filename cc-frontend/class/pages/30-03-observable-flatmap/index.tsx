import { Observable } from "@apollo/client/core";
import { from } from "zen-observable";

export default function ObservableFlatmapPage() {
  const onClickButton = () => {
    // new Observable(() => {});

    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"])
      .flatMap((el) => from([`${el}결과에 zzz 적용`]))
      .subscribe((el) => {
        console.log(el);
      });
  };
  return <button onClick={onClickButton}>클릭</button>;
}
