import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSocket } from "../context/SocketProvider";

export default function HomeScreen() {
  const [roomCode, setRoomCode] = useState("");
  const { createRoom, joinRoom } = useSocket();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Welcome to Chat App
      </Text>

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-2xl w-full mb-4"
        onPress={async () => {
          const newRoom = await createRoom();
          router.push(`/chat/${newRoom}`);
        }}
      >
        <Text className="text-center text-white text-lg">Create Room</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter Room Code"
        value={roomCode}
        onChangeText={setRoomCode}
        className="border rounded-xl px-4 py-2 mb-4 w-full dark:bg-gray-800 dark:text-white"
      />

      <TouchableOpacity
        className="bg-green-600 p-4 rounded-2xl w-full"
        onPress={() => {
          joinRoom(roomCode);
          router.push(`/chat/${roomCode}`);
        }}
      >
        <Text className="text-center text-white text-lg">Join Room</Text>
      </TouchableOpacity>
    </View>
  );
}
