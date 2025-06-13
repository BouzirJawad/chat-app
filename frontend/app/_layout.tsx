import { Stack, Slot } from "expo-router";
import "./global.css"
import AuthProvider from './context/AuthProvider'
import Toast from "react-native-toast-message"

export default function RootLayout() {
  return(
    <AuthProvider>
      <Slot />
      <Toast />
    </AuthProvider>
  )
}
