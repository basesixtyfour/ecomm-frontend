import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

export const ChatPanel = ({
  messages,
  isConnected,
  isPeerOnline,
  isPeerTyping,
  peerLabel,
  onSend,
  onTyping,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPeerTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    onTyping(false);
    clearTimeout(typingTimeout.current);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onTyping(true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => onTyping(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-700 text-white">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${isPeerOnline ? "bg-green-400" : "bg-gray-400"}`}
          />
          <span className="font-medium text-sm">{peerLabel}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="hover:opacity-80 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50">
        {!isConnected && (
          <p className="text-center text-xs text-gray-400 py-4">Connecting...</p>
        )}

        {messages.map((msg, i) => {
          if (msg.type === "system") {
            return (
              <p key={i} className="text-center text-xs text-gray-400 italic py-1">
                {msg.content}
              </p>
            );
          }

          const isSelf = msg.sender_role === "self";
          return (
            <div
              key={i}
              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm break-words ${
                  isSelf
                    ? "bg-gray-700 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isPeerTyping && (
          <p className="text-xs text-gray-400 italic">
            {peerLabel} is typing...
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-white">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          disabled={!isConnected}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full outline-none focus:border-gray-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!isConnected || !input.trim()}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
