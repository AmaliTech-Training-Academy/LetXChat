import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";


function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
