import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function MainScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="items-center w-full space-y-5">

        <Image
          source={require('../../assets/images/chat.webp')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />

        <Text className=" text-3xl font-bold mt-5 text-center">
          Bienvenue sur ChatZone
        </Text>
        <Text className="text-lg text-center">
          Connectez-vous ou créez un compte pour continuer
        </Text>

        <View className="w-[50%] mt-6 gap-3">
          <Pressable
            onPress={() => router.push("/(screens)/login")}
            className="bg-orange-600 w-full py-3 rounded-xl"
          >
            <Text className="text-center w-full text-white font-bold text-xl">
              Se connecter
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(screens)/register")}
            className="bg-white py-3 rounded-xl border-orange-600 border"
          >
            <Text className="text-center text-orange-500 font-bold text-xl">
              S'inscrire
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
