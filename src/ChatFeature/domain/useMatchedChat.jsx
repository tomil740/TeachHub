import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import initializeChat from "../data/initializeChat"; 
import { makeDealRequestObj } from "../data/makeDealRequestObj"; 
import updateUnreadStateById from '../data/updateUnreadStateById';
import { useSnackbar } from "../../../globalNotification/useSnackbar";

//should be deleted all of the all method...(onDealRequest)
function useMatchedChat(user1Id, user2Id,onDealRequest) {
  const { triggerSnackbar } = useSnackbar(); // Use the snackbar trigger function
  const [chatState, setChatState] = useState([]);

  const [isChatInitialized, setIsChatInitialized] = useState(false); // Track initialization
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(true); // Loading state for chat data

  //with sort we make sure to have predictable chat ID
  const chatId = [user1Id, user2Id].sort().join("-");
  const chatRef = doc(collection(db, "chats"), chatId); // Reference to the chat document

  useEffect(() => {
    const setupChat = async () => {
      // Initialize chat if not present
      if (!isChatInitialized) {
        await initializeChat(user1Id, user2Id); // Only initialize once
        setIsChatInitialized(true); // Mark chat as initialized
      }

      // Listen for updates to the chat document
      const unsubscribe = onSnapshot(chatRef, (docSnap) => {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          setChatState(chatData.messages || []);
          setIsLoadingChat(false); // Data loaded, set loading to false

          //onDealRequest(chatData.dealRequest);
        }
      });

      return () => unsubscribe(); // Cleanup listener
    };

    setupChat();
  }, [user1Id, user2Id, chatRef, isChatInitialized]);

  const sendMes = useCallback(
    async (text1) => {
      const newMessage = {
        sender: user1Id,
        text: text1,
        timestamp: Date.now(),
      };

      try {
        setIsLoadingSend(true); // Start loading
        const chatRef = doc(db, "chats", chatId);

        await updateDoc(chatRef, {
          messages: arrayUnion(newMessage),
        });

        console.log("Message sent successfully!");
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsLoadingSend(false); // End loading
      }
    },
    [chatRef, user1Id],
  );
  const initDealReq = useCallback(async (dealPrice) => {
    try {
      //creating new deal object
      const mes = await makeDealRequestObj(user1Id, user2Id, dealPrice);
      if(!mes.success){
        alert(`${mes.success}, ${mes.message}`);
      }
      if (mes.success) {
        updateUnreadStateById({
          userId: user1Id,
          keyIncrement: "your",
          triggerSnackbar: triggerSnackbar,
        });
        updateUnreadStateById({
          userId: user2Id,
          keyIncrement: "buyer",
          triggerSnackbar: triggerSnackbar,
        });
      }
    } catch (error) {
      alert("Failed to send deal request. Please try again.");
    }
  });

  return {
    chatState,
    sendMes,
    initDealReq,
    isLoadingChat,
    isLoadingSend,
  };
}

export default useMatchedChat;
