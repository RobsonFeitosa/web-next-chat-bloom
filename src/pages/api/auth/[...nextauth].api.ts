import NextAuth, { NextAuthOptions } from 'next-auth'

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    providers: [],
    callbacks: { 
      async signIn({ account }) {
        return true
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth() {
  return NextAuth(buildNextAuthOptions())
}
