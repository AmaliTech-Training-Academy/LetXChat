import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "./feature/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Chat from "./pages/chat/Chat";
import { fetchChatRooms } from "./feature/chatRooms";
import ChatComponent from "./pages/ChatComponent";

function App() {
  const dispatch = useDispatch();

  // Get userInfo and chatrooms using userToken
  const userToken = Cookies.get("userToken");
  useEffect(() => {
    dispatch(fetchChatRooms(userToken));
  }, [dispatch, userToken]);

  return (
    <div className="App">
      <Router />
      {/* <Chat /> */}
      {/* <ChatComponent /> */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
