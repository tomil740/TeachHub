import { useState } from "react";
import ChatbotIcon from "../components/ChatbotIcon";
import ChatFrom from "../components/ChatFrom";
import "./chatBot.css";
import ChatMessage from "../components/ChatMessage";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      author: role, // 'author' is expected, not 'role'
      content: text,
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { messages: formattedHistory }, // 'prompt' and 'messages' are required
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`,
        requestOptions,
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something Went Wrong");
      console.log(data);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: data.candidates[0]?.content || "No response." },
      ]);
    } catch (error) {
      console.error("Error:", error.message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          text: "I encountered an issue. Please try again later.",
        },
      ]);
    }
  };

  return (
    <article className="container">
      <section className="chatbot-popup">
        {/* chatbot header */}
        <section className="chat-header">
          <section className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">ChatBot</h2>
            <button type="button" className="material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </section>
        </section>

        {/* body */}
        <article className="chat-body">
          <section className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there ✋ <br /> How can I help you today?
            </p>
          </section>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </article>

        {/* chat footer */}
        <section className="chat-footer">
          <ChatFrom
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </section>
      </section>
    </article>
  );
};

export default ChatBot;
