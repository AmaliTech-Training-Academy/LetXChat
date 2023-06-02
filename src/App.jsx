import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router from "./routes/Router";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      {/* <Router /> */}
      <Login />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
