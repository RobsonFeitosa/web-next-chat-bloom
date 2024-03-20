import { styled } from "@stitches/react";

export const AddRoomContainer = styled('div', {
  marginBottom: 20
})

export const Form = styled('div', {
  display: 'flex', 
  gap: 10,

  input: {
    width: '100%',
    padding: '6px 10px',
    fontSize: 14,
    borderRadius: 4,
    outline: 'none',
    border: 0
  }
})

export const BtnAddRoom = styled('button', {
  all: 'unset',

  width: 30,
  height: 30,
  background: '#673ab7',
  padding: '4px 7px',
  borderRadius: 4,

  svg: {
    fill: 'white'
  }
})