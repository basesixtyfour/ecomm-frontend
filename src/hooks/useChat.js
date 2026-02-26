import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CHAT_WS_URL } from "../services/api";

const NON_RETRIABLE_CODES = [4001, 4003, 4004, 4009];
const RECONNECT_DELAY_MS = 3000;
const MAX_RETRIES = 5;

export function useChat(roomId) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPeerOnline, setIsPeerOnline] = useState(false);
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const wsRef = useRef(null);
  const killedRef = useRef(false);

  useEffect(() => {
    if (!roomId || !accessToken) return;

    let retries = 0;
    let timer = null;
    killedRef.current = false;

    function open() {
      if (killedRef.current) return;

      const ws = new WebSocket(
        `${CHAT_WS_URL}/ws/support/${roomId}?token=${accessToken}`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        if (killedRef.current) return;
        retries = 0;
        setIsConnected(true);
      };

      ws.onclose = (e) => {
        if (killedRef.current) return;
        wsRef.current = null;
        setIsConnected(false);
        setIsPeerOnline(false);
        setIsPeerTyping(false);

        if (
          !NON_RETRIABLE_CODES.includes(e.code) &&
          retries < MAX_RETRIES
        ) {
          retries += 1;
          timer = setTimeout(open, RECONNECT_DELAY_MS);
        }
      };

      ws.onmessage = (e) => {
        if (killedRef.current) return;
        let data;
        try {
          data = JSON.parse(e.data);
        } catch {
          return;
        }

        switch (data.type) {
          case "history":
            setMessages(data.messages ?? []);
            break;
          case "message":
            setMessages((prev) => [...prev, data]);
            break;
          case "typing":
            setIsPeerTyping(Boolean(data.is_typing));
            break;
          case "presence":
            setIsPeerOnline(data.status === "online");
            if (data.status === "offline") setIsPeerTyping(false);
            break;
          case "room_closed":
            setMessages((prev) => [
              ...prev,
              { type: "system", content: data.content },
            ]);
            setIsClosed(true);
            killedRef.current = true;
            clearTimeout(timer);
            ws.close();
            wsRef.current = null;
            break;
          case "system":
          case "error":
            setMessages((prev) => [
              ...prev,
              { type: "system", content: data.content },
            ]);
            break;
        }
      };
    }

    open();

    return () => {
      killedRef.current = true;
      clearTimeout(timer);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [roomId, accessToken]);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "message", content: trimmed }));
    setMessages((prev) => [
      ...prev,
      { type: "message", sender_role: "self", content: trimmed },
    ]);
  }, []);

  const sendTyping = useCallback((isTyping) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "typing", is_typing: isTyping }));
  }, []);

  const closeRoom = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "close" }));
    }
    setIsClosed(true);
    killedRef.current = true;
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  const disconnect = useCallback(() => {
    killedRef.current = true;
    wsRef.current?.close();
    wsRef.current = null;
    
    setMessages([]);
    setIsConnected(false);
    setIsPeerOnline(false);
    setIsPeerTyping(false);
    setIsClosed(false);
  }, []);

  return {
    messages,
    isConnected,
    isPeerOnline,
    isPeerTyping,
    isClosed,
    sendMessage,
    sendTyping,
    closeRoom,
    disconnect,
  };
}
