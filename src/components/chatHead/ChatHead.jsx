// import { styled } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import { useNavigate } from "react-router";

// const Container = styled(Box)({
//   paddingInline: "52px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   height: "10vh",
//   borderBottom: "1px solid #D9D9D9",
// });

// const LeftSection = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   gap: "26px",
// });

// const Email = styled("a")({
//   fontStyle: "bold",
//   fontSize: "16px",
//   lineHeight: "19px",
//   color: "#ACACAC",
// });

// const ChatHead = ({ chatRoom }) => {

//   const navigate = useNavigate()


//   return (
//     <Container component="section">
//       <LeftSection component="section">
//         <img
//           src={chatRoom?.image}
//           style={{ width: "60px", height: "60px", borderRadius: "50%" }}
//           alt="Profile pic"
//         />
//         <Email>{chatRoom?.name}</Email>
//       </LeftSection>
//       <button
//         style={{
//           background: "gray",
//           color: "white",
//           padding: "0.2rem 0.5rem",
//           borderRadius: "20px",
//           fontSize: ".9rem",
//         }}
//         onClick={() => navigate('/chat')}
//       >
//         Go Back
//       </button>
//     </Container>
//   );
// };

// export default ChatHead;
