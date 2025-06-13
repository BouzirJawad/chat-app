import { useEffect } from "react";
import { Text, Image, View } from "react-native";
import { router } from "expo-router"

export default function Index() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(screens)/connect")
    }, 1500);
  
    return () => {
      clearTimeout(timer)
    }
  }, [])
  
  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300 px-6">
      <Image
        source={require("../assets/images/chat.webp")}
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold">Aji ndwiw</Text>
    </View>
  );
}
