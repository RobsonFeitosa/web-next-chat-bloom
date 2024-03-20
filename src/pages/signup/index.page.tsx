import MainLayout from "@/components/Layout/Main";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BtnLogin, Form, GoBackLink, SignUpContainer, SignUpContent } from "./styles";
import { useForm } from "react-hook-form"; 
import { useRouter } from "next/router";
import { useCreateUser } from "@/hooks/useCreateUser";

const SignUpForm = z.object({ 
  name: z.string().min(1), 
  email: z.string().min(1).email(), 
  password: z.string().min(1), 
})

export type SignUpFormData = z.infer<typeof SignUpForm>


export default function SignUp() { 
  const router = useRouter() 

  const {mutateAsync: createUser } = useCreateUser()

  const {
    handleSubmit, 
    register,
    formState: {isDirty },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpForm),
  })

  async function handleRegister(data: SignUpFormData) { 
    createUser(data).then(response => { 
      if(response?.status === 201) {
        router.push({
          pathname: '/signin',
          query: {
            email: data.email
          }
        })
      }
    }) 
  }
 
  return ( 
    <MainLayout> 
      <SignUpContainer>
        <GoBackLink href="/" title="Inicio">
          Voltar
        </GoBackLink>
        
        <SignUpContent>
          <h2>Cadastro</h2>

          <Form as="form" onSubmit={handleSubmit(handleRegister)}>  
            <input placeholder="Insira seu nome"  {...register("name")} />
            <input placeholder="Insira seu e-mail"  {...register("email")} />
            <input placeholder="Insira sua senha" {...register("password")} />

            <BtnLogin type="submit" disabled={!isDirty}>
              Registrar
            </BtnLogin> 
          </Form> 
        </SignUpContent>
      </SignUpContainer>
    </MainLayout>
  )
}