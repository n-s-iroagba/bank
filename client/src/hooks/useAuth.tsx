"use client"
import {Dispatch, SetStateAction, useCallback} from 'react'

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authService } from '../services/authService'
export enum Role {
  ADMIN = 'ADMIN',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER'
}

interface LoggedInUser{
    username:string
    id:number
    role:Role
}

interface AuthContextValue {
  loading: boolean
  setUser: Dispatch<SetStateAction<LoggedInUser|null>>|((user:LoggedInUser)=>void)
  user: LoggedInUser | null

}

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  user: null,
  setUser:()=>{}

})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    setLoading(true)
    
    try {
      const data = await authService.getCurrentUser()
      setUser(data)
    } catch (error) {
      console.error('❌ Failed to fetch user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, []) // Remove mounted dependency

  // Run fetchUser only once on mount
  useEffect(() => {
    fetchUser()
  }, [fetchUser])


  console.log('🔄 Auth state:', { loading,user })

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}