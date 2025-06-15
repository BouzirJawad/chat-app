import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSocket } from "../context/SocketProvider";
import { useAuth } from "../context/AuthProvider";
import ChatInput from "../components/ChatInput";

export default function ChatRoom() {
  const { roomCode } = useLocalSearchParams();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  console.log('roomCode:', roomCode);


  useEffect(() => {
    if (!socket || !roomCode) return;

    // Fetch old messages
    socket.emit("get_messages", { roomCode });

    // Listen for initial history
    socket.on("message_history", (oldMessages) => {
      setMessages(oldMessages);
    });

    // Listen for new incoming messages
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message_history");
      socket.off("receive_message");
    };
  }, [socket, roomCode]);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold text-center mb-4 text-gray-800 ">
        Room Code: {roomCode}
      </Text>

      <ScrollView className="flex-1 mb-2">
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`p-2 my-1 rounded-xl ${
              msg.username === user.username ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            <Text className="font-semibold">{msg.username}</Text>
            <Text>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>

      <ChatInput roomCode={roomCode} />
    </View>
  );
}
