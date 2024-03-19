import MainLayout from '@/components/Layout/Main' 
import Image from 'next/image'
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Logo from '@/assets/logo.svg'

import { HomeContainer, HomeDescription, LinkAction, LoginWrapper, LogoWrapper } from './styles'


export default function Home() {
  return (
    <MainLayout>
      <HomeContainer> 
        <LogoWrapper>  
          <Image src={Logo} width={200} height={160} alt='Chat bloom'/>
        </LogoWrapper>

        <HomeDescription>
          <span>Uma plataforma que permite  a troca instantânea de mensagens entre usuários, facilitando a comunicação e colaboração em diversas áreas.</span>
        </HomeDescription>

        <LoginWrapper>
          <LinkAction href="/signin">
            <FaSignInAlt size={22}/> <span>Login</span>
          </LinkAction>
          <LinkAction href="/signup">
            <FaUserPlus size={22} /> <span>Registro</span>
          </LinkAction>
        </LoginWrapper>
      </HomeContainer>
    </MainLayout>
  )
}
