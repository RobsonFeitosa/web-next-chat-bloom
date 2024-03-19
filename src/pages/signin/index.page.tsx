import MainLayout from "@/components/Layout/Main";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BtnLogin, Form, GoBackLink, Message, SignInContainer, SignInContent } from "./styles";
import { useForm } from "react-hook-form";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/providers/auth";
import { useRouter } from "next/router";

const signInForm = z.object({ 
  email: z.string().min(1).email(), 
  password: z.string().min(1), 
})

export type SignInFormData = z.infer<typeof signInForm>


export default function SignIn() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [messageLogin, setMessageLogin] = useState('')

  const { isSuccess, data: dataAuth, mutateAsync: getAuth } = useAuthenticate()

  const {
    handleSubmit, 
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInForm),
  })

  async function handleRegister(data: SignInFormData) { 
    getAuth(data)
  }


  useEffect(() => { 
    if(dataAuth?.access_token)  {
      signIn({token: dataAuth.access_token, user: dataAuth.user})
      

      setTimeout(() => { 
        router.push('/chat')
      }, 2000)
    }


    const message = dataAuth?.access_token ? 'Login com sucesso, você será redirecionado...' : 'Erro no login tente novamente'
    setMessageLogin(message) 
  }, [dataAuth])

 
  return ( 
    <MainLayout> 
      <SignInContainer>
        <GoBackLink href="/" title="Inicio">
          Voltar
        </GoBackLink>
        
        <SignInContent>
          <h2>Login</h2>

          <Form as="form" onSubmit={handleSubmit(handleRegister)}>  
            <input placeholder="Insira seu e-mail"  {...register("email")} />
            <input placeholder="Insira sua senha" {...register("password")} />

            <BtnLogin type="submit">
              Entrar
            </BtnLogin>

            <Message sucess={!!dataAuth?.access_token}>{messageLogin}</Message>
          </Form> 
        </SignInContent>
      </SignInContainer>
    </MainLayout>
  )
}