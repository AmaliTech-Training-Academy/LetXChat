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
  gap: "14px",
  paddingLeft: "15px",
  // overflowY: 'hidden'
});

const InputText = styled("textarea")({
  height: "50px",
  width: "75%",
  paddingLeft: "4px",
  background: "transparent",
  fontStyle: "Bold",
  color: "#FFFFFF",
  resize: "none",
  overflowY: "hidden",
  paddingBlock: "0.6rem",

  "&::placeholder": {
    color: "#FFFFFF",
  },
});

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

  // Record Audio
  // const recorder = new vmsg.Recorder({
  //   wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
  // });
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordings, setRecordings] = useState([]);

  const record = async () => {
    setIsLoading(true);

    if (isRecording) {
      const blob = await recorder.stopRecording();
      setIsLoading(false);
      setIsRecording(false);
      setRecordings.concat(URL.createObjectURL(blob));
    } else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setIsLoading(false);
        setIsRecording(true);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

    // let device = navigator.mediaDevices.getUserMedia({audio: true})
    // let chunks = []
    // let recorder;

    // device.then(stream => {
    //   recorder = new MediaRecorder(stream)

    //   recorder.ondataavailable = e => {
    //     chunks.push(e.data)
    //     if (recorder.state == 'inactive') {
    //       let blob = new Blob(chunks, {type: 'audio/webm'})
    //       setRecordings.concat(URL.createObjectURL(blob));
    //     }
    //   }

    //   recorder.start(1000)
    // })

    // setTimeout(() => {
    //   recorder.stop()
    // }, 4000)

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

  // Socket Io
  const CUSTOM_URL = "http://localhost:4000";
  const socket = io.connect(`${CUSTOM_URL}`);

  const [messageReceived, setMessageReceived] = useState("");

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {

  //   });
  // }, [socket]);

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
          onClick={record}
        >
          {isRecording ? <BsMicMute /> : <img src={Mic} alt="Microphone" />}
        </button>
        <InputText
          type="text"
          placeholder="start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

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
      </InputCon>
    </Container>
  );
};

export default Input;
