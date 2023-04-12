import { Box, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Mic from "../../assets/Microphone.png";
import Cam from "../../assets/Camera.png";
import Send from "../../assets/Send.png";
import Emoji from "../../assets/Emoji.png";
import Attach from "../../assets/Attach.png";
import io from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsMicMute } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../feature/chatRoomSlice";
import socketIOClient from "socket.io-client";
import { format } from "date-fns";
import { FiVideo } from "react-icons/fi";
import { BASE_URL } from "../../defaultValues/DefaultValues";

const Container = styled(Box)({
  height: "12vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  paddingInline: "70px",
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
  position: "relative",
});

const InputText = styled("textarea")({
  height: "50px",
  width: "73%",
  paddingLeft: "4px",
  background: "transparent",
  fontStyle: "Bold",
  color: "#FFFFFF",
  resize: "none",
  overflowY: "scroll",
  position: "absolute",
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
});

const Input = () => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const CHAT_URL = `${BASE_URL}/chatroom/1/message`
  // const socket = socketIOClient(CHAT_URL);
  const socket = socketIOClient("http://localhost:4000");

  const addEmoji = (e) => {
    // setCurrentEmoji(e.native)
    setText(text + e.native);
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

  // Send Message
  const handleSubmit = (event) => {
    event.preventDefault();


    const timestamp = format(new Date(), "h:mm a");

    const message = {
      id: Date.now(),
      time: timestamp,
      sender: userInfo.name,
      text: text,
      voiceNote: audioUrl,
      image: image,
      video: video,
      file: file,
    };

    const formData = new FormData()
    formData.append("message", text)
    formData.append("voiceNote", audioUrl)
    formData.append("image", image)
    formData.append("video", video)

    dispatch(addMessage(message));
    socket.emit("chat", formData);

    setText("");
    setImage(null);
    setFile(null);
    setVideo(null)
    setAudioUrl(null)
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleToggleRecording = () => {
    if (recording) {
      mediaRecorder.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          let chunks = [];
          recorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
          });
          recorder.addEventListener('stop', () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            const url = URL.createObjectURL(blob);
            setAudioBlob(blob);
            setAudioUrl(url);
          });
          setMediaRecorder(recorder);
          recorder.start();
        })
        .catch(error => {
          console.error(error);
        });
    }
    setRecording(!recording);
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
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

      <InputCon onSubmit={handleSubmit}>

        <div style={{ cursor: "pointer", color: '#FFFFFF' }} onClick={handleToggleRecording}>
          {recording ? <BsMicMute /> : <img src={Mic} alt="Microphone" />}
          {/* <img src={Mic} alt="Microphone" /> */}
        </div>

       

        <InputText
          type="text"
          placeholder="start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <FilesAndSend>
          <div>
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
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
              onChange={handleVideoChange}
            />
            <label htmlFor="video">
              <FiVideo style={{ cursor: "pointer", color: '#FFFFFF', fontSize: '1.5rem' }} />
            </label>
          </div>

          <div>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
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
            <img src={Send} style={{ width: "90%" }} alt="Send message" />
          </SendMessage>
        </FilesAndSend>
      </InputCon>
    </Container>
  );
};

export default Input;
