import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'  
import Room from '@/dtos/room.dto'

interface RoomProps {
  name: string
  user_id: string
}

const createRoom = async (payload: RoomProps) => {
  try { 
    const response = await api.post(
      urlBuilder({
        address: URLs.ROOMS,
      }),
      payload
    )

    return response.data as Room
  } catch (error) {
    console.error(error)
  }
}

export const useCreateRoom = () => {  
  return useMutation({
    mutationFn: (payload: RoomProps) => createRoom(payload),
  }) 
}
