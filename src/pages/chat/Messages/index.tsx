import io from 'socket.io-client';
import { Arrow, MessageContent, MessageGroup, MessageWrapper, MessagesContainer } from "./styles";
import { useEffect, useRef, useState } from 'react';
import Room from '@/dtos/room.dto';
import { useAuth } from '@/hooks/providers/auth'; 
import { useGetAllChatsByRoomId } from '@/hooks/useGetAllChatsByRoomId';
import groupMessagesByUser from './group-messages-users';


 
export interface MessagesData {
  msg: string,
  user: {
    name: string
    id: string
  },
  room_id: number 
}

interface MessagesProps {
  room: Room | undefined
}

export default function Messages({ room }: MessagesProps) {
  const { user } = useAuth() 
  const [messages, setMessages] = useState<MessagesData[]>([])

  const {data: chatsData, refetch: getAllChatsByRoomId} = useGetAllChatsByRoomId(room?.id ?? 0)

  useEffect(() => {
    user && getAllChatsByRoomId()
  }, [user, room, getAllChatsByRoomId])

  useEffect(() => { 
    if(!chatsData) {
      return
    }

    const chats = chatsData.map(chat => {
      return {
        msg: chat.message,
        user: {
          id: chat.user.id,
          name: chat.user.name,
        },
        room_id: chat.room.id
      }
    })
    
    setMessages(state => [...state, ...chats])
  }, [chatsData])
  
  useEffect(() => {  
    const socket = io('http://localhost:3333'); 
 
    socket.on('onMessage', (data) => {   
      setMessages(state => [...state, data.content])
    });

    return () => {
      socket.disconnect();
      setMessages([]) 
    }; 
  }, [room]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (scrollRef.current) { 
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const messagesGrouped = groupMessagesByUser(messages); 
  
  return (
    <MessagesContainer ref={scrollRef}> 
      {messagesGrouped.map((messageGroup) => ( 
        <MessageContent key={messageGroup.userId} isSelf={messageGroup.userId === user?.id}>
          {messageGroup.messages.map(message => (
            <MessageGroup key={message.msg} >
              {message.room_id === room?.id && (
                <MessageWrapper>
                  <div> 
                    <Arrow />
                    <span>{message.user.name}</span>
                    <p>{message.msg}</p>
                  </div> 
                </MessageWrapper>
              )}
            </MessageGroup>
          ))}
        </MessageContent>
      ))}
    </MessagesContainer>
  )
}