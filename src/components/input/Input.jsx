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
              // onClickOutside={(e) =>setShowEmoji(e.false)}
            />
          </EmojiContainer>
        )}
      </div>

      <InputCon>
        <img style={{ cursor: "pointer" }} src={Mic} alt="Microphone" />
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
