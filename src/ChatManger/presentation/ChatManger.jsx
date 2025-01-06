import "./ChatManager.css"; // Assuming you have this CSS file for styling
import UserHeader from '../../ChatFeature/presentation/UserHeader';

function ChatManager({ chats, loading, error }){
  if (loading) {
    return <div className="chat-manager-loading">Loading chats...</div>;
  }

  if (error) {
    return (
      <div className="chat-manager-error">Error loading chats: {error}</div>
    );
  }

  if (!chats || chats.length === 0) {
    return <div className="chat-manager-empty">No chats available</div>;
  }

  return (
    <div className="chat-manager">
      {chats.map((chat) => (
        <div className="chat-item" key={chat.id}>
          <UserHeader imgSrc={chat.userImg} name={chat.userName} />
          {chat.unread && <div className="chat-unread-marker">Unread</div>}
        </div>
      ))}
    </div>
  );
};

export default ChatManager;
