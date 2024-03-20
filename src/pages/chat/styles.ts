import { styled } from "@stitches/react";

export const ChatContainer = styled('div', {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
})

export const ChatWrapper = styled('div', {
  background: "#313131",
  padding: 20,
  borderRadius: 8, 

  display: 'flex',
  flexDirection: 'column',
  gap: 15
})

export const Form = styled('div', { 
  height: '20%',
  position: 'relative',

  textarea: {
    padding: 15,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',

    background: '#979797',
    borderRadius: 6,
    color: '#303030',
    outline: 'none',
    fontSize:  14
  }
})

export const BtnAction = styled('button', {
  all: 'unset',

  position: 'absolute',
  right: 20,
  bottom: 20,

  background: "#4972B0",
  padding: '5px 10px',
  borderRadius: 4,
  color: 'white',

  '&:disabled': { 
    background: '#333333',
    cursor: 'default'
  }, 
})

export const ChatEmptyRoom = styled('div', {
  display: 'flex',
  justifyContent: 'center'
})

export const ChatMessages = styled('div', {
  height: '80%', 
  paddingBottom: 20
})

export const Dot = styled('div', { 
  width: 15,
  height: 15,
  borderRadius: '100%',
  background: '#A2BD30'
})

export const BtnLeaveRoom = styled('button', {
  all: 'unset',
 
})

export const ChatMessagesHeader = styled('div', {
  paddingBottom: 10,
  marginBottom: 20,

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 10,


  h4: {
    color: '#959595',
    margin: 0,
  },

  '> div': { 
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }
})

export const ChatContent = styled('div', { 
  display: 'grid',
  gridTemplateColumns: '30% auto',
  gap: 30,
  
  width: '80%',
  height: '70%',

  background: "#1c1c1c",
  padding: 40,
  borderRadius: 8
})