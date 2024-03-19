import React, { ReactNode } from 'react' 
 
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { AuthProvider } from './providers/auth'  

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return ( 
    <AuthProvider> 
      <SkeletonTheme baseColor="#f1f1f6" highlightColor="white">  
        {children} 
      </SkeletonTheme> 
    </AuthProvider> 
  )
}

export default AppProvider
