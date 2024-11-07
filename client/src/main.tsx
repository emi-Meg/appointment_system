import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

async function deferRender() {
  const { worker } = await import("./Mocks/Browser");
  return worker.start();
}

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

deferRender().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )
})