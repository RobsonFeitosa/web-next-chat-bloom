import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'  
import Room from '@/dtos/room.dto'
 

const getAllRoom = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: URLs.ROOMS,
      }),
    )

    return response.data as Room[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllRoom = () => {  
  return useQuery({
    queryKey: ['getAllRoom'],
    queryFn: () => getAllRoom(),
    enabled: false,
  })
}
