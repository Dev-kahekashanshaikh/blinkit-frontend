import React, { useState } from "react";
import "../styles/Chatbot.css";
import { PiChatCircleDotsFill } from "react-icons/pi";

const Chatbot = () => {
  // Open / Close chatbot
  const [isOpen, setIsOpen] = useState(false);

  // Store current input
  const [input, setInput] = useState("");

  // Store all chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi 👋 I'm your Blinkit Assistant. How can I help you?",
      products: [],
    },
  ]);

  // Send message
  const handleSend = async () => {
    // Prevent empty message
    if (!input.trim()) return;

    // Save input before clearing
    const currentMessage = input.trim();

    // Create user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: currentMessage,
      products: [],
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setInput("");

    try {
      // Call backend chatbot API
      const response = await fetch(
        "http://localhost:4000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      // Convert response into JSON
      const data = await response.json();

      console.log("Backend response:", data);
      // Check API response
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      // Create bot message
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply,
        products: data.products || [],
      };

      // Add bot message
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.log("Chat Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, something went wrong.",
        products: [],
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Send message when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-box">

          {/* Header */}
          <div className="chatbot-header">

            <div>
              <h5>Blinkit Assistant</h5>
              <span>● Online</span>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

          </div>

          {/* Messages */}
         
{/* Messages */}
<div className="chatbot-messages">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`chat-message ${message.sender}`}
    >
      {/* Message Text */}
      <div>{message.text}</div>

      {/* Products */}
     
{/* Products */}
{message.sender === "bot" && (
  <>
    {Array.isArray(message.products) &&
    message.products.length > 0 ? (
      <div className="chat-products">
        {message.products.map((product) => (
          <div
            className="chat-product"
            key={product._id}
          >
            <img
              src={product.image}
              alt={product.title || "Product"}
            />

            <div>
              <p>{product.title}</p>
              <strong>₹{product.price}</strong>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-products-message">
        No matching products found. Please try another search.
      </div>
    )}
  </>
)}

    </div>
  ))}
</div>


          {/* Input */}
          <div className="chatbot-input">

            <input
              type="text"
              placeholder="Ask about products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSend}>
              ➤
            </button>

          </div>

        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
        >
          {/* 💬 */}
          <PiChatCircleDotsFill />
        </button>
      )}

    </div>
  );
};

export default Chatbot;