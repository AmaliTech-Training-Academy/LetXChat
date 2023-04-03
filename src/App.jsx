import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import RegModal from "./components/regModal/RegModal";

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      {/* <RegModal /> */}
      {/* <SignUp /> */}
      {/*  <Home /> */}
      <Login />    
    </div>
  );
}

export default App;
