/* eslint-disable import/first */

import {
  activate as activateBackend,
  createBridge as createBackendBridge,
  initialize as initializeBackend,
} from "react-devtools-inline/backend";

initializeBackend(window); // Before import React
console.log("BACKEND INITIALIZED!");

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import wall from "./wall";

const bridge = createBackendBridge(window, wall);

wall.listen((data) => {
  console.log(data);
});

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Call this only once the frontend has been initialized.
activateBackend(window, { bridge });
console.log("BACKEND ACTIAVTED!");
