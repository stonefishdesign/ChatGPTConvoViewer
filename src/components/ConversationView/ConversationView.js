import React from 'react';
import ConversationHeader from '../ConversationHeader/ConversationHeader';
import ConversationTree from '../ConversationTree/ConversationTree';
import './ConversationView.css';

const ConversationView = ({ conversation, selectedBranches, onBranchSelect }) => {
  if (!conversation) {
    return (
      <div className="no-conversation">
        <h2>Select a conversation to view</h2>
      </div>
    );
  }

  // Create a summary for the header (only the data it needs)
  const conversationSummary = {
    id: conversation.id,
    title: conversation.title,
    create_time: conversation.create_time,
    update_time: conversation.update_time
  };

  return (
    <div className="conversation-view">
      <ConversationHeader conversationSummary={conversationSummary} />
      
      <div className="conversation-content">
        <ConversationTree
          conversation={conversation}
          selectedBranches={selectedBranches}
          onBranchSelect={onBranchSelect}
        />
      </div>
    </div>
  );
};

export default ConversationView;
