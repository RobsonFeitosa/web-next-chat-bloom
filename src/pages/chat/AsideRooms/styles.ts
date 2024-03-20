import { styled } from "@stitches/react";

export const BtnDisconect = styled('button', {
  all: 'unset',
  
})

export const BtnToEnterRoom = styled('button', {
  all: 'unset',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  svg: {
    display: 'none'
  },

  variants: {
    actived: {
      true: {
        color: '#A2BD30'
      }
    }
  }
})


export const RoomsWraper = styled('div', {
  borderTop: '1px solid #505050',
  paddingTop: 15
})

export const AsideRoomsContainer = styled('div', {
  borderRadius: 8,
  background: '#313131',
  padding: 20,


  ul: {
    margin: 0,
    padding: 0,


    li: {
      listStyle: 'none',
      padding: '5px 0',
      transition: 'all ease-in-out 0.2',
      display: 'flex', 
      justifyContent: 'space-between',

      '&:hover': {
        [`${BtnToEnterRoom}`]: {
          color: '#A2BD30',

          svg: {
            display: 'block'
          }
        }
      }
    }
  }, 
})

export const RoomsHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,

  h3: {
    margin: 0,
    fontSize: 18,
  }
})


export const BtnNewRoom = styled('button', {
  all: 'unset',
  
  height: 30,
  width: 30,
  background: '#262626', 
  borderRadius: '100%',


  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  transition: 'all ease-in-out 0.2s',

  '&:hover': {
    background: '#A2BD30',

    svg: {
      fill: 'white'
    } 
  },

  variants: {
    actived: {
      true: { 
        background: '#A2BD30',

        svg: {
          fill: 'white'
        } 
      }
    }
  }
})