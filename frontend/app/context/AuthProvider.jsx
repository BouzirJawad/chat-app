import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState, useMemo } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
      const loadStoredData = async () => {
        const storedToken = await AsyncStorage.getItem('token')
        const storedUser = await AsyncStorage.getItem('user')

        if (storedToken) {
            setToken(storedToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`

            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
        }
      }

      loadStoredData()
    }, [])

    const getUserInfo = async () => {
        try {
            const res = await axios.get("")
            const user = res.data
            setUser(user)
            await AsyncStorage.setItem('user', JSON.stringify(user))
        } catch (error) {
            console.error('Failed to fetch user:', error)
            logout()
        }
    }

    const login = (newToken) => {
        setToken(newToken)
    }

    const logout = async () => {
        setUser(null)
        await AsyncStorage.removeItem('user')
        setToken(null)
        await AsyncStorage.removeItem('token')
    }
    
    useEffect(() => {
      const syncToken = async () => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await AsyncStorage.setItem('token', token)
            getUserInfo()
        } else {
            delete axios.defaults.headers.common['Authorization']
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
        }
      }

      syncToken()
    }, [token])
    

    const contextValue = useMemo(
        () => ({
            token,
            user,
            setUser,
            login,
            logout
        }),
        [token, user]
    )
  return (
    <AuthContext.Provider value={contextValue}>
        { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider