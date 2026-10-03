import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

import App from "./App";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />

    <Toaster position="top-right" />
  </AuthProvider>,
);
