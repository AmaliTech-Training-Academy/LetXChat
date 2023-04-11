import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/chat" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
