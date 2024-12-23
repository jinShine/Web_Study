import { createRoot } from "react-dom/client";
import App from "./App";

async function main() {
  const element = document.getElementById("root");

  if (!element) {
    return;
  }

  const root = createRoot(element);
  root.render(<App />);
}

main();
