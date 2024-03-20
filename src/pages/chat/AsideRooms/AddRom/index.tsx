import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { AddRoomContainer, BtnAddRoom, Form } from "./styles";
import { FloppyDisk } from "phosphor-react";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useAuth } from "@/hooks/providers/auth";
import { useGetAllRoom } from "@/hooks/useGetAllRoom";
import { useEffect } from "react";

const roomInForm = z.object({ 
  name: z.string().min(1),  
})

export type AddRoomFormData = z.infer<typeof roomInForm>

interface AddRoomProps {
  isNewRoom: () => void
}

export default function AddRoom({ isNewRoom }: AddRoomProps) {
  const { user } = useAuth()
  const { isSuccess, mutateAsync: createRoom} = useCreateRoom()
  const { refetch: getAllRoom} = useGetAllRoom()

  const {
    handleSubmit, 
    register,
    reset,
  } = useForm<AddRoomFormData>({
    resolver: zodResolver(roomInForm),
  })

  async function handleRegister(data: AddRoomFormData) { 
    createRoom({
      name: data.name,
      user_id: user.id
    })
  }

  useEffect(() => {
    if(isSuccess) {
      reset()
      getAllRoom()
      isNewRoom()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <AddRoomContainer> 
      <Form as="form" onSubmit={handleSubmit(handleRegister)}> 
        <input placeholder="Nome da sala"  {...register("name")} />

        <BtnAddRoom type="submit">
          <FloppyDisk size={20}/>
        </BtnAddRoom>
      </Form>
    </AddRoomContainer>
  )
}