import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Header } from "./components/body/Header/header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);
