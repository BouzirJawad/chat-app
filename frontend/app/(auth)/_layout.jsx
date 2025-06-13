import { Slot, slot , useRouter } from "expo-router"
import { useEffect } from "react"
import { useAuth } from '../context/AuthProvider'

export default function ProtectedLayout() {
    const { token } = useAuth()
    const router = useRouter()

    useEffect(()=> {
        if (!token) {
            router.replace('/(screens)/connect')
        }
    }, [token])

    if (!token) {
        router.replace('/(screens)/connect')
    }
    
    return <Slot />
}