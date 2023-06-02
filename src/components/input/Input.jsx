// import { Box, styled } from "@mui/material";
// import React, { useEffect, useRef, useState } from "react";
// import Mic from "../../assets/Microphone.png";
// import Cam from "../../assets/camera.png";
// import Send from "../../assets/Send.png";
// import Emoji from "../../assets/Emoji.png";
// import Attach from "../../assets/Attach.png";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { BsMicMute } from "react-icons/bs";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import uploadVideo from "../../assets/uploadVideo.png";
// import { format } from "date-fns";
// import { CHATROOMS_URL } from "../../defaultValues/DefaultValues";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { v4 as uuidv4 } from 'uuid';

// const Container = styled(Box)({
//   height: "10vh",
//   width: "100%",
//   display: "flex",
//   alignItems: "center",
//   paddingInline: "30px",
//   borderTop: "1px solid #D9D9D9",
//   position: "relative",
// });

// const EmojiContainer = styled(Box)({
//   position: "absolute",
//   bottom: "85%",
//   right: "70px",
// });

// const InputCon = styled("form")({
//   background: "#DCDCDC",
//   width: "100%",
//   height: "50px",
//   borderRadius: "50px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   gap: "14px",
//   paddingLeft: "10px",
//   // overflow: 'hidden'
// });

// const InputText = styled("textarea")({
//   height: "50px",
//   width: "66%",
//   paddingLeft: "4px",
//   background: "transparent",
//   fontStyle: "Bold",
//   color: "rgba(83, 53, 45, 0.7)",
//   resize: "none",
//   overflowY: "scroll",
//   left: "5%",
//   bottom: "0",
//   zIndex: "30",
//   paddingBlock: "10px",

//   "&::placeholder": {
//     color: "#FFFFFF",
//   },
//   "&::-webkit-scrollbar": {
//     width: "5px",
//     backgroundColor: "#F5F5F5",
//     // display: 'none'
//   },
//   "&::-webkit-scrollbar-thumb": {
//     borderRadius: "5px",
//     backgroundColor: "#AAA",
//   },
// });

// const FilesAndSend = styled("div")({
//   display: "flex",
//   gap: "14px",
//   alignItems: "center",
// });

// const Input = ({ chatRoom }) => {
//   const [showEmoji, setShowEmoji] = useState(false);

//   const [text, setText] = useState("");
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [recording, setRecording] = useState(false);
//   const [setAudioUrl] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioBlob, setAudioBlob] = useState(null);

// const dispatch = useDispatch()

//   const addEmoji = (e) => {
//     setText(text + e.native);
//   };


//   const {userInfo} = useSelector(state => state.user)
//   const username = userInfo.username.slice(1)
//   const url = userInfo.image
//   const basePath = "https://takoraditraining.com/LetXChat/storage/app/public/";
//   const filePath = url.replace(basePath, "");
//   const userImage = filePath

//   // Close Emoji Container when clicked outside

//   let emojiRef = useRef();

//   useEffect(() => {
//     let handler = (e) => {
//       if (!emojiRef.current.contains(e.target)) {
//         setShowEmoji(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   });

//   // Send Message When your press enter key
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && event.shiftKey) {
//       setText(text + "");
//     } else if (event.key === "Enter") {
//       handleSubmit(event);
//     }
//   };

//   const handleStartRecording = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const newMediaRecorder = new MediaRecorder(stream);
//       setMediaRecorder(newMediaRecorder);
//       newMediaRecorder.start();
//       setRecording(true);

//       let chunks = [];
//       newMediaRecorder.addEventListener("dataavailable", (event) => {
//         chunks.push(event.data);
//       });

//       newMediaRecorder.addEventListener("stop", () => {
//         const newAudioBlob = new Blob(chunks, { type: "audio/webm" });
//         setAudioBlob(newAudioBlob);
//         // setAudioUrl(URL.createObjectURL(newAudioBlob));
//       });
//     });
//   };
//   const handleStopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleVideoChange = (event) => {
//     setVideo(event.target.files[0]);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };
//   const userToken = Cookies.get("userToken");

//   // Send Message
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const id = chatRoom.id;

//     try {
//       const fileName = `audio-${Date.now()}.webm`;
//       let formData = new FormData();
//       const currentTimestamp = new Date();
//       const messageId = uuidv4();


//       setIsSubmitting(true);

//       if (audioBlob) {
//         formData.append("voiceNote", audioBlob, fileName);
//       }

//       formData.append("id", messageId);
//       formData.append("text", text);
//       formData.append("video", video);
//       formData.append("file", file);
//       formData.append("image", image);

//       let config = {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       };

//       const res = await axios.post(
//         `${CHATROOMS_URL}/${id}/message`,
//         formData,
//         config
//       );



//       setText("");
//       setImage(null);
//       setFile(null);
//       setVideo(null);
//       setAudioBlob(null);
//       // setAudioUrl(null);
//       setIsSubmitting(false);


  

//     } catch (err) {
//       console.error("Upload failed", err);
//     }
//   };

  

//   return (
//     <Container component="section">
//       {/* Show Emoji Container */}
//       <div ref={emojiRef}>
//         {showEmoji && (
//           <EmojiContainer>
//             <Picker
//               data={data}
//               emojiSize={20}
//               emojiButtonSize={35}
//               onEmojiSelect={addEmoji}
//               maxFrequentRows={1}
//             />
//           </EmojiContainer>
//         )}
//       </div>

//       <InputCon onSubmit={handleSubmit} method="post">
//         <div style={{ cursor: "pointer", color: "#FFFFFF" }}>
//           {recording ? (
//             <BsMicMute onClick={handleStopRecording} />
//           ) : (
//             <img src={Mic} alt="Microphone" onClick={handleStartRecording} />
//           )}
//         </div>

//         <InputText
//           type="text"
//           placeholder="start typing..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />

//         <FilesAndSend>
//           <div>
//             <input
//               type="file"
//               id="file"
//               accept=".txt,.pdf,.doc,.docx,.xls,.xlsx"
//               onChange={handleFileUpload}
//               style={{ display: "none" }}
//             />
//             <label htmlFor="file">
//               <img style={{ cursor: "pointer" }} src={Attach} alt="Send FIle" />
//             </label>
//           </div>

//           <div>
//             <input
//               type="file"
//               accept="video/*"
//               id="video"
//               style={{ display: "none" }}
//               onChange={handleVideoChange}
//             />
//             <label htmlFor="video" style={{ cursor: "pointer" }}>
//               <img src={uploadVideo} alt="video upload" />
//             </label>
//           </div>

//           <div>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={handleImageChange}
//             />
//             <label htmlFor="image">
//               <img style={{ cursor: "pointer" }} src={Cam} alt="" />
//             </label>
//           </div>

//           <img
//             style={{ cursor: "pointer" }}
//             src={Emoji}
//             alt="Emoji"
//             onClick={() => setShowEmoji(!showEmoji)}
//           />

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`bg-[#53352D] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center ${
//               isSubmitting ? "cursor-wait" : ""
//             }`}
//           >
//             {isSubmitting ? (
//               <AiOutlineClockCircle className="text-white text-2xl" />
//             ) : (
//               <img
//                 src={Send}
//                 alt="Send message"
//                 className="scale-95 hover:scale-110 transition duration-300 ease-in-out"
//               />
//             )}
//           </button>
//         </FilesAndSend>
//       </InputCon>
//     </Container>
//   );
// };

// export default Input;
