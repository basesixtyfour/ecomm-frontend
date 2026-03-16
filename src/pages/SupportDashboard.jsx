import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { fetchActiveRooms } from "../services/api";
import { useChat } from "../hooks/useChat";
import { ChatPanel } from "../components/chat/ChatPanel";

const POLL_INTERVAL_MS = 10_000;

const RoomList = ({ rooms, selectedId, onSelect, onRefresh, loading }) => (
  <div className="flex h-full flex-col border-r-2 border-black">
    <div className="flex items-center justify-between border-b-2 border-black px-4 py-3">
      <h2 className="text-xs font-black uppercase tracking-[0.18em] text-black">
        Active chats
      </h2>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="cursor-pointer border-2 border-black bg-white p-1.5 text-black hover:bg-black hover:text-white disabled:opacity-40"
        title="Refresh"
      >
        <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto bg-white">
      {rooms.length === 0 && (
        <p className="py-8 text-center text-sm text-neutral-700">No active chats</p>
      )}
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelect(room)}
          className={`w-full cursor-pointer border-b-2 border-black px-4 py-3 text-left hover:bg-neutral-100 ${
            selectedId === room.id ? "bg-neutral-100" : ""
          }`}
        >
          <p className="text-sm font-semibold text-black">{room.username}</p>
          <p className="text-xs text-neutral-700">
            Room #{room.id} &middot;{" "}
            {new Date(room.created_at).toLocaleString()}
          </p>
        </button>
      ))}
    </div>
  </div>
);

export const SupportDashboard = () => {
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
    <div className="flex h-[calc(100vh-52px)] bg-white">
      <div className="w-72 flex-shrink-0">
        <RoomList
          rooms={rooms}
          selectedId={selectedRoom?.id}
          onSelect={handleSelectRoom}
          onRefresh={loadRooms}
          loading={loading}
        />
      </div>

      <div className="flex-1 border-l-2 border-black">
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
          <div className="flex h-full items-center justify-center text-sm text-neutral-700">
            Select a chat from the sidebar
          </div>
        )}
      </div>
    </div>
  );
};
