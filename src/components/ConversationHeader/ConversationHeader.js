import React from 'react';
import './ConversationHeader.css';

const ConversationHeader = ({ conversationSummary, onExport }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimeAgo = (timestamp) => {
    const diffInSeconds = Math.floor(Date.now() / 1000 - timestamp);
    if (diffInSeconds < 3600) return `${Math.max(1, Math.floor(diffInSeconds / 60))} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return formatDate(timestamp);
  };

  if (!conversationSummary) return null;

  return (
    <div className="conversation-header">
      <div className="header-left">
        <h1>{conversationSummary.title}</h1>
        <div className="conversation-info">
          <span className="info-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Created: {formatDate(conversationSummary.create_time)}
          </span>
          <span className="separator">•</span>
          <span className="info-item">
            Last updated {formatTimeAgo(conversationSummary.update_time)}
          </span>
        </div>
      </div>
      <div className="header-right">
        <button className="header-btn" onClick={onExport}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          Export
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
