export default function MessageBubble({ username, message }) {
  return (
    <View className="bg-white p-2 rounded-2xl mb-2 self-start max-w-[80%]">
      <Text className="text-sm font-semibold">{username}</Text>
      <Text>{message}</Text>
    </View>
  );
}
