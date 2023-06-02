import Message from "../message/Message";

const ChatMessage = () => {
  return (
    <section className="chat-message h-[80vh] w-full px-[5px] sm:px-[15px] py-[0.5rem] overflow-y-scroll">
      <Message />
    </section>
  );
};

export default ChatMessage;
