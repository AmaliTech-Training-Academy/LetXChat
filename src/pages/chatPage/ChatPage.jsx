import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ChatPage = ({chatRoom}) => {

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate('/chat');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <main className="w-[100vw]  lg:w-[60vw] flex flex-col">
      <ChatHead chatRoom={chatRoom} />
      <ChatMessage />
      <Input chatRoom={chatRoom} />
    </main>
  );
};

export default ChatPage;
