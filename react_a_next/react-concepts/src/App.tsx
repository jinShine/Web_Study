import React, { Suspense, useState } from "react";
import "./App.css";

const LazyLogin = React.lazy(() => import("./dynamic-import"));

function App() {
  const [visible, setVisible] = useState(false);

  const handleDynamicImport = () => {
    setVisible(true);
  };

  return (
    <>
      <button onClick={handleDynamicImport}>dynamic import</button>
      <Suspense fallback={<div>Loading...</div>}>
        {visible && <LazyLogin />}
      </Suspense>
    </>
  );
}

export default App;
