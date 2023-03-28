import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import RegModal from "./components/regModal/RegModal";


function App() {
  return (
    <div className="App">
      <RegModal />
      <SignUp />
    </div>
  );
}

export default App;
