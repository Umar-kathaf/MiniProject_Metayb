import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Components/Context/CreateContext.jsx";
import { BrowserRouter } from "react-router-dom";

const userId = localStorage.getItem("userId")

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter userId = {userId}>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
