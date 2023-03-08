import produce from "immer";
import "./App.css";
import { useCallback, useRef, useState } from "react";

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // 변경 전
      // setForm({
      //   ...form,
      //   [name]: value,
      // });

      // 변경 후
      setForm(
        produce(form, (draft) => {
          draft[name] = value;
        })
      );

      // 첫번째 파라미터가 useState의 함수 형태라면 생략 가능
      // setForm(produce(draft => {
      //   draft[name] = value
      // }))
    },
    [form]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      // 변경 전
      // setData({
      //   ...data,
      //   array: data.array.concat(info),
      // });

      // 변경 후
      setData(
        produce(data, (draft) => {
          draft.array.push(info);
        })
      );

      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  const onRemove = useCallback(
    (id) => {
      // setData({
      //   ...data,
      //   array: data.array.filter((info) => info.id !== id),
      // });

      setData(
        produce(data, (draft) => {
          let index = draft.array.findIndex((info) => info.id === id);
          draft.array.splice(index, 1);
        })
      );
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="아이디" value={form.username} onChange={onChange} />
        <input name="name" placeholder="이름" value={form.name} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
