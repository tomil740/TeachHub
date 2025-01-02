import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ChatBot from "../geminiChatBot/ChatBot";

export default function PopupGfg() {
  return (
    <div>
      <Popup trigger={<button> Chat </button>} position="right center">
        <ChatBot />
      </Popup>
    </div>
  );
}
