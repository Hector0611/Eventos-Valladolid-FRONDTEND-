import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const API_URL = "https://eventos-valladolid-backendt.onrender.com/api/chatbot"; // luego cambias a Render

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 I'm your touristic guide in Valladolid. What would you like to know?\n \n1.-Events (month)\n2.-Event (day) of (month)\n3. Hotels or (Name) \n 4. History || of (place) \n5. Cenotes or the cenote (name) \n 6. Archaeological sites (name of the place) \n7. Police \n8. Transportation \n \n I can only understand English and Spanish at the moment." },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(API_URL, { message: input });

      const botMsg = {
        from: "bot",
        text: res.data.reply || "I couldn't understand that 😕",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Ups 😅 there was a problem connecting to the server." },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Botón flotante */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>guide for Valladolid</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message11 ${m.from}`}>
                {m.text.split("\n").map((line, idx) => {
                    const isLink = line.includes("http");

                    return isLink ? (
                        <a
                        key={idx}
                        href={line.trim()}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#0d6efd", textDecoration: "underline" }}
                        >
                        {line}
                        </a>
                    ) : (
                        <p key={idx}>{line}</p>
                    );
                    })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Write something... (e.g., events in March)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;