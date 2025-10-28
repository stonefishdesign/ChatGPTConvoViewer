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

  const handleExport = () => {
    try {
      const data = [conversation];
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const safeTitle = (conversation.title || 'conversation').toString().replace(/[\/:*?"<>|]+/g, '_').slice(0, 120);
      a.href = url;
      a.download = `${safeTitle}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      // No-op in React; optionally we could show a toast
      console.error('Failed to export conversation', e);
    }
  };

  return (
    <div className="conversation-view">
      <ConversationHeader conversationSummary={conversationSummary} onExport={handleExport} />
      
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
