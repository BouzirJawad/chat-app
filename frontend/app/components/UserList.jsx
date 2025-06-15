export default function UserList({ users }) {
  return (
    <View className="flex-row flex-wrap mb-2">
      {users.map((u, i) => (
        <Text key={i} className="mr-2 text-xs bg-gray-200 p-1 rounded-lg">{u}</Text>
      ))}
    </View>
  );
}
