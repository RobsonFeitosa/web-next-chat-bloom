import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'   
import Chat from '@/dtos/chat.dto'
 
const getAllChatsByRoomId = async (uri: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: uri,
      }),
    )

    return response.data as Chat[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllChatsByRoomId = (room_id: number) => {  
  const uri = [URLs.CHATS, URLs.CHATS_ROOM, '/', room_id].join('')

  return useQuery({
    queryKey: ['getAllChatsByRoomId'],
    queryFn: () => getAllChatsByRoomId(uri),
    enabled: false,
  })
}
