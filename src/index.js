import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.ConcurrentMode>
    <App />
  </React.ConcurrentMode>,
  document.getElementById("js-app")
);
