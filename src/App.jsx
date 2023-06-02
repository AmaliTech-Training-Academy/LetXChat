import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router from "./routes/Router";
import SignUp from "./components/signup/SignUp";
import { Avatar } from "./shared";

function App() {
  return (
    <div className="App">
      {/* <Router /> */}
      <SignUp />
      <Avatar/>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
