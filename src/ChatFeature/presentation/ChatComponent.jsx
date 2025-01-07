import { useState, useEffect, useRef } from "react";
import useMatchedChat from "../domain/useMatchedChat";
import LoadingDialog from "../presentation/util/LoadingDialog"; // Reusable loading dialog component
import { AuthenticatedUserState } from "../../AuthenticatedUserState";
import { useRecoilValue } from "recoil";
import { Link, NavLink, useParams } from "react-router-dom";
import useGetUserById from "../../MatchingFeature/domain/useGetUserById";
import calculateServicePrice from "../../userPage/domain/calculateServicePrice";
import UserHeader from "./UserHead";
import "../presentation/style/chat.css";







/*
Purpose: Manages a live chat between two matched users.
arguments:
user1Id: Represents the logged-in user's ID (current user's account).
user2Id: Represents the matched user's ID (the person the current user is chatting with).
closeChat: A function to close or exit the chat, passed as a prop.
Functionality:

Chat Initialization: The component listens for updates to the chat between the two users. If the chat doesn't exist, it * * *   initializes it in Firestore.
Real-Time Sync: The component listens to Firestore changes (new messages) and updates the UI accordingly.
Message Sending: The component allows the current user to send messages, which are appended to the chat document in Firestore.
User-Specific Chat: It fetches and displays messages in the order they were sent, ensuring each user’s messages are aligned appropriately in the UI.
*/

function ChatComponent() {
  const authenticatedUser = useRecoilValue(AuthenticatedUserState);
  const user1Id = authenticatedUser[1];
  const { id } = useParams();

  // Validation for the `id` parameter
  if (!id || id === "ChatManager") {
    return (
      <div className="chat-error">
        <h2>Invalid Chat</h2>
        <p>
          There seems to be an issue with the chat ID. Please go back and try
          again.
        </p>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  const { user, loading1, error1 } = useGetUserById(id);
  const [dealPrice, setDealPrice] = useState(user?.priceOfService);

  useEffect(() => {
    if (authenticatedUser[0]?.religion && user?.religion) {
      const price = calculateServicePrice(
        authenticatedUser[0].religion,
        user.religion,
        user.priceOfService,
      );
      setDealPrice(price);
    }
  }, [authenticatedUser[0]?.religion, user?.religion]);

  const [dealReqState, setDealReqState] = useState(false);
  const {
    chatState,
    sendMes,
    initDealReq,
    isLoadingChat,
    isLoadingSend,
    onLeaveChat,
  } = useMatchedChat(user1Id, id, setDealReqState);
  const [message, setMessage] = useState("");

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    return () => {
      onLeaveChat();
    };
  }, [onLeaveChat]);

  const handleSend = () => {
    if (message.trim()) {
      sendMes(message.trim());
      setMessage("");
    }
  };

  const handleScroll = () => {
    const container = chatMessagesRef.current;
    if (container) {
      const isBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsAtBottom(isBottom);
      setIsUserScrolling(true);
    }
  };

  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState, isAtBottom]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!isUserScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserScrolling]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        {/* Back Button */}
        <NavLink to="/chatContainer/ChatManger" className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="back-icon"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </NavLink>
        <UserHeader userId={id} />
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => initDealReq(dealPrice)}
            className="makeADealBtn"
          >
            Make a deal!
          </button>
        </div>
      </div>
      <>
        <div
          className="chat-messages"
          ref={chatMessagesRef}
          onScroll={handleScroll}
        >
          {isLoadingChat ? (
            <LoadingDialog
              isLoading={true}
              message="Loading chat messages..."
            />
          ) : (
            chatState.map((msg, idx) => (
              <div
                key={idx}
                className={`message-container ${msg.sender === user1Id ? "sent" : "received"}`}
                style={{
                  display: "flex",
                  flexDirection: msg.sender === user1Id ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <UserHeader userId={msg.sender} profileOnly={true} />
                <div
                  className={`message ${msg.sender === user1Id ? "sent" : "received"}`}
                  style={{
                    maxWidth: "70%",
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor:
                      msg.sender === user1Id ? "#dcf8c6" : "#ffffff",
                    color: "#333",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <small style={{ fontSize: "10px", color: "#666" }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoadingSend}
          />
          <button onClick={handleSend} disabled={isLoadingSend}>
            {isLoadingSend ? "Sending..." : "Send"}
          </button>
        </div>
      </>
    </div>
  );
}

export default ChatComponent;
