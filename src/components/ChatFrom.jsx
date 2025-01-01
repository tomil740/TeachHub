import { useRef } from "react";

const ChatFrom = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input
        ref={inputRef}
        required
        type="text"
        className="message-input"
        placeholder="message... "
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatFrom;
