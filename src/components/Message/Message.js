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
            const findImage = message.metadata.attachments.find(attachment => attachment.id === assetPointer.replace('file-service://', ''));
            const filename = findImage.id + '-' + findImage.name;

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
        } else if (part.content_type === 'audio_transcription') {
          return (
            <div key={index} className="text-content">
              <ReactMarkdown>{part.text}</ReactMarkdown>
            </div>
          );
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
  
  let finalContent = [];
  if (Array.isArray(content)) {
    finalContent = [...content];
  } else if (content) {
    finalContent = [content];
  }
  
  if (message.metadata && message.metadata.attachments && Array.isArray(message.metadata.attachments)) {
    const attachmentsElements = message.metadata.attachments.map((attachment, idx) => {
      const mime = attachment.mime_type || '';
      let mediaTag = null;
      
      const fileSrc = `./${attachment.id}.dat`;
      const fallbackSrc = `./${attachment.id}-${attachment.name}`;
      
      if (mime.startsWith('image/')) {
        mediaTag = (
          <div className="image-content">
            <img 
              src={fileSrc} 
              alt={attachment.name} 
              className="conversation-image" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '8px 0' }}
              onError={(e) => {
                if (!e.target.dataset.fb) {
                  e.target.dataset.fb = '1';
                  e.target.src = fallbackSrc;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          </div>
        );
      } else if (mime.startsWith('audio/')) {
        mediaTag = (
          <div className="audio-content">
            <audio 
              controls 
              className="conversation-audio" 
              style={{ width: '100%', maxWidth: '400px', margin: '8px 0' }}
              src={fileSrc}
              onError={(e) => {
                if (!e.target.dataset.fb) {
                  e.target.dataset.fb = '1';
                  e.target.src = fallbackSrc;
                }
              }}
            />
          </div>
        );
      }
      
      return (
        <div key={`attachment-${idx}`} className="text-content attachment-block" style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.9em', marginBottom: mediaTag ? '8px' : '0' }}>
            <a href={fileSrc} target="_blank" rel="noopener noreferrer" download={attachment.name} style={{ textDecoration: 'none', color: '#007bff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span role="img" aria-label="attachment">📎</span> <strong>{attachment.name}</strong> 
              <span style={{ color: '#6c757d', fontSize: '0.9em' }}>{((attachment.size || 0) / 1024).toFixed(1)} KB</span>
            </a>
          </div>
          {mediaTag}
        </div>
      );
    });
    
    finalContent = [...finalContent, ...attachmentsElements];
  }

  const role = message.author?.role || 'unknown';
  
  // Filter out tool messages
  if (role === 'tool' || role === 'system') return null;
  
  // Filter out messages without meaningful content
  if (finalContent.length === 0) return null;
  
  // Filter out contextual retry user messages (system messages)
  if (message.metadata?.is_contextual_retry_user_message === true) return null;
  
  return (
    <div 
      className={`message ${role}`} 
      data-message={JSON.stringify(message)}
      title={message.metadata?.model_slug || ''}
    >
      <div className="message-header">
        <span className="role-badge">{role}</span>
        {message.create_time && (
          <span className="timestamp">{formatDate(message.create_time)}</span>
        )}
      </div>
      <div className="message-content">
        {finalContent}
      </div>
    </div>
  );
};

export default Message;
