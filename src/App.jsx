import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
