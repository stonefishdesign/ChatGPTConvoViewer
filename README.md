# ChatGPT Conversation Viewer

A modern web application for viewing and navigating through conversation data with support for branching conversations, Markdown rendering, and image display.

## 🚀 Features

- **Conversation Management**: Load and view multiple conversations from JSON files
- **Branching Support**: Navigate through conversations with multiple response branches
- **Markdown Rendering**: Full Markdown support for rich text content
- **Image Display**: Support for image assets within conversations
- **Responsive Design**: Modern, chatroom-like interface that works on all devices
- **Dual Versions**: Both React application and standalone HTML versions available

## 📁 Project Structure

```
/
├── src/                          # React application source
│   ├── components/               # Modular React components
│   │   ├── Sidebar/             # Conversation list sidebar
│   │   ├── ConversationView/    # Main conversation display
│   │   ├── ConversationHeader/  # Conversation title and metadata
│   │   ├── ConversationTree/    # Hierarchical conversation structure
│   │   ├── Message/             # Individual message component
│   │   └── BranchSelector/      # Branch switching UI
│   ├── App.js                   # Main application component
│   └── index.js                 # Application entry point
├── chats.html                    # Standalone HTML version
├── conversations.json            # Sample conversation data
└── package.json                  # Project dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### React Application
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd [directory]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Standalone HTML Version
Simply open `chats.html` in any modern web browser. No server or installation required!

## 📖 Usage

### Loading Conversations
1. **React App**: Place your `conversations.json` file in the `public/` folder
2. **HTML Version**: Use the file input button to load any JSON file

### Navigating Conversations
- **Left Sidebar**: Click on conversation titles to switch between conversations
- **Main View**: View the full conversation content with proper formatting
- **Branch Selection**: Use the small round buttons below messages to switch between response branches

### Supported Content Types
- **Text**: Full Markdown support (headers, lists, code blocks, links, etc.)
- **Images**: Automatic detection and display of image assets
- **Mixed Content**: Messages can contain both text and images

## 🔧 Technical Details

### React Components
- **Modular Architecture**: Each component has its own CSS file for maintainability
- **State Management**: Uses React hooks for local state management
- **Props Flow**: Clean data flow from parent to child components

### Data Structure
The application expects conversation data in this format:
```json
[
  {
    "id": "conversation_id",
    "title": "Conversation Title",
    "create_time": 1234567890,
    "update_time": 1234567890,
    "mapping": {
      "node_id": {
        "message": {
          "author": { "role": "user|assistant|system" },
          "content": "message content or parts array",
          "create_time": 1234567890
        },
        "children": ["child_node_id"],
        "parent": "parent_node_id"
      }
    }
  }
]
```

### Key Features Implementation
- **Root Node Detection**: Automatically finds conversation root nodes
- **Content Parsing**: Handles various content structures safely
- **Message Filtering**: Filters out system messages, tool messages, and empty content
- **Branch Navigation**: Maintains branch selection state per message

## 🎨 Styling

### Design Principles
- **Chatroom Interface**: User messages right-aligned, assistant messages left-aligned
- **Modern UI**: Clean, minimal design with proper spacing and typography
- **Responsive Layout**: Flexbox-based layout that adapts to different screen sizes

### CSS Architecture
- **Component-Scoped**: Each React component has its own CSS file
- **Consistent Variables**: Shared color scheme and spacing
- **Markdown Styling**: Comprehensive styles for all Markdown elements

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (one-way operation)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Dependencies

- **React 19.1.1** - UI framework
- **react-markdown 10.1.0** - Markdown rendering
- **Create React App** - Build tooling and configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Troubleshooting

### Common Issues
- **Conversations not displaying**: Check JSON format and ensure root nodes exist
- **Images not showing**: Verify image files exist in the same directory
- **Branch switching not working**: Check browser console for JavaScript errors

### Debug Mode
The HTML version includes console logging for debugging. Open browser developer tools to see detailed information about conversation loading and rendering.

---

**Note**: This application is designed to work with specific conversation data formats. Ensure your JSON files follow the expected structure for optimal functionality.
