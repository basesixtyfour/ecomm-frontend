import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { createChatRoom } from "../../services/api";
import { ChatPanel } from "./ChatPanel";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    messages,
    isConnected,
    isPeerOnline,
    isPeerTyping,
    sendMessage,
    sendTyping,
    disconnect,
  } = useChat(roomId);

  const handleOpen = async () => {
    setIsOpen(true);

    if (roomId) return;

    setLoading(true);
    setError(null);
    try {
      const room = await createChatRoom();
      setRoomId(room.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    disconnect();
    setRoomId(null);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 flex items-center justify-center cursor-pointer"
        title="Chat with support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[480px]">
      {loading ? (
        <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-xl">
          <p className="text-sm text-gray-400">Starting chat...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full gap-3 bg-white rounded-lg shadow-xl">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={handleOpen}
            className="px-4 py-1.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : (
        <ChatPanel
          messages={messages}
          isConnected={isConnected}
          isPeerOnline={isPeerOnline}
          isPeerTyping={isPeerTyping}
          peerLabel="Support Agent"
          onSend={sendMessage}
          onTyping={sendTyping}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
