import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
const BASE_URL = "http://localhost:3001/contacts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default BASE_URL;
