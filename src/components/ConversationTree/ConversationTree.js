import React from 'react';
import Message from '../Message/Message';
import BranchSelector from '../BranchSelector/BranchSelector';
import './ConversationTree.css';

const ConversationTree = ({ conversation, selectedBranches, onBranchSelect }) => {
  if (!conversation || !conversation.mapping) return null;

  const messages = [];
  let currentNode = conversation.mapping['client-created-root'];
  
  // If 'client-created-root' doesn't exist, find the first node without a parent
  if (!currentNode) {
    const rootNodes = Object.values(conversation.mapping).filter(node => 
      !node.parent || node.parent === null
    );
    if (rootNodes.length > 0) {
      currentNode = rootNodes[0];
    }
  }
  
  // Find the root message
  if (currentNode && currentNode.children && currentNode.children.length > 0) {
    let currentId = currentNode.children[0];
    
    // Navigate through the conversation tree
    while (currentId && conversation.mapping[currentId]) {
      const node = conversation.mapping[currentId];
      if (node.message) {
        messages.push({
          ...node.message,
          nodeId: currentId,
          children: node.children || []
        });
      }
      
      // Move to the next message based on selected branch or first child
      if (node.children && node.children.length > 0) {
        const selectedBranch = selectedBranches[currentId] || 0;
        currentId = node.children[selectedBranch] || node.children[0];
      } else {
        break;
      }
    }
  }

  return (
    <div className="conversation-tree">
      {messages.map((message, index) => (
        <div key={message.id || index} className="message-container">
          <Message message={message} />
          
          <BranchSelector
            messageNodeId={message.nodeId}
            children={message.children}
            selectedBranch={selectedBranches[message.nodeId] || 0}
            onBranchSelect={onBranchSelect}
          />
        </div>
      ))}
    </div>
  );
};

export default ConversationTree;

