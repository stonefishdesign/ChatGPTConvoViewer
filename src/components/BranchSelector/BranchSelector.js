import React from 'react';
import './BranchSelector.css';

const BranchSelector = ({ messageNodeId, children, selectedBranch, onBranchSelect }) => {
  if (!children || children.length <= 1) return null;

  return (
    <div className="branch-selector">
      <div className="branch-indicator">
        <div className="branch-buttons">
          {children.map((childId, childIndex) => {
            const isSelected = selectedBranch === childIndex;
            
            return (
              <button
                key={childId}
                className={`branch-button ${isSelected ? 'active' : ''}`}
                onClick={() => onBranchSelect(messageNodeId, childIndex)}
              >
                Response {childIndex + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BranchSelector;
