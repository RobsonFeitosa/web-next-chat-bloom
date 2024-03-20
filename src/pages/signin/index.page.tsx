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
 
  const email = router.query.email ? String(router.query.email) : undefined
 
  const {data: dataAuth, mutateAsync: getAuth } = useAuthenticate()

  const {
    handleSubmit, 
    register,
    setValue,
    formState: {isDirty },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInForm),
  })

  async function handleRegister(data: SignInFormData) { 
    getAuth(data).then((response) => { 
      const message = response?.access_token ? 'Login com sucesso, você será redirecionado...' : 'Erro no login tente novamente'
         
      setMessageLogin(message)   
    })
  }

  useEffect(() => { 
    if(dataAuth?.access_token)  {
      signIn({token: dataAuth.access_token, user: dataAuth.user})
      

      setTimeout(() => { 
        router.push('/chat')
      }, 2000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuth])

  useEffect(() => {
    setValue('email', email ?? '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
 
 
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

            <BtnLogin type="submit" disabled={!isDirty}>
              Entrar
            </BtnLogin>

            <Message sucess={!!dataAuth?.access_token}>{messageLogin}</Message>
          </Form> 
        </SignInContent>
      </SignInContainer>
    </MainLayout>
  )
}