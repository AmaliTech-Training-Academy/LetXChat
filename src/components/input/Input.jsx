import React, { useEffect, useRef, useState } from "react";
import Mic from "../../assets/Microphone.png";
import Cam from "../../assets/camera.png";
import Send from "../../assets/Send.png";
import Emoji from "../../assets/Emoji.png";
import Attach from "../../assets/Attach.png";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsMicMute } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import uploadVideo from "../../assets/uploadVideo.png";
import { format } from "date-fns";
import { CHATROOMS_URL } from "../../defaultValues/DefaultValues";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Input = ({ chatRoom }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recording, setRecording] = useState(false);
  const [setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

const dispatch = useDispatch()

  const addEmoji = (e) => {
    setText(text + e.native);
  };


  const {userInfo} = useSelector(state => state.user)
  const username = userInfo.username.slice(1)
  const url = userInfo.image
  const basePath = "https://takoraditraining.com/LetXChat/storage/app/public/";
  const filePath = url.replace(basePath, "");
  const userImage = filePath

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

  // Send Message When your press enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      setText(text + "");
    } else if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);
      newMediaRecorder.start();
      setRecording(true);

      let chunks = [];
      newMediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      newMediaRecorder.addEventListener("stop", () => {
        const newAudioBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(newAudioBlob);
        // setAudioUrl(URL.createObjectURL(newAudioBlob));
      });
    });
  };
  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
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

    const id = chatRoom.id;

    try {
      const fileName = `audio-${Date.now()}.webm`;
      let formData = new FormData();
      const currentTimestamp = new Date();
      const messageId = uuidv4();


      setIsSubmitting(true);

      if (audioBlob) {
        formData.append("voiceNote", audioBlob, fileName);
      }

      formData.append("id", messageId);
      formData.append("text", text);
      formData.append("video", video);
      formData.append("file", file);
      formData.append("image", image);

      let config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(
        `${CHATROOMS_URL}/${id}/message`,
        formData,
        config
      );



      setText("");
      setImage(null);
      setFile(null);
      setVideo(null);
      setAudioBlob(null);
      // setAudioUrl(null);
      setIsSubmitting(false);


  

    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  

  return (
    <section className="h-[10vh] w-full flex items-center px-[5px] sm:px-[30px] border-t border-[#D9D9D9] relative">
      {/* Show Emoji Container */}
      <div ref={emojiRef}>
        {showEmoji && (
          <div className="absolute bottom-[85%] right-[70px]">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={35}
              onEmojiSelect={addEmoji}
              maxFrequentRows={1}
            />
          </div>
        )}
      </div>

      <form className="bg-[#DCDCDC] w-full h-[50px] rounded-[50px] flex items-center justify-between gap-[8px] sm:gap-[14px] sm:pl-[10px]" onSubmit={handleSubmit} method="post">
        <div style={{ cursor: "pointer", color: "#FFFFFF" }}>
          {recording ? (
            <BsMicMute onClick={handleStopRecording} />
          ) : (
            <img src={Mic} alt="Microphone" onClick={handleStartRecording} />
          )}
        </div>

        <textarea
        className="textarea h-[50px] w-[66%] sm:pl-[4px] bg-transparent font-bold text-hoverColor resize-none overflow-y-scroll left-[5%] bottom-0 z-30 py-[10px] placeholder:text-white"
          type="text"
          placeholder="start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex gap-[14px] items-center">
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
        </div>
      </form>
    </section>
  );
};

export default Input;
