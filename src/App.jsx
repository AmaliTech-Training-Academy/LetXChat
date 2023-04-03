import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <SignUp />
      <Home />
    </div>
  );
}

export default App;
