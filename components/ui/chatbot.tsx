"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample responses for the demo
const botResponses = [
  "Thanks for reaching out! How can I help you today?",
  "We offer a variety of digital services including web development, mobile app development, and digital marketing.",
  "Our team would be happy to discuss your project in detail. Would you like to schedule a call?",
  "You can reach our support team at support@evergreen-tech.com.",
  "Our office hours are Monday to Friday, 9 AM to 6 PM.",
  "We've worked with clients across various industries including healthcare, finance, and education.",
  "Typically, we can complete a website project in 4-8 weeks depending on complexity.",
  "I'd be happy to connect you with a member of our sales team for more information.",
  "Is there anything specific about our services you'd like to know more about?",
  "Let me know if you have any other questions!",
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Evergreen Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (currentMessage.trim() === "") return;

    // Add user message
    const userMessageId = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: currentMessage,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    setCurrentMessage("");
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId + 1,
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-24 z-50 p-4 rounded-full bg-accent text-white shadow-lg hover:shadow-xl border-2 border-transparent hover:border-white transition-all duration-300 ${
          isOpen ? "hidden" : "flex"
        } relative overflow-hidden group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 text-white group-hover:text-white">
          <MessageCircle size={24} />
        </span>
        <span className="absolute inset-0 bg-accent group-hover:opacity-0 transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"></span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-4 bg-accent text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-semibold">Evergreen Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === "user"
                        ? "bg-accent text-white rounded-tr-none"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === "bot" ? (
                        <Bot size={16} className="text-accent" />
                      ) : (
                        <User size={16} />
                      )}
                      <span className="text-xs opacity-75">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="bg-white text-gray-800 rounded-xl rounded-tl-none p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-accent" />
                      <span className="text-xs opacity-75">Now</span>
                    </div>
                    <div className="flex space-x-1">
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 bg-white flex items-center gap-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1 focus-visible:ring-accent"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-accent hover:bg-accent/80 text-white border-2 border-transparent hover:border-white relative overflow-hidden group"
              >
                <Send size={18} />
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"></span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
