import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  createBridge as createFrontendBridge,
  createStore,
  initialize as createDevTools,
} from "react-devtools-inline/frontend";
import wall from "./wall";

const rootElement = document.getElementById("root")!;
const bridge = createFrontendBridge(rootElement, wall);
const store = createStore(bridge);
const DevTools = createDevTools(window, { bridge, store });
console.log("FRONTEND INITIALIZED!");

const App = () => {
  const [count, setCount] = useState<number>(1);
  const [anounterCount, setAnotherCount] = useState<number>(100);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={() => {
              setCount((count) => count + 1);
              wall.send({ event: "OK", payload: count });
            }}
          >
            count is: {count}
          </button>
          <button
            type="button"
            onClick={() =>
              setAnotherCount((anounterCount) => anounterCount + 1)
            }
          >
            setAnotherCount is: {anounterCount}
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(store);
              // wall.send({ event: "GetDevTools", payload: "" });
            }}
          >
            Get Newest DevTools In Console
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <DevTools />
    </div>
  );
};

export default App;
