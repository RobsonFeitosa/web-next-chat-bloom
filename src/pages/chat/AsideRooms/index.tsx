import { FaMinus, FaPlus } from "react-icons/fa";
import AddRoom from "./AddRom";
import { useEffect, useState } from "react";
import { useGetAllRoom } from "@/hooks/useGetAllRoom";
import { useAuth } from "@/hooks/providers/auth";
import { Plugs } from "phosphor-react";
import Room from "@/dtos/room.dto"; 

import { 
  AsideRoomsContainer, 
  BtnToEnterRoom, 
  BtnNewRoom,  
  RoomsHeader, 
  BtnDisconect,
  RoomsWraper
} from "./styles";
import { io } from "socket.io-client";
import { EntityTypeEnum } from "../enum/entity-type";

interface AsideRoomsProps{
  onRoom: Room | undefined
  setOnRoom: (room: Room | undefined) => void
} 

export default function AsideRooms({ onRoom, setOnRoom }: AsideRoomsProps) {
  const {user} = useAuth()
  const [isNewRoom, setIsNewRoom] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])

  const { data: roomsData, refetch: getAllRoom} = useGetAllRoom()

  useEffect(() => {
    user && getAllRoom() 
  }, [user, getAllRoom])


  useEffect(() => { 
    if(!roomsData) {
      return
    } 

    
    setRooms(state => [...state, ...roomsData])
  }, [roomsData])
 
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL ?? ''); 
    
    socket.on('onMessage', (data) => {    
      if(data.content.room_body && data.content.type === EntityTypeEnum.ROOM) {
        const roomMessage: Room = { 
          id: data.content.room_body.id,
          name: data.content.room_body.name,
          user_id: data.content.user_id,
        } 
  
        setRooms(state => [...state, roomMessage])
      } 
    });

    return () => {
      socket.disconnect();
      setRooms([]) 
    }; 
  }, [])
 
  function handleAddNewRoom() {
    setIsNewRoom(!isNewRoom)
  } 

  function handleToEnter(room: Room) { 
    setOnRoom(room) 
  } 

  function handleDisconectRoom() { 
    setOnRoom(undefined) 
  } 

  return ( 
    <AsideRoomsContainer>
      <RoomsHeader>
        <h3>Salas</h3>

        <BtnNewRoom onClick={handleAddNewRoom} actived={isNewRoom}>
          {isNewRoom ? (
            <FaMinus size={14}/>
          ) : (
            <FaPlus size={14}/>
          )}
        </BtnNewRoom>
      </RoomsHeader>

      {isNewRoom && ( 
        <AddRoom isNewRoom={handleAddNewRoom}/>
      )}


      <RoomsWraper> 
        {rooms && rooms?.length > 0 ? (
          <ul> 
            {rooms.map(room => (
              <li key={room.id}>
                <BtnToEnterRoom onClick={() => handleToEnter(room)} actived={room.id === onRoom?.id}>
                  {room.name} 
                </BtnToEnterRoom>

                <BtnDisconect onClick={handleDisconectRoom} title="Deconectar da sala"> 
                  <Plugs size={18} style={{display: room.id === onRoom?.id ? 'block' : 'none'}}/>
                </BtnDisconect>
              </li>
            ))}
          </ul>
        ) : (
          <span>Nenhuma sala registrada</span>
        )}
      </RoomsWraper>
    </AsideRoomsContainer> 
  )
}