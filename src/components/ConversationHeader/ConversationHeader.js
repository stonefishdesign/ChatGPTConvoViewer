import React from 'react';
import './ConversationHeader.css';

const ConversationHeader = ({ conversationSummary }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (!conversationSummary) return null;

  return (
    <div className="conversation-header">
      <h1>{conversationSummary.title}</h1>
      <div className="conversation-info">
        <span>Created: {formatDate(conversationSummary.create_time)}</span>
        <span>Updated: {formatDate(conversationSummary.update_time)}</span>
      </div>
    </div>
  );
};

export default ConversationHeader;
