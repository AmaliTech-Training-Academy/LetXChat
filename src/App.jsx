import { createTheme } from "@mui/material";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import RegModal from "./components/regModal/RegModal";

import Home from "./pages/Home";
import ChatPage from "./pages/chatPage/ChatPage";

function App() {
  return (
    <div classfullname="App">
      {/* <RegModal /> */}
      {/* <SignUp /> */}
      {/*  <Home /> */}
      {/* <Login />     */}
      <ChatPage />
    </div>
  );
}

export default App;
