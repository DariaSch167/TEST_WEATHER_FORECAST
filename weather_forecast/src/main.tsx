import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CityDataProvider } from "./context/CityDataContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CityDataProvider>
      <App />
    </CityDataProvider>
  </StrictMode>
);
