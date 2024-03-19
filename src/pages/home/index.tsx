import MainLayout from '@/components/Layout/Main' 
import { HomeContainer, HomeDescription, LogoWrapper } from './styles'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'

export default function Home() {
  return (
    <MainLayout>
      <HomeContainer> 
        <LogoWrapper>  
          <Image src={Logo} width={200} height={160} alt='Chat bloom'/>
        </LogoWrapper>

        <HomeDescription>
          <span>Uma plataforma que permite a troca de mensagens em tempo real entre usuários. Pode ser usado para comunicação pessoal, suporte ao cliente, colaboração em equipe e muito mais. Esses sistemas variam em complexidade e recursos, oferecendo desde chats simples até assistentes virtuais avançados. </span>
        </HomeDescription>
      </HomeContainer>
    </MainLayout>
  )
}
