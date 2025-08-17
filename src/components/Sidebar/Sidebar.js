import React from 'react';
import './Sidebar.css';

const Sidebar = ({ conversationSummaries, selectedConversationId, onConversationSelect }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="sidebar">
      <h2>Conversations</h2>
      <div className="conversation-list">
        {conversationSummaries.map((conversation, index) => (
          <div
            key={conversation.id || index}
            className={`conversation-item ${selectedConversationId === conversation.id ? 'selected' : ''}`}
            onClick={() => onConversationSelect(conversation.id)}
          >
            <div className="conversation-title">{conversation.title}</div>
            <div className="conversation-meta">
              {formatDate(conversation.create_time)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
