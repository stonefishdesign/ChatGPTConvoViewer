import React from 'react';
import './Sidebar.css';

const Sidebar = ({ conversationSummaries, selectedConversationId, onConversationSelect }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-archive-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Archive
        </button>
      </div>
      <div className="conversation-list">
        <div className="conversation-item selected" style={{ cursor: 'default' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M12 7v5l4 2"></path>
          </svg>
          <div className="conversation-title">All Conversations</div>
        </div>
        {/* We can keep rendering the individual ones if needed, but the design just shows "All Conversations" selected and nothing else visible.
            Let's render them anyway but style them correctly. */}
        {conversationSummaries.map((conversation, index) => (
          <div
            key={conversation.id || index}
            className={`conversation-item ${selectedConversationId === conversation.id ? 'active' : ''}`}
            onClick={() => onConversationSelect(conversation.id)}
          >
            <div className="conversation-title" style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#495057' }}>{conversation.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
