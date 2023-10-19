import { EffectCallback, useEffect, useRef } from "react";
import { useBoolean, useEffectOnce, useEventListener } from "usehooks-ts";

function useModalActionEvent() {
  const enterEventRef = useRef<HTMLButtonElement>(null);
  const escEventRef = useRef<HTMLButtonElement>(null);

  useEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (enterEventRef.current) {
        enterEventRef.current.click();
      }
    }

    if (event.key == "Escape") {
      if (escEventRef.current) {
        console.log("#######", event);
        escEventRef.current.click();
      }
    }
  });

  return { enterEventRef, escEventRef };
}

export default function App() {
  const { value: playing, setValue, toggle } = useBoolean();
  const { enterEventRef, escEventRef } = useModalActionEvent();

  const handleClick = () => {
    toggle();
  };

  useEffectOnce(() => {});

  return (
    <div>
      <button onClick={() => handleClick()}>안녕</button>
      <button
        ref={enterEventRef}
        onClick={() => {
          console.log("Ref 연결 선택");
          toggle();
        }}
      >
        Enter 버튼
      </button>
      {playing ? <>Playing...</> : <>Stop</>}
    </div>
  );
}
