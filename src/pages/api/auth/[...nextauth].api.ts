import NextAuth, { NextAuthOptions } from 'next-auth'

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    providers: [],
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
