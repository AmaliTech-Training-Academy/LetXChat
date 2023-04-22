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
import { AiOutlineClockCircle } from "react-icons/ai";
import uploadVideo from "../../assets/uploadVideo.png";

import { CHATROOMS_URL } from "../../defaultValues/DefaultValues";
import Cookies from "js-cookie";
import axios from "axios";
import { setRecordedAudio } from "../../feature/audioSlice";
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

const Input = ({ chatRoom }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [recording, setRecording] = useState(false);
  const [newBlob, setNewBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  // const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const dispatch = useDispatch();

  console.log(newBlob);
  console.log(audio);
  useEffect(() => {
    dispatch(setRecordedAudio(audio));

  }, [audio])

  const addEmoji = (e) => {
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

  // Send Message When your press Ctrl and enter key
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleSubmit(event);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
      setRecording(true);
      const media = new MediaRecorder(stream, { type: "audio/webm" });
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  console.log(recording);

  const handleStopRecording = () => {
    setRecording(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      setNewBlob(audioBlob)
      console.log(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioUrl);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const userToken = Cookies.get("userToken");

  // Send Message
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const id = chatRoom.id;

    try {
      let formData = new FormData();
      formData.append("text", text);
      formData.append("voiceNote", newBlob);
      formData.append('audioUrl', audioUrl)
      formData.append("video", video);
      formData.append("file", file);
      formData.append("image", image);



      let config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
          // Accept: "application/json",
        },
      };

      const res = await axios.post(
        `${CHATROOMS_URL}/${id}/message`,
        formData,
        config
      );

      setText("");
      setImage("");
      setFile(null);
      setAudio(null)
      setVideo(null);
      setNewBlob(null)
      setAudioUrl(null);
      setSelectedFile(null);
      setIsSubmitting(false);
    } catch (err) {
      console.error("Upload failed", err.response.data);
    }
  };

  useEffect(() => {
    return () => {
      if (audioUrl) {
        dispatch(setRecordedAudio(audioUrl));
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

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
        <div style={{ cursor: "pointer", color: "#FFFFFF" }}>
          {recording ? (
            <BsMicMute onClick={handleStopRecording} />
          ) : (
            <img src={Mic} alt="Microphone" onClick={handleStartRecording} />
          )}
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
              accept=".txt,.pdf,.doc,.docx,.xls,.xlsx"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#53352D] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center ${
              isSubmitting ? "cursor-wait" : ""
            }`}
          >
            {isSubmitting ? (
              <AiOutlineClockCircle className="text-white text-2xl" />
            ) : (
              <img
                src={Send}
                alt="Send message"
                className="scale-95 hover:scale-110 transition duration-300 ease-in-out"
              />
            )}
          </button>
        </FilesAndSend>
      </InputCon>
      {audio && (
        <>
          <audio src={audio} controls />
          <button
            onClick={() => {
              setAudioUrl(null);
              setSelectedFile(null);
            }}
          >
            Reset Audio
          </button>
        </>
      )}
    </Container>
  );
};

export default Input;
