import jwtDecode from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'
import { keysConstants } from './helpers/keys-constants'
import { routesPermission } from './helpers/routes-permission'
 
function onAuthenticated(token: string) {
  try {
    const { exp }: any = jwtDecode(token)
    if (Date.now() >= exp * 1000) {
      return false
    }
  } catch (err) {
    return false
  }
  return true
}


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next')) return NextResponse.next()

  const user = req.cookies.get(keysConstants.USER)?.value
  const token = req.cookies.get(keysConstants.TOKEN)?.value

  const isAuth = onAuthenticated(token ?? '')  

  if (!user && !routesPermission.includes(pathname) && !isAuth) { 
    req.nextUrl.pathname = '/'
    return NextResponse.redirect(req.nextUrl)
  }

  return NextResponse.next()
}
