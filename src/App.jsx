import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";

function App() {
  return (
    <Router />
    <div className="App">
      <Router />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
