import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSocket } from "../context/SocketProvider";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import UserList from "../components/UserList";
import InfoBanner from "../components/InfoBanner";

export default function ChatRoomScreen() {
  const { roomCode } = useLocalSearchParams();
  const { messages, getMessages, users, infoEvents } = useSocket();

  useEffect(() => {
    getMessages(roomCode);
  }, []);

  return (
    <View className="flex-1 bg-gray-100 dark:bg-black p-2">
      <Text className="text-center text-xl font-bold mb-2 text-gray-800 dark:text-white">
        Room: {roomCode}
      </Text>
      <UserList users={users} />
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble {...item} />}
        keyExtractor={(_, i) => i.toString()}
        className="flex-1"
      />
      <InfoBanner infoEvents={infoEvents} />
      <ChatInput roomCode={roomCode} />
    </View>
  );
}
