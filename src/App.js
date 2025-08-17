import React, { useState, useEffect } from 'react';
import { Sidebar, ConversationView } from './components';
import './App.css';
import conversationsData from './conversations.json';

function App() {
  const [conversations, setConversations] = useState([]);
  const [conversationSummaries, setConversationSummaries] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState({});

  useEffect(() => {
    // Process conversations to create summaries for sidebar
    const summaries = conversationsData.map(conversation => ({
      id: conversation.id,
      title: conversation.title,
      create_time: conversation.create_time,
      update_time: conversation.update_time
    }));
    
    setConversations(conversationsData);
    setConversationSummaries(summaries);
    
    if (conversationsData.length > 0) {
      setSelectedConversation(conversationsData[0]);
      setSelectedBranches({});
    }
  }, []);

  const handleConversationSelect = (conversationId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setSelectedConversation(conversation);
      setSelectedBranches({}); // Reset branch selections
    }
  };

  const handleBranchSelect = (messageNodeId, branchIndex) => {
    setSelectedBranches(prev => ({
      ...prev,
      [messageNodeId]: branchIndex
    }));
  };

  return (
    <div className="app">
      <Sidebar
        conversationSummaries={conversationSummaries}
        selectedConversationId={selectedConversation?.id}
        onConversationSelect={handleConversationSelect}
      />
      
      <div className="main-content">
        <ConversationView
          conversation={selectedConversation}
          selectedBranches={selectedBranches}
          onBranchSelect={handleBranchSelect}
        />
      </div>
    </div>
  );
}

export default App;
