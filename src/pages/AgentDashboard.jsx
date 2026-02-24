import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { fetchActiveRooms } from "../services/api";
import { useChat } from "../hooks/useChat";
import { ChatPanel } from "../components/chat/ChatPanel";

const POLL_INTERVAL_MS = 10_000;

const RoomList = ({ rooms, selectedId, onSelect, onRefresh, loading }) => (
  <div className="flex flex-col h-full border-r border-gray-200">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <h2 className="font-semibold text-gray-800">Active Chats</h2>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
        title="Refresh"
      >
        <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto">
      {rooms.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">No active chats</p>
      )}
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelect(room)}
          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
            selectedId === room.id ? "bg-gray-100" : ""
          }`}
        >
          <p className="font-medium text-sm text-gray-800">{room.username}</p>
          <p className="text-xs text-gray-400">
            Room #{room.id} &middot;{" "}
            {new Date(room.created_at).toLocaleString()}
          </p>
        </button>
      ))}
    </div>
  </div>
);

export const AgentDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const {
    messages,
    isConnected,
    isPeerOnline,
    isPeerTyping,
    isClosed,
    sendMessage,
    sendTyping,
    closeRoom,
    disconnect,
  } = useChat(selectedRoom?.id ?? null);

  const loadRooms = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await fetchActiveRooms();
      setRooms(data);
    } catch {
      if (!silent) setRooms([]);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
    const id = setInterval(() => loadRooms(true), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [loadRooms]);

  useEffect(() => {
    if (isClosed) {
      setSelectedRoom(null);
      loadRooms();
    }
  }, [isClosed, loadRooms]);

  const handleSelectRoom = (room) => {
    if (selectedRoom?.id === room.id) return;
    disconnect();
    setSelectedRoom(room);
  };

  const handleCloseRoom = useCallback(() => {
    closeRoom();
  }, [closeRoom]);

  return (
    <div className="h-[calc(100vh-52px)] flex bg-white">
      <div className="w-72 flex-shrink-0">
        <RoomList
          rooms={rooms}
          selectedId={selectedRoom?.id}
          onSelect={handleSelectRoom}
          onRefresh={loadRooms}
          loading={loading}
        />
      </div>

      <div className="flex-1">
        {selectedRoom ? (
          <ChatPanel
            messages={messages}
            isConnected={isConnected}
            isPeerOnline={isPeerOnline}
            isPeerTyping={isPeerTyping}
            peerLabel={selectedRoom.username}
            onSend={sendMessage}
            onTyping={sendTyping}
            onClose={handleCloseRoom}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Select a chat from the sidebar
          </div>
        )}
      </div>
    </div>
  );
};
