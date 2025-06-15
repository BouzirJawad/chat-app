// context/SocketProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, ip } = useAuth(); // make sure you pass ip correctly

  useEffect(() => {
    const newSocket = io(`http://192.168.156.28:7460`, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [ip]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("✅ Connected to socket:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });
    }
  }, [socket]);

  const createRoom = () => {
    return new Promise((resolve) => {
      const handler = ({ roomCode }) => {
        resolve(roomCode);
        socket.off("room_created", handler); // cleanup listener once done
      };

      socket.on("room_created", handler);
      socket.emit("create_room", { username: user.username });
    });
  };

  const joinRoom = (roomCode) => {
    socket.emit("join_room", { roomCode, username: user.username });
  };

  return (
    <SocketContext.Provider value={{ socket, createRoom, joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
