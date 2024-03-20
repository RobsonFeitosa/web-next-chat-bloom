import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import jwtdecode from 'jwt-decode' 
import { api } from '@/utils/handleClient'
import { destroyCookie, parseCookies, setCookie } from 'nookies'  
import { keysConstants } from '@/helpers/keys-constants'

export interface IUser {
  id: string
  name: string
  email: string 
}

interface IAuthState {
  token: string
  user: IUser
}

interface IAuthContextData {
  user: IUser
  token: string
  signIn(data: IAuthState): IAuthState | null
  signOut(): void 
  isAuthenticated(): boolean
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState)

  const signIn = useCallback((data: IAuthState) => {
    const { token, user } = data

    if (data.token === 'inactive-user--resend-mail') {
      return null
    }

    if (user) {
      const newUser = {
        id: user.id,
        name: user.name,
        email: user.email, 
      } as IUser

      setCookie(null, keysConstants.TOKEN, token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      setCookie(null, keysConstants.USER, JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user: newUser })
      return { token, user }
    }
    return { token, user }
  }, [])

  const cookies = parseCookies()
  const {
    [keysConstants.TOKEN]: tokenStorage,
    [keysConstants.USER]: userStorage,
  } = cookies

  useEffect(() => {
    if (tokenStorage && userStorage) {
      api.defaults.headers.authorization = `Bearer ${tokenStorage}`

      setData({ token: tokenStorage, user: JSON.parse(userStorage) })
    }
  }, [tokenStorage, userStorage])

  const signOut = useCallback(() => { 
    destroyCookie(null, keysConstants.TOKEN, {
      path: '/',
    })
    destroyCookie(null, keysConstants.USER, {
      path: '/',
    })
 

    setData({} as IAuthState)
  }, [setData])

  const isAuthenticated = useCallback(() => {
    const { token } = data
    try {
      const { exp }: any = jwtdecode(token)
      if (Date.now() >= exp * 1000) {
        signOut()
        return false
      }
    } catch (err) {
      return false
    }
    return true
  }, [data, signOut])
  
  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut, 
        isAuthenticated, 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
