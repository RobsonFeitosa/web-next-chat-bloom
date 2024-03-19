import User from "./user.dto"

export default interface AuthUser { 
  user: User
  access_token: string 
}