import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "./feature/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {

  const dispatch = useDispatch();

  const userToken = Cookies.get("userToken")
  useEffect(() => {
    dispatch(fetchUserInfo(userToken));
  }, [dispatch, userToken]);


  
  return (
    <div className="App">
      <Router />
      <ToastContainer position="top-center" />
    </div>
    
  
    

  );
}

export default App;
