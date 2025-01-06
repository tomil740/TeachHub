import { useState, useEffect, useRef } from "react";
import useMatchedChat from "../domain/useMatchedChat";
import LoadingDialog from "../presentation/util/LoadingDialog"; // Reusable loading dialog component
import '../presentation/style/chat.css'
import UserHeader from "./UserHeader";
import { AuthenticatedUserState } from "../../AuthenticatedUserState";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import useGetUserById from "../../MatchingFeature/domain/useGetUserById";
import calculateServicePrice from "../../userPage/domain/calculateServicePrice";





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
  const { user, loading1, error1 } = useGetUserById(id);
  const [dealPrice,setDealPrice] = useState(user?.priceOfService)

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

  //scroll state controll
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom
  const [isUserScrolling, setIsUserScrolling] = useState(false); // Track if the user is scrolling
  const messagesEndRef = useRef(null); // Reference to the end of the chat messages
  const chatMessagesRef = useRef(null); // Reference to the chat messages container

  useEffect(() => {
    return () => {
      // Trigger `onLeaveChat` when the component unmounts
      onLeaveChat();
    };
  }, [onLeaveChat]);

  const handleSend = () => {
    if (message.trim()) {
      sendMes(message.trim());
      setMessage(""); // Clear input after sending
    }
  };

  // Handle scroll events to detect if the user is at the bottom or not
  const handleScroll = () => {
    const container = chatMessagesRef.current;
    if (container) {
      const isBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsAtBottom(isBottom);
      setIsUserScrolling(true); // User is manually scrolling
    }
  };

  // Scroll to the bottom when chatState updates or message is sent, if the user is at the bottom
  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState, isAtBottom]); // Run when chatState or isAtBottom changes

  // Scroll to the bottom initially when the component mounts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Only run on mount

  // After message send, ensure we scroll to the bottom if the user was at the bottom
  useEffect(() => {
    if (!isUserScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserScrolling]); // Only run when isUserScrolling changes

  return ( 
    <div className="chat-container">
      <div className="chat-header">
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
                {/* Show Profile Image for received messages */}
                  <UserHeader userId={msg.sender} profileOnly={true} />
               

                {/* Message Bubble */}
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
            disabled={isLoadingSend} // Disable input while sending
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
