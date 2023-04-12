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
import vmsg from "vmsg";
import {BsMicMute} from 'react-icons/bs'

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

const InputCon = styled("div")({
  background: "#DCDCDC",
  width: "100%",
  height: "50px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: 'space-between',
  gap: "14px",
  paddingLeft: "10px",
  position: 'relative'
});

const InputText = styled("textarea")({

  height: '50px',
  width: "73%",
  paddingLeft: "4px",
  background: "transparent",
  fontStyle: "Bold",
  color: "#FFFFFF",
  resize: "none",
  overflowY: "scroll",
  position: 'absolute',
  left: '5%',
  bottom: '0',
  zIndex: '30',
  paddingBlock: '0.5rem',
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

const FilesAndSend = styled('div')({
  display: 'flex',
  gap: "14px",
  alignItems: 'center'
})

const SendMessage = styled("button")({
  background: "#53352D",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  cursor: "pointer",
});

const Input = ({ sendMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordings, setRecordings] = useState([]);


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


<ul>
  {
    recordings.map(url => (
      <li key={url}>
        <audio src={url} controls></audio>
      </li>
    ))
  }
</ul>

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

      <InputCon>
        <button
          style={{ cursor: "pointer" }}
          disabled={isLoading}
          // onClick={record}
        >
          {/* {isRecording ? <BsMicMute /> : <img src={Mic} alt="Microphone" />} */}
          <img src={Mic} alt="Microphone" />
        </button>
        <InputText
          type="text"
          placeholder="start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

       <FilesAndSend>
       <div>
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img style={{ cursor: "pointer" }} src={Attach} alt="Send FIle" />
          </label>
        </div>

        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ display: "none" }}
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
        <SendMessage>
          <img
            src={Send}
            style={{ width: "90%" }}
            alt="Send message"
            onClick={() => {
              sendMessage(text, setText);
            }}
          />
        </SendMessage>
       </FilesAndSend>
      </InputCon>
    </Container>
  );
};

export default Input;
