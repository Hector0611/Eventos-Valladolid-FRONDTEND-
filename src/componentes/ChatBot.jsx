import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const API_URL = "http://localhost:3001/api/chatbot"; // luego cambias a Render

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 Soy tu guía turístico de Valladolid. ¿Qué te gustaría saber?\n1.-Eventos (mes)\n2.-Evento (dia) de (mes)\n3. Hoteles o (Nombre) \n 4. Historia || de (lugar) \n5. Cenotes o del cenote (nombre) \n 6. Sitios arqueologicos (nombre del lugar) \n7. Policía \n8. Transporte" },
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
        text: res.data.reply || "No pude entender eso 😕",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Ups 😅 hubo un problema al conectar con el servidor." },
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
            <span>Guía de Valladolid</span>
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
              placeholder="Escribe algo... (ej: eventos de marzo)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;