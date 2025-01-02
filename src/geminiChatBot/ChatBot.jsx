import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "../components/ChatbotIcon";
import ChatFrom from "../components/ChatFrom";
import "./chatBot.css";
import ChatMessage from "../components/ChatMessage";
import { chat } from "./initGemini";
import { companyInfo } from "../companyInfo";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: `Here is some information about our company: ${companyInfo}`,
    },
  ]);
  const chatBodyRef = useRef();
  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      author: role,
      content: text,
    }));

    // Combine companyInfo with chat history for context.
    const context = `
      Website Information: ${companyInfo}
      User Chat History: ${formattedHistory
        .map((msg) => `[${msg.author}]: ${msg.content}`)
        .join("\n")}
    `;

    try {
      const response = await chat(context);
      console.log(response);

      if (!response) throw new Error("No response from AI model.");

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: response },
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

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  });

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
        <article ref={chatBodyRef} className="chat-body">
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
