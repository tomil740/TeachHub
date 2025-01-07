import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  runTransaction,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import updateUnreadStateById from '../data/updateUnreadStateById';
import { useSnackbar } from "../../../globalNotification/useSnackbar";
import initializeChat from "../data/initializeChat";
import { makeDealRequestObj } from "../data/makeDealRequestObj";
import { toast } from "react-toastify"; 

//should be deleted all of the all method...(onDealRequest)
function useMatchedChat(user1Id, user2Id, onDealRequest) {
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
        const globalUnreadRef = doc(db, "userUnreadCounters", user2Id); // user2Id is the other user's ID

        await runTransaction(db, async (transaction) => {
          // Get the current chat document
          const chatSnapshot = await transaction.get(chatRef);
          if (!chatSnapshot.exists()) {
            throw new Error("Chat document does not exist!");
          }

          const chatData = chatSnapshot.data();
          const currentUnreadCount = chatData?.unreadCounts?.[user2Id] || 0;

          // Get the global unread document
          const globalUnreadSnapshot = await transaction.get(globalUnreadRef);
          const globalUnreadCount = globalUnreadSnapshot.exists()
            ? globalUnreadSnapshot.data().unreadChats || 0
            : 0;

          // Update the chat document
          transaction.update(chatRef, {
            messages: arrayUnion(newMessage),
            lastInteraction: serverTimestamp(),
            [`unreadCounts.${user2Id}`]: currentUnreadCount + 1,
          });

          // Update the global unread counter if needed
          if (currentUnreadCount === 0) {
            transaction.set(
              globalUnreadRef,
              { unreadChats: globalUnreadCount + 1 },
              { merge: true }, // Merge to avoid overwriting other fields
            );
          }
        });

        console.log("Message sent successfully with all related updates!");
      } catch (error) {
        console.error("Failed to send message with updates:", error);
      } finally {
        setIsLoadingSend(false); // End loading
      }
    },
    [chatId, user1Id, user2Id], // Dependencies
  );

  const onLeaveChat = useCallback(async () => {
    try {
      const chatRef = doc(db, "chats", chatId);
      const globalUnreadRef = doc(db, "userUnreadCounters", user1Id);

      await runTransaction(db, async (transaction) => {
        // Step 1: Read all necessary data
        const chatSnapshot = await transaction.get(chatRef);
        if (!chatSnapshot.exists()) {
          throw new Error("Chat document does not exist!");
        }

        const chatData = chatSnapshot.data();
        const currentUnreadCount = chatData?.unreadCounts?.[user1Id] || 0;

        const globalUnreadSnapshot = await transaction.get(globalUnreadRef);
        const globalUnreadCount = globalUnreadSnapshot.exists()
          ? globalUnreadSnapshot.data().unreadChats || 0
          : 0;

        // Step 2: Write updates if necessary
        if (currentUnreadCount > 0) {
          transaction.update(chatRef, {
            [`unreadCounts.${user1Id}`]: 0,
          });

          if (globalUnreadCount > 0) {
            transaction.update(globalUnreadRef, {
              unreadChats: globalUnreadCount - 1,
            });
          }
        }
      });

      console.log("Successfully handled onLeaveChat!");
    } catch (error) {
      console.error("Failed to handle onLeaveChat:", error);
    }
  }, [user1Id, chatId, db]);

  

  const initDealReq = useCallback(async (dealPrice) => {
    try {
      //creating new deal object
      const mes = await makeDealRequestObj(user1Id, user2Id, dealPrice);
      if (!mes.success) {
        toast.error(mes.message);
      }
      if (mes.success) {
        toast.success(mes.message);
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
      toast.error("Failed to send deal request. Please try again.");
    }
  });

  return {
    chatState,
    sendMes,
    initDealReq,
    isLoadingChat,
    isLoadingSend,
    onLeaveChat,
  };
}

export default useMatchedChat;
