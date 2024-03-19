import { styled } from "@stitches/react";
import Link from "next/link";

export const HomeContainer = styled('div', {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 60,


  width: '100%'
})

export const HomeDescription = styled('div', {
  textAlign: 'center',
  
  width: 600, 
  
  span: {
    color: '#a6a6a6',
  }
})

export const LogoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const LoginWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: 20
})

export const LinkAction = styled(Link, {
  all: 'unset',

  background: '#A2BD30',
  padding: '10px 20px',
  borderRadius: 6,
  display: 'flex',
  gap: 10,
  
  cursor: 'pointer',
    
  svg: {
    fill: 'black'
  },
  
  span: {
    color: 'black',    
  },
})