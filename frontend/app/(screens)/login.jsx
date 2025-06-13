import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const res = await axios.post(
        "http://192.168.230.28:7460/api/auth/login",
        values
      );

      const newToken = res.data.token;
      if (newToken) {
        Toast.show({
          type: "success",
          text1: "Succès!",
          text2: "Connexion réussie 🎉",
          visibilityTime: 2000,
        });
        login(newToken);
        router.replace("/(auth)/dashBoard");
      }
    } catch (err) {
      Alert.alert(
        "Échec de la connexion",
        err?.response?.data?.message || err.message
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="flex-1 justify-center bg-gray-100 px-4">
          <View className="py-20">

            <Image
              source={require("../../assets/images/chat.webp")}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
              className="mx-auto mb-4"
            />

            <Text className="text-4xl font-bold text-center text-primary mb-8">
              Connexion
            </Text>

            <View className="bg-white p-6 rounded-2xl shadow-lg">
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white text-black"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#94A3B8"
              />
              {touched.email && errors.email && (
                <Text className="text-red-500 mb-2">{errors.email}</Text>
              )}

              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white text-black"
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor="#94A3B8"
              />
              {touched.password && errors.password && (
                <Text className="text-red-500 mb-2">{errors.password}</Text>
              )}

              <Pressable
                onPress={handleSubmit}
                className="bg-primary py-3 rounded-xl mt-4"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Se connecter
                </Text>
              </Pressable>

              <Text
                className="text-center text-primary mt-4 text-base"
                onPress={() => router.push("/(screens)/register")}
              >
                Pas encore de compte ? S'inscrire
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
