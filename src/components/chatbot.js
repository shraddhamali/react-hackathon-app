import React, { useState, useEffect, useRef } from "react";
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
  Zoom,
  Fade,
  Slide,
  Grow,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { keyframes } from "@mui/system";

// Keyframe animations
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Chatbot({ patientId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, I'm your assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <Zoom in={!isOpen} timeout={300}>
        <Tooltip title="Chat with AI Assistant" placement="left">
          <Fab
            onClick={() => setIsOpen(true)}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 64,
              height: 64,
              background: "#FFFFFF",
              border: "2px solid #667eea",
              color: "white",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
              animation: `${pulse} 2s infinite`,
              zIndex: 9999, // Highest z-index for chatbot FAB
              "&:hover": {
                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                animation: `${bounce} 1s`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <img
              src="/ai-chatbot.png"
              alt="AI Chatbot"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
              }}
            />
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Chat Window */}
      <Slide direction="up" in={isOpen} timeout={400}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 380,
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 9998, // High z-index for chat window, just below FAB
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#4ade80",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                AI Assistant
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              background: "linear-gradient(to bottom, #fafafa, #ffffff)",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0,0,0,0.1)",
                borderRadius: "4px",
              },
            }}
          >
            <List sx={{ p: 0 }}>
              {messages.map((msg, i) => (
                <Grow
                  key={i}
                  in={true}
                  timeout={300 + i * 100}
                  style={{ transformOrigin: msg.sender === "user" ? "right center" : "left center" }}
                >
                  <ListItem
                    sx={{
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                      py: 0.5,
                      px: 0,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        maxWidth: "85%",
                        background: msg.sender === "user"
                          ? "rgb(233, 210, 255)"
                          : "#ffffff",
                        color: msg.sender === "user" ? "#ffffff !important" : "#2d3748",
                        boxShadow: msg.sender === "user"
                          ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        border: msg.sender === "bot" ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
                        animation: `${fadeInUp} 0.3s ease-out`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          fontSize: "0.9rem",
                          color: "#000000",
                          fontWeight: 400,
                        }}
                      >
                        {msg.text}
                      </Typography>
                    </Box>
                  </ListItem>
                </Grow>
              ))}
              {isTyping && (
                <Fade in={isTyping}>
                  <ListItem sx={{ justifyContent: "flex-start", py: 0.5, px: 0 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "18px 18px 18px 4px",
                        maxWidth: "85%",
                        bgcolor: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {[0, 1, 2].map((dot) => (
                          <Box
                            key={dot}
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: "#667eea",
                              animation: `${typing} 1.4s infinite ${dot * 0.2}s`,
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.85rem" }}>
                        AI is thinking...
                      </Typography>
                    </Box>
                  </ListItem>
                </Fade>
              )}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: 1,
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              disabled={isTyping}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "white",
                  "& fieldset": {
                    borderColor: "#000000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              sx={{
                background: input.trim() ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f5f5f5",
                color: input.trim() ? "white" : "#9ca3af",
                width: 40,
                height: 40,
                "&:hover": {
                  background: input.trim() ? "linear-gradient(135deg, #764ba2 0%, #667eea 100%)" : "#e5e7eb",
                  transform: "scale(1.05)",
                },
                "&:disabled": {
                  background: "#f5f5f5",
                  color: "#9ca3af",
                },
                transition: "all 0.2s ease",
              }}
            >
              <SendIcon sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}
