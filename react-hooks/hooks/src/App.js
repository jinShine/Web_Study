import "./App.css";
import useInput from "./hooks/1.useInput";
import useTabs from "./hooks/2.useTabs";
import useTitle from "./hooks/3.useTitle";
import useClick from "./hooks/4.useClick";
import useHover from "./hooks/5.useHover";

const contents = [
  {
    tab: "Section 1",
    content: "Section 1의 Content",
  },
  {
    tab: "Section 2",
    content: "Section 2의 Content",
  },
];

function App() {
  // const maxLen = (value) => value.length < 10;
  // const name = useInput("Mr.", maxLen);
  const validator = (value) => !value.includes("@");
  const name = useInput("Mr.", validator);

  const { currentItem, changeItem } = useTabs(0, contents);

  const titleUpdater = useTitle("Loading...");

  const sayHello = () => alert("안녕?");
  const clicker = useClick(sayHello);

  const hoverEvent = () => alert("Mouse enter");
  const hoverer = useHover(hoverEvent);

  return (
    <div className="App">
      <div>
        <h2>[ useInput ]</h2>
        <h3>{name.value}</h3>
        <input type="text" placeholder="Name" value={name.value} onChange={name.onChange} />

        {/* 또 다른 방법 */}
        <input type="text" placeholder="Name" {...name} />
      </div>

      <div>
        <br />
        --------------------------------
        <br />
      </div>

      <div>
        <h2>[ useTab ]</h2>
        <div>
          {contents.map((section, index) => (
            <button onClick={() => changeItem(index)}>{section.tab}</button>
          ))}
        </div>
        <div>{currentItem.content}</div>
      </div>

      <div>
        <br />
        --------------------------------
        <br />
      </div>

      <div>
        <h2>[ useTitle ]</h2>
        <div>{titleUpdater.title}</div>
        <div>
          <button
            onClick={() => {
              setTimeout(() => {
                titleUpdater.update("Home");
              }, 2000);
            }}
          >
            Title 변경하기
          </button>
        </div>
      </div>

      <div>
        <br />
        --------------------------------
        <br />
      </div>

      <div>
        <h2>[ useClick ]</h2>
        <h3 ref={clicker}>클릭해볼래?</h3>
      </div>

      <div>
        <br />
        --------------------------------
        <br />
      </div>

      <div>
        <h2>[ useHover ]</h2>
        <h3 ref={hoverer}>마우스 올려볼래?</h3>
      </div>
    </div>
  );
}

export default App;
