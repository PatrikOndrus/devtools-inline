export async function initializeReactDevTools() {
  if (!window.opener) {
    // const uid = uuid.v1();

    const wall = {
      listen(listener) {
        window.addEventListener("message", (event) => {
          // if (event.data.uid === uid) {
          listener(event.data);
          // }
        });
      },
      send(event, payload) {
        window.parent.postMessage({ event, payload }, "*");
      },
    };

    const {
      activate: activateBackend,
      createBridge: createBackendBridge,
      initialize: initializeBackend,
    } = await import("react-devtools-inline/backend");

    const {
      createBridge: createFrontendBridge,
      createStore,
      initialize: createDevTools,
    } = await import("react-devtools-inline/frontend");

    // The dispatch needs to happen before initializing, so that the backend can already listen
    // Event.dispatch({ type: 'activate-react-devtools', uid });

    // @ts-ignore
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      try {
        // @ts-ignore We need to make sure that the existing chrome extension doesn't interfere
        delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      } catch (e) {
        /* ignore */
      }
    }
    // Call this before importing React (or any other packages that might import React).
    const rootElement = document.getElementById("root")!;
    const frontBridge = createFrontendBridge(rootElement, wall);
    const store = createStore(frontBridge);
    const DevTools = createDevTools(window, { bridge: frontBridge, store });
    console.log("INITIALIZED FRONTEND");

    initializeBackend(window);
    console.log("INITIALIZED BACKEND");
    activateBackend(window, {
      bridge: createBackendBridge(window, wall),
    });
    console.log("ACTIVATED BACKEND");

    return DevTools;
  }
}
