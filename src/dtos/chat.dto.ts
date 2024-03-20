import Room from "./room.dto"
import User from "./user.dto"

export default interface Chat { 
	id: number
	message: string
	room: Room,
  user: User
}