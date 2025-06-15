import { Stack, Slot } from "expo-router";
import "./global.css"
import AuthProvider from './context/AuthProvider'
import { SocketProvider } from "./context/SocketProvider"
import Toast from "react-native-toast-message"

export default function RootLayout() {
  return(
    <AuthProvider>
      <SocketProvider>
        <Slot />
        <Toast />
      </SocketProvider>
    </AuthProvider>
  )
}
