"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample responses for the demo
const botResponses = [
  "Thanks for reaching out! How can I help you today?",
  "We offer a variety of digital services including web development, mobile app development, and digital marketing solutions tailored to your needs.",
  "Our team of experienced developers would be happy to discuss your project in detail. Would you like to schedule a call?",
  "You can reach our support team at support@evergreen-tech.com.",
  "Our office hours are Monday to Friday, 8 AM to 5 PM.",
  "We've worked with clients across various industries including food, finance, education, and e-commerce.",
  "For most website projects, we can complete development in 4-8 weeks depending on complexity and requirements.",
  "Each project we build is customized to your specific needs with attention to user experience and modern technologies.",
  "Our expertise includes Next.js, React, Node.js, PostgreSQL, AWS, and various other modern technologies.",
  "We focus on delivering scalable websites with seamless user experiences and environmental sustainability in mind.",
  "Would you like to learn more about our previous projects? We have case studies available.",
  "Let me know if you have any other questions about our services or development process!",
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function FixedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Evergreen Technology Assistant. How can I help you today?",
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
      {/* Chat toggle button - positioned on the left side to avoid conflicts */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-50 p-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <MessageCircle size={20} className="w-5 h-5" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 z-50 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Chat header */}
          <div className="p-4 bg-accent text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <h3 className="font-semibold">Evergreen Tech Assistant</h3>
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
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
