import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot1.css";
import imgGavilan from "./Imagenes/Gavilan.png";

/* const API_URL = "https://eventos-valladolid-backendt.onrender.com/api/chatbot"; */
const API_URL = "http://localhost:3001/api/chatbot";

const MAX_CHARS = 300;

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋 I'm your touristic guide in Valladolid. What would you like to know?\n \n1.-Events (month)\n2.-Event (day) of (month)\n3. Hotels or (Name) \n 4. History || of (place) \n5. Cenotes or the cenote (name) \n 6. Archaeological sites (name of the place) \n7. Police \n8. Transportation \n \n You can also request our official map of Valladolid\n \n I can only understand English and Spanish at the moment.",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const [typingText, setTypingText] = useState("");

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { from: "user", text: input, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(API_URL, { message: input });

      const fullText = res.data.reply || "I couldn't understand that 😕";
            
      let currentText = "";
      setTypingText("");

      for (let i = 0; i < fullText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        currentText += fullText[i];
        setTypingText(currentText);
      }

      const botMsg = {
        from: "bot",
        text: fullText,
        time: formatTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTypingText("");

      if (!open) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Ups 😅 there was a problem connecting to the server.",
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        from: "bot",
        text: "Chat cleared. How can I help you? 😊",
        time: formatTime(),
      },
    ]);
  };

  const copyMessage = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleOpen = () => {
    setOpen(true);
    setUnreadCount(0);
  };


  const renderTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0d6efd", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }

    return part;
  });
};



  useEffect(() => {
  if (open) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, typingText, open]);

  return (
    <>
      {/* Botón flotante */}
      <button className="chatbot-toggle" onClick={() => (open ? setOpen(false) : handleOpen())}>
        <img src={imgGavilan} alt="Gavilan" className="GavilanImg" />
        {unreadCount > 0 && !open && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#e63946",
              color: "#fff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Guide For Valladolid</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {/* Botón limpiar */}
              <button
                onClick={clearChat}
                title="Clear chat"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  fontSize: "16px",
                  opacity: 0.8,
                  padding: "0 4px",
                }}
              >
                🗑️
              </button>
              <button onClick={() => setOpen(false)}>&times;</button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message11 ${m.from}`}>
                {/* Timestamp */}
                <div
                  style={{
                    fontSize: "10px",
                    opacity: 0.55,
                    marginBottom: "3px",
                    textAlign: m.from === "user" ? "right" : "left",
                  }}
                >
                  {m.time}
                </div>

                {m.text.split("\n").map((line, idx) => (
                  <p key={idx}>{renderTextWithLinks(line)}</p>
                ))}
              </div>
            ))}

            {/* Indicador de escritura */}
            {typingText && (
                <div className="message11 bot">
                  <p>{typingText}</p>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                placeholder="Write something... (e.g., events in March)"
                value={input}
                maxLength={MAX_CHARS}
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                style={{ width: "100%", paddingRight: "48px", boxSizing: "border-box" }}
              />
              {/* Contador de caracteres */}
              <span
                style={{
                  position: "absolute",
                  right: "8px",
                  bottom: "6px",
                  fontSize: "10px",
                  opacity: input.length > MAX_CHARS * 0.8 ? 0.9 : 0.4,
                  color: input.length >= MAX_CHARS ? "#e63946" : "inherit",
                  pointerEvents: "none",
                }}
              >
                {input.length}/{MAX_CHARS}
              </span>
            </div>
            <button onClick={sendMessage} disabled={isTyping}>
              &#10148;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;