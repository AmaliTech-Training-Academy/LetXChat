import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "./feature/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { fetchChatRooms } from "./feature/chatRooms";


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
      <ToastContainer position="top-right" />
    </div>

    // <div>
    //   <h1>React Media Recorder</h1>
    //   <div className="button-flex">
    //     <button onClick={toggleRecordOption("audio")}>Record Audio</button>
    //   </div>
    //   {/* <div>{recordOption === "audio" && <AudioRecorder />}</div> */}
    //   <AudioRecorder />
    // </div>
  );
}

export default App;
