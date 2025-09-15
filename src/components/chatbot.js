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
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chatbot({ patientId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, I’m your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://3f975fd866ec.ngrok-free.app/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document_id: patientId,
          query: input,
        }),
      });

      const data = await response.json();
      const botReply = data.answer || "Sorry, I couldn’t understand that.";

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <Tooltip title="Chat Bot" placement="left">
          <Fab
            onClick={() => setIsOpen(true)}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "white",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="42"
              height="42"
              role="img"
              aria-label="Chatbot icon"
            >
              <title>Chatbot icon</title>
              <path
                d="M256 56
                C149 56 64 141 64 248
                c0 71 40 132 100 166
                v86l78-52
                c14 2 28 4 42 4
                c107 0 192-85 192-192
                S363 56 256 56z"
                fill="#19A7D1"
              />
              <rect x="118" y="162" width="276" height="148" rx="74" ry="74" fill="#ffffff" />
              <circle cx="110" cy="236" r="18" fill="#ffffff" />
              <circle cx="402" cy="236" r="18" fill="#ffffff" />
              <rect x="174" y="198" width="164" height="82" rx="40" ry="40" fill="#444446" />
              <circle cx="230" cy="238" r="12" fill="#1FB6D9" />
              <circle cx="306" cy="238" r="12" fill="#1FB6D9" />
              <rect x="248" y="140" width="16" height="28" rx="4" ry="4" fill="#EDEDED" />
              <circle cx="256" cy="132" r="12" fill="#EDEDED" />
            </svg>
          </Fab>
        </Tooltip>
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
                    {msg.sender === "bot" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {children}
                            </Typography>
                          ),
                          strong: ({ children }) => (
                            <strong style={{ fontWeight: "bold" }}>{children}</strong>
                          ),
                          code: ({ inline, children }) =>
                            inline ? (
                              <code
                                style={{
                                  background: "#eee",
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                }}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre
                                style={{
                                  background: "#272822",
                                  color: "#f8f8f2",
                                  padding: "8px",
                                  borderRadius: "6px",
                                  overflowX: "auto",
                                }}
                              >
                                <code>{children}</code>
                              </pre>
                            ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      <Typography variant="body2">{msg.text}</Typography>
                    )}
                  </Box>
                </ListItem>
              ))}
              {isTyping && (
                <ListItem sx={{ justifyContent: "flex-start" }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      maxWidth: "75%",
                      bgcolor: "#f5f5f5",
                      fontStyle: "italic",
                    }}
                  >
                    <Typography variant="body2">Assistant is typing...</Typography>
                  </Box>
                </ListItem>
              )}
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
