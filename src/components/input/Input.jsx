import { Box, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Mic from "../../assets/Microphone.png";
import Cam from "../../assets/camera.png";
import Send from "../../assets/Send.png";
import Emoji from "../../assets/Emoji.png";
import Attach from "../../assets/Attach.png";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsMicMute } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../feature/chatRoomSlice";
import { format } from "date-fns";
import { FiVideo } from "react-icons/fi";
import uploadVideo from "../../assets/uploadVideo.png";
import {
  CHATROOMS_URL,
  PUSHER_API_KEY,
  PUSHER_CLUSTER,
} from "../../defaultValues/DefaultValues";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled(Box)({
  height: "10vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  paddingInline: "30px",
  borderTop: "1px solid #D9D9D9",
  position: "relative",
});

const EmojiContainer = styled(Box)({
  position: "absolute",
  bottom: "85%",
  right: "70px",
});

const InputCon = styled("form")({
  background: "#DCDCDC",
  width: "100%",
  height: "50px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
  paddingLeft: "10px",
  // overflow: 'hidden'
});

const InputText = styled("textarea")({
  height: "50px",
  width: "66%",
  paddingLeft: "4px",
  background: "transparent",
  fontStyle: "Bold",
  color: "#FFFFFF",
  resize: "none",
  overflowY: "scroll",
  left: "5%",
  bottom: "0",
  zIndex: "30",
  paddingBlock: "0.5rem",
  "&::placeholder": {
    color: "#FFFFFF",
  },
  "&::-webkit-scrollbar": {
    width: "5px",
    backgroundColor: "#F5F5F5",
    // display: 'none'
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    backgroundColor: "#AAA",
  },
});

const FilesAndSend = styled("div")({
  display: "flex",
  gap: "14px",
  alignItems: "center",
});

const SendMessage = styled("button")({
  background: "#53352D",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = ({ chatRoom }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [recording, setRecording] = useState(false);
  const [voiceNoteData, setVoiceNoteData] = useState(null);
  // const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const addEmoji = (e) => {
    // setCurrentEmoji(e.native)
      const emoji = e.native
    setText(text + JSON.stringify(emoji));
  };

  // Close Emoji Container when clicked outside

  let emojiRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    // Initialize Pusher Js
    // const pusher = new Pusher(PUSHER_API_KEY, {
    //   cluster: PUSHER_CLUSTER,
    //   encrypted: true,
    // });
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      console.log(data);
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, []);

  // Send Message When your press Ctrl and enter key
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleSubmit(event);
    }
  };

  // Read File 
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Send Message
  const handleSubmit = async (event) => {
    event.preventDefault();

    const id = chatRoom.id;
    const userToken = Cookies.get("userToken");

    let formData = new FormData();
    formData.append("text", text);
    if (image) {
      const imageBase64 = await readFileAsBase64(image);
      formData.append('image', imageBase64);
    }

    if (video) {
      const videoBase64 = await readFileAsBase64(video);
      formData.append('video', videoBase64);
    }

    if (file) {
      const documentBase64 = await readFileAsBase64(file);
      formData.append("file", documentBase64);
    }
    // if (audioUrl) {
    //   const voiceNoteBase64 = await readFileAsBase64(recording);
    //   formData.append("voiceNote", voiceNoteBase64);
    // }

    let config = {
      method: "POST",
      url: `${CHATROOMS_URL}/${id}/message`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body: formData,
      // data: formData
    };
    console.log(video);

    axios(config)
      .then((res) => {
        console.log("Upload successful", res.data);
      })
      .catch((err) => {
        console.error("Upload failed", err.response.data);
      });
    setText("");
    setImage(null);
    setFile(null);
    setVideo(null);
    setVoiceNoteData(null);
  };


  const handleToggleRecording = async () => {
    if (recording) {
      mediaRecorder.stop();
      setRecording(false); // reset the recording state
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        let chunks = [];
        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });
        recorder.addEventListener("stop", async () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const base64Data = await readFileAsBase64(blob);
          setVoiceNoteData(base64Data);
        });
        setMediaRecorder(recorder);
        recorder.start();
        setRecording(true); // set the recording state
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  
  
  
  
  
  
  


  return (
    <Container component="section">
      {/* Show Emoji Container */}
      <div ref={emojiRef}>
        {showEmoji && (
          <EmojiContainer>
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={35}
              onEmojiSelect={addEmoji}
              maxFrequentRows={1}
            />
          </EmojiContainer>
        )}
      </div>

      <InputCon onSubmit={handleSubmit} method="post">
        <div
          style={{ cursor: "pointer", color: "#FFFFFF" }}
          onClick={handleToggleRecording}
        >
          {recording ? <BsMicMute /> : <img src={Mic} alt="Microphone" />}
          {/* <img src={Mic} alt="Microphone" /> */}
        </div>

        <InputText
          type="text"
          placeholder="start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <FilesAndSend>
          <div>
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(event) => setFile(event.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <img style={{ cursor: "pointer" }} src={Attach} alt="Send FIle" />
            </label>
          </div>

          <div>
            <input
              type="file"
              accept="video/*"
              id="video"
              style={{ display: "none" }}
              onChange={(event) => setVideo(event.target.files[0])}
            />
            <label htmlFor="video" style={{ cursor: "pointer" }}>
              <img src={uploadVideo} alt="video upload" />
            </label>
          </div>

          <div>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => setImage(event.target.files[0])}
            />
            <label htmlFor="image">
              <img style={{ cursor: "pointer" }} src={Cam} alt="" />
            </label>
          </div>

          <img
            style={{ cursor: "pointer" }}
            src={Emoji}
            alt="Emoji"
            onClick={() => setShowEmoji(!showEmoji)}
          />

          <SendMessage type="submit">
            <img src={Send} alt="Send message" />
          </SendMessage>
        </FilesAndSend>
      </InputCon>
    </Container>
  );
};

export default Input;
