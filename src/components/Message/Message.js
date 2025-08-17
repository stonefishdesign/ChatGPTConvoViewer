import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Message.css';

const Message = ({ message }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!message || !message.content) return null;
  
  // Handle different content structures safely
  let content = '';
  let contentType = message.content.content_type || 'text';
  
  if (message.content.parts && Array.isArray(message.content.parts)) {
    // Handle multiple parts - combine text and images
    const contentParts = message.content.parts.map((part, index) => {
      if (typeof part === 'string') {
        return (
          <div key={index} className="text-content">
            <ReactMarkdown>{part}</ReactMarkdown>
          </div>
        );
      } else if (part && typeof part === 'object') {
        // Handle image parts
        if (part.content_type === 'image_asset_pointer' && part.asset_pointer) {
          const assetPointer = part.asset_pointer;
          if (assetPointer.startsWith('file-service://')) {
            const filename = assetPointer.replace('file-service://', '') + '.jpeg';
            return (
              <div key={index} className="image-content">
                <img 
                  src={`./${filename}`} 
                  alt="Conversation image" 
                  className="conversation-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="image-error" style={{ display: 'none' }}>
                  🖼️ Image: {filename}
                </div>
              </div>
            );
          }
        }
        // Handle other part types if needed
        return null;
      }
      return null;
    }).filter(Boolean); // Remove null values
    
    // Combine all parts
    if (contentParts.length > 0) {
      content = contentParts;
    }
  } else if (typeof message.content === 'string') {
    content = (
      <div className="text-content">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    );
  } else if (message.content.text) {
    content = (
      <div className="text-content">
        <ReactMarkdown>{message.content.text}</ReactMarkdown>
      </div>
    );
  }
  
  const role = message.author?.role || 'unknown';
  
  // Filter out tool messages
  if (role === 'tool' || role === 'system') return null;
  
  // Filter out messages without meaningful content
  if (!content || (typeof content === 'string' && content.trim() === '')) return null;
  
  // Filter out contextual retry user messages (system messages)
  if (message.metadata?.is_contextual_retry_user_message === true) return null;
  
  return (
    <div 
      className={`message ${role}`} 
      title={JSON.stringify(message)}
      data-model-slug={message.metadata?.model_slug || ''}
    >
      <div className="message-header">
        <span className="role-badge">{role}</span>
        {message.create_time && (
          <span className="timestamp">{formatDate(message.create_time)}</span>
        )}
      </div>
      <div className="message-content">
        {content}
      </div>
    </div>
  );
};

export default Message;
