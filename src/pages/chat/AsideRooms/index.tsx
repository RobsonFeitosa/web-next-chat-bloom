import { FaMinus, FaPlus } from "react-icons/fa";
import AddRoom from "./AddRom";
import { useEffect, useState } from "react";
import { useGetAllRoom } from "@/hooks/useGetAllRoom";
import { useAuth } from "@/hooks/providers/auth";
import { Plugs, SignIn } from "phosphor-react";
import Room from "@/dtos/room.dto";
import io from 'socket.io-client';

import { 
  AsideRoomsContainer, 
  BtnToEnterRoom, 
  BtnNewRoom,  
  RoomsHeader, 
  BtnDisconect,
  RoomsWraper
} from "./styles";

interface AsideRoomsProps{
  onRoom: Room | undefined
  setOnRoom: (room: Room | undefined) => void
}

const socket = io('http://localhost:3333'); 

export default function AsideRooms({ onRoom, setOnRoom }: AsideRoomsProps) {
  const {user} = useAuth()
  const [isNewRoom, setIsNewRoom] = useState(false)

  const { data: rooms, refetch: getAllRoom} = useGetAllRoom()

  useEffect(() => {
    user && getAllRoom()
  }, [user, getAllRoom])

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