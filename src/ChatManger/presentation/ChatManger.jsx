import UserHeader from '../../ChatFeature/presentation/UserHeader';
import { AuthenticatedUserState } from '../../AuthenticatedUserState';
import { useRecoilValue} from "recoil";
import useChatsManager from '../domain/useChatsManager';
import { formatTimestamp } from '../domain/util/formatTimestamp';
import "./style/chatManger.css" 
import { Link } from 'react-router-dom';


function ChatManager() {
  const authenticatedId = useRecoilValue(AuthenticatedUserState)[1];
  const {
    data: chats,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useChatsManager(authenticatedId);

  // Load more chats when the user scrolls to the bottom of the list
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage && !loading) {
      fetchNextPage();
    }
  };

  return (
    <div className="chat-manager" onScroll={handleScroll}>
      <div className="chat-manager-header">
        <h2>Chats</h2>
      </div>
      {loading && <div className="chat-loading">Loading chats...</div>}
      {error && <div className="chat-error">Error: {error.message}</div>}
      <div className="chat-list">
        {chats?.map((chat) => {
          const otherUserId = chat?.userIds?.find(
            (id) => id !== authenticatedId,
          );

          return (
            <Link to={`/chatContainer/chat/${otherUserId}`} key={chat.id}>
              <div
                className={`chat-item ${chat.unreadCounts[authenticatedId] > 0 ? "unread" : ""}`}
                key={chat.id}
              >
                <div className="profile-container">
                  <UserHeader userId={otherUserId} />
                  {chat?.unreadCounts[authenticatedId] > 0 && (
                    <span className="unread-counter">
                      {chat.unreadCounts[authenticatedId]}
                    </span>
                  )}
                </div>
                <div className="chat-preview">
                  <p className="last-message">
                    {chat.messages[chat.messages?.length - 1]?.text}
                  </p>
                </div>
                <span className="timestamp">
                  {formatTimestamp(chat.lastInteraction)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ChatManager;
