import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddRoomContainer, BtnAddRoom, Form } from "./styles";
import { FloppyDisk } from "phosphor-react"; 
import { useAuth } from "@/hooks/providers/auth"; 
import { Message } from "../../index.page";
import { EntityTypeEnum } from "../../enum/entity-type";
import { io } from "socket.io-client";

const roomInForm = z.object({ 
  name: z.string().min(1),  
})

export type AddRoomFormData = z.infer<typeof roomInForm>

const socket = io(process.env.NEXT_PUBLIC_API_URL ?? ''); 

interface AddRoomProps {
  isNewRoom: () => void
}

export default function AddRoom({ isNewRoom }: AddRoomProps) {
  const { user } = useAuth()  

  const {
    handleSubmit, 
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<AddRoomFormData>({
    resolver: zodResolver(roomInForm),
  })

  async function handleRegister(data: AddRoomFormData) { 
    const roomMessage: Message = {
      type: EntityTypeEnum.ROOM,
      user_id: user.id,
      room_body: {  
        name: data.name
      } 
    } 
 
    socket.emit('newMessage', roomMessage)

    reset() 
    isNewRoom()    
  } 

  return (
    <AddRoomContainer> 
      <Form as="form" onSubmit={handleSubmit(handleRegister)}> 
        <input placeholder="Nome da sala"  {...register("name")} />

        <BtnAddRoom type="submit" disabled={isSubmitting}>
          <FloppyDisk size={20}/>
        </BtnAddRoom>
      </Form>
    </AddRoomContainer>
  )
}