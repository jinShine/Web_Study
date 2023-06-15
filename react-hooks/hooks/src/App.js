import logo from "./logo.svg";
import "./App.css";
import useInput from "./hooks/1.useInput";
import useTabs from "./hooks/2.useTabs";
import useTitle from "./hooks/3.useTitle";

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
    </div>
  );
}

export default App;
