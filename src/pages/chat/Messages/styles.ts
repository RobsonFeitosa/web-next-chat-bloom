import { styled } from "@stitches/react";

export const MessagesContainer = styled('div', {
  padding: '0 10px',

  maxHeight: 450,
  paddingBottom: 30,
  overflowY: 'auto',
  scrollBehavior: 'smooth'
})

export const TalkingTo = styled('div', {})

export const MessageContent = styled('div', { 
  margin: '15px 0',

  p: {
    margin: 0,
    fontSize: 14,
    color: 'white'
  },

  span: {
    fontSize: 12,
  },  

  variants: {
    isSelf: {
      true: {
        '> div': { 
          display: 'flex',
          justifyContent: 'flex-end',
          textAlign: 'right',

          '> div > div > div': {
            borderWidth: '15px 15px 0 0',
            borderColor: '#A2BD30 transparent transparent transparent', 
            position: 'absolute',
            right: '-10px',
            left: 'auto',
            top: 0,
          }
        },

        span: {
          color: '#536604'
        },  
        
      }, 
      false: {
        '> div > div': { 
          background: "#686767",

          span: {
            color: '#272626'
          }
        }
      }
    }
  }
})

export const Arrow = styled('div', { 
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '0 15px 15px 0',
  borderColor: 'transparent #686767 transparent transparent', 

  display: 'inline-block',

  position: 'absolute',
  left: '-10px',
  right: 'auto',
  top: 0,
})


export const MessageGroup = styled('div', {
  '& + & > div > div': {
    span: { 
      display: 'none'
    }, 

    '> div': {
      display: 'none'
    }
  }
})


export const MessageWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'relative',
 
  background: "#A2BD30",
  padding: '6px 10px',
  borderRadius: 4,
  lineHeight: '18px',
  margin: '4px 0',
  width: 'max-content',

  p: {
    margin: 0,
  }
})