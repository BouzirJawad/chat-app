import { useAuth } from "../context/AuthProvider";
import { useSocket } from "../context/SocketProvider";
import { useState } from "react";
import { TextInput, Button, View, Alert } from "react-native";

const ChatInput = ({ roomCode }) => {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const { user } = useAuth();

  const sendMessage = () => {
    if (!socket || !user || !roomCode) {
      console.log("Missing socket, user, or roomCode", { socket, user, roomCode });
      Alert.alert("Error", "Missing connection or room info.");
      return;
    }

    socket.emit("send_message", {
      roomCode,
      message,
      username: user.username,
    });

    setMessage('');
  };

  return (
    <View className="flex-row items-center space-x-2 p-2">
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        className="flex-1 border rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatInput;
