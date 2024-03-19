import { styled } from "@stitches/react";
import Link from "next/link";

export const SignInContainer = styled('div', { 
  height: '100vh',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 80,
})

export const SignInContent = styled('div', {
  background: "#363636",
  
  width: 600, 
  borderRadius: 8,
  padding: '40px 50px',
  
  h2: {
    color: 'white',
    textAlign: 'center'
  }  
})

export const GoBackLink = styled(Link, {  
  textDecoration: 'none',
  color: '#A2BD30'
})

export const BtnLogin = styled('button', {
  all: 'unset',

  background: '#A2BD30',
  padding: '10px 20px',
  borderRadius: 6, 

  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  
  cursor: 'pointer',
  color: 'black',   

  width: 120,
  margin: '0 auto',
    
})

export const Message = styled('span', {
  textAlign: 'center',
  
  variants: {
    sucess: {
      true: {
        color: '#A2BD30'
      },
      false: {
        color: 'red'
      }
    }
  }
})

export const Form = styled('div', {
  marginTop: 40,

  display: 'flex',
  flexDirection: 'column',
  gap: 20,

  input: {
    width: '100%',
    padding: '15px 20px',
    color: 'white'
  }
})