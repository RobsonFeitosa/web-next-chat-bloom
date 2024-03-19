import { ReactNode } from 'react'  
 
interface MainProps {  
  children: ReactNode
}

export default function MainLayout({
  children, 
}: MainProps) {
  return (
    <div>   
      {children}
    </div>
  )
}
