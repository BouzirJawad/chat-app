import { useAuth } from "./AuthProvider"
import { Redirect } from "expo-router"

export default function ProtectedRoute( { children}) {
    const { token } = useAuth()
    if (!token) {
        return <Redirect href="/login" />
    }

  return children 
}
