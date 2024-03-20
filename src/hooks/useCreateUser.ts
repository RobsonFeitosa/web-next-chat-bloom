import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query' 

interface RegisterProps {
  name: string
  email: string
  password: string
}

const createUser = async (payload: RegisterProps) => { 
  try { 
    const response = await api.post(
      urlBuilder({
        address: URLs.USERS,
      }),
      payload
    ) 

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateUser = () => { 
  return useMutation({
    mutationFn: (payload: RegisterProps) => createUser(payload), 
  }) 
}
