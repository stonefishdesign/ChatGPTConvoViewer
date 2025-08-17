import React, { useEffect, useCallback } from 'react';
import Message from '../Message/Message';
import BranchSelector from '../BranchSelector/BranchSelector';
import './ConversationTree.css';

const ConversationTree = ({ conversation, selectedBranches, onBranchSelect }) => {
  // Function to find the path to current_node and determine correct branch selections
  const findPathToCurrentNode = useCallback((mapping) => {
    // Find the root node to start from
    let rootNode = mapping['client-created-root'];
    
    // If 'client-created-root' doesn't exist, find the first node without a parent
    if (!rootNode) {
      const rootNodes = Object.values(mapping).filter(node => 
        !node.parent || node.parent === null
      );
      if (rootNodes.length > 0) {
        rootNode = rootNodes[0];
      }
    }
    
    if (!rootNode) return {};
    
    // Find the current_node (user's last message)
    // First try to get it from conversation.current_node
    let targetNodeId = null;
    
    // If we have access to conversation.current_node, use that
    if (conversation.current_node && mapping[conversation.current_node]) {
      targetNodeId = conversation.current_node;
    } else {
      // Otherwise, find the last message in the mapping
      const allNodeIds = Object.keys(mapping);
      const lastNodeId = allNodeIds[allNodeIds.length - 1];
      if (lastNodeId && mapping[lastNodeId] && mapping[lastNodeId].message) {
        targetNodeId = lastNodeId;
      }
    }
    
    if (!targetNodeId) return {};
    
    // Now find the path from root to this target node
    const path = [];
    let currentId = targetNodeId;
    
    // Trace back from target to root to find the complete path
    while (currentId && mapping[currentId]) {
      const node = mapping[currentId];
      if (node.parent) {
        const parentNode = mapping[node.parent];
        if (parentNode && parentNode.children) {
          const branchIndex = parentNode.children.indexOf(currentId);
          if (branchIndex !== -1) {
            path.unshift({ nodeId: node.parent, branchIndex });
          }
        }
        currentId = node.parent;
      } else {
        // Reached the root
        break;
      }
    }
    
    // Convert path to branch selections
    const branchSelections = {};
    path.forEach(({ nodeId, branchIndex }) => {
      branchSelections[nodeId] = branchIndex;
    });
    
    return branchSelections;
  }, [conversation.current_node]);

  // Apply correct branch selections when conversation changes
  useEffect(() => {
    if (conversation && conversation.mapping) {
      const correctBranches = findPathToCurrentNode(conversation.mapping);
      
      // Only update if there are differences
      const hasChanges = Object.keys(correctBranches).some(key => 
        selectedBranches[key] !== correctBranches[key]
      );
      
      if (hasChanges) {
        // Update all branch selections at once
        Object.entries(correctBranches).forEach(([nodeId, branchIndex]) => {
          onBranchSelect(nodeId, branchIndex);
        });
      }
    }
  }, [conversation, findPathToCurrentNode, onBranchSelect, selectedBranches]);

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

