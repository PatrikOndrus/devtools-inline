pnpm install

pnpm dev

https://github.com/facebook/react/tree/main/packages/react-devtools-inline

CodeSandbox inline-devtools init:
https://github.com/codesandbox/codesandbox-client/tree/master/packages/app/src/sandbox/eval/presets/create-react-app/utils

Codesandbox demo:
https://codesandbox.io/s/compassionate-mendel-fhjp9y?file=/src/App.tsx

Problems:
neukazovat frontend devtools inak sa shutdowne bridge a prestanu komunikovat aj ked dame frontend devtools do iframu. Nedostaneme store object v tom pripade _idToElement, _roots, _rootIDToRenderID… nemame

Vedeli by sme callnut REACT_DEVTOOLS_GLOBALHOOK napr.
REACT_DEVTOOLS_GLOBALHOOK.rendererInterfaces.get(rendererID).findNativeNodesForFiberID(id)) 
ked tam frontend devtools nedame mame bridge a store object ale neviem ci mame z toho potom az taky uzitok
