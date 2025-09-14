import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, I’m your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // dummy reply (replace with backend call)
    const botReply = "This is a dummy reply. Connect to API for real responses.";
    setMessages([...newMessages, { sender: "bot", text: botReply }]);

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <Fab
          color="primary"
          onClick={() => setIsOpen(true)}
          sx={{ position: "fixed", bottom: 20, right: 20 }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 320,
            height: 400,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="subtitle1">Assistant</Typography>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
              ✖
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
            <List>
              {messages.map((msg, i) => (
                <ListItem
                  key={i}
                  sx={{
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      maxWidth: "75%",
                      bgcolor: msg.sender === "user" ? "#e3f2fd" : "#f5f5f5",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input */}
          <Box sx={{ p: 1, display: "flex", borderTop: "1px solid #ddd" }}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <IconButton onClick={handleSend} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
