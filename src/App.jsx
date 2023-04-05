import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
 
      <Login /> 
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
