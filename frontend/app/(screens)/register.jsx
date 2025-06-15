import { View, Text, TextInput, Image, Pressable, Alert } from "react-native";
import { useAuth } from "../context/AuthProvider"
import { useRouter } from "expo-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Nom requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .min(6, "Min. 6 caractères")
    .required("Mot de passe requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Confirmation requise"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const { ip } = useAuth()
 
  const handleRegister = async (values) => {
    try {
      const res = await axios.post(
        `http://${ip}:7460/api/auth/register`,
        values
      );
      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Succès!",
          text2: "Inscription réussie!",
          visibilityTime: 2000,
        });
        router.replace("/(screens)/login");
      }
    } catch (err) {
      Alert.alert("Erreur", err?.response?.data?.error[0].msg || err.message);
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View className="flex-1 justify-center bg-gray-100 px-4">
          <View className="py-12">
            <Image
              source={require("../../assets/images/chat.webp")}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
              className="mx-auto mb-4"
            />

            <Text className="text-4xl font-bold text-center text-primary mb-8">
              Créer un compte
            </Text>

            <View className="bg-white p-6 rounded-2xl shadow-lg">
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white text-black"
                placeholder="Nom d'utilisateur"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholderTextColor="#94A3B8"
              />
              {touched.username && errors.username && (
                <Text className="text-red-500 mb-2">{errors.username}</Text>
              )}

              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white text-black"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
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

              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white text-black"
                placeholder="Confirmer le mot de passe"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                placeholderTextColor="#94A3B8"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text className="text-red-500 mb-2">
                  {errors.confirmPassword}
                </Text>
              )}

              <Pressable
                onPress={handleSubmit}
                className="bg-[#fe4a0e] py-3 rounded-xl mt-4"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  S'inscrire
                </Text>
              </Pressable>

              <Text
                className="text-center text-[#fe4a0e] mt-4 text-base"
                onPress={() => router.push("/(screens)/login")}
              >
                Vous avez déjà un compte ? Se connecter
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
