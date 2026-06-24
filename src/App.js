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
    // Process conversations to reconstruct tree if needed (new export format)
    conversationsData.forEach(conv => {
      if (conv.mapping) {
        Object.values(conv.mapping).forEach(node => {
          if (node && !node.children) {
            node.children = [];
          }
        });
        Object.values(conv.mapping).forEach(node => {
          if (node && node.parent && conv.mapping[node.parent]) {
            if (!conv.mapping[node.parent].children.includes(node.id)) {
              conv.mapping[node.parent].children.push(node.id);
            }
          }
        });
      }
    });

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
    <div className="app-container">
      <header className="top-nav">
        <div className="logo">ArchiveAI</div>
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search archives..." />
        </div>
      </header>
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
    </div>
  );
}

export default App;
