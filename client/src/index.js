import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css"; // ✅ Ensure this is correctly importing Tailwind styles
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
