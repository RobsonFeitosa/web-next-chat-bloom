import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query' 
import AuthUser from '@/dtos/auth.dto'

interface LoginProps {
  email: string
  password: string
}

const createAuth = async (payload: LoginProps, url: string) => {
  try { 
    const response = await api.post(
      urlBuilder({
        address: url,
      }),
      payload
    )

    return response.data as AuthUser
  } catch (error) {
    console.error(error)
  }
}

export const useAuthenticate = () => {
  const url = [URLs.AUTH, URLs.AUTH_LOGIN].join('')

  return useMutation({
    mutationFn: (payload: LoginProps) => createAuth(payload, url), 
  }) 
}
