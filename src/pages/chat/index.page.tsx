import { useEffect, useState } from "react";
import AsideRooms from "./AsideRooms";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BtnAction, BtnLeaveRoom, ChatContainer, ChatContent, ChatEmptyRoom, ChatMessages, ChatMessagesHeader, ChatWrapper, Dot, Form } from "./styles";
import Room from "@/dtos/room.dto";
import Messages from "./Messages";
import io from 'socket.io-client';
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/providers/auth";
import User from "@/dtos/user.dto";
import { useRouter } from "next/router";
import { EntityTypeEnum } from "./enum/entity-type";
 
interface ChatBody {
  msg: string;
  user: {
    id: string;
    name: string;
  };
  room_id: number;
}

interface RoomBody {
  name: string;
}

export interface Message {
  type: EntityTypeEnum;
  user_id: string;
  chat_body?: ChatBody;
  room_body?: RoomBody;
}

const messageForm = z.object({ 
  message: z.string().min(1),  
})

export type MessageFormData = z.infer<typeof messageForm>

const socket = io(process.env.NEXT_PUBLIC_API_URL ?? ''); 

export default function Chat() {
  const { user, signOut } = useAuth()
  const [ onRoom, setOnRoom ] = useState<Room | undefined>()
  const [ userLogger, setUserLogger ] = useState<User | undefined>()

  const router = useRouter()

  const {
    handleSubmit, 
    register,
    reset,
    setFocus, 
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageForm),
  })


  async function handleRegister(data: MessageFormData) {   
    const chatMessage: Message = {
      type: EntityTypeEnum.CHAT,
      user_id: user.id,
      chat_body: {
        msg: data.message,
        user: {
          id: user.id,
          name: user.name
        },
        room_id: Number(onRoom?.id)
      } 
    }
 
    socket.emit('newMessage', chatMessage)

    setFocus('message')
    reset()
  } 

  function handleOnRoom(room: Room | undefined) {
    setOnRoom(room)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(handleRegister)();
      e.preventDefault();  
    }
  };

  function handleLoggeOut() {
    signOut()
    
    router.push('/')
  }

  useEffect(() => {
    user && setUserLogger(user)
  }, [user])
  
  return (
    <ChatContainer>

      <ChatMessagesHeader>
        <div> 
          <Dot />
          <h4>{userLogger?.name}</h4>
        </div>
      
        <BtnLeaveRoom onClick={handleLoggeOut}>
          sair
        </BtnLeaveRoom> 
      </ChatMessagesHeader>

      <ChatContent>
        <AsideRooms onRoom={onRoom} setOnRoom={handleOnRoom}/>

        <ChatWrapper>
          <ChatMessages>
            {onRoom ? (
              <Messages room={onRoom}/>
            ) : ( 
              <ChatEmptyRoom>
                <i>Escolha uma sala para se conectar.</i>
              </ChatEmptyRoom>
            )}
          </ChatMessages>  

          <Form as="form" onSubmit={handleSubmit(handleRegister)}> 
            <textarea  onKeyDown={handleKeyDown} {...register("message")} disabled={!onRoom} />
            <BtnAction type='submit' disabled={onRoom === undefined}>Enviar</BtnAction>
          </Form>
        </ChatWrapper>
      </ChatContent>
    </ChatContainer>
  )
}