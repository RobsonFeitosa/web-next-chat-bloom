import { keysConstants } from '@/helpers/keys-constants'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from './home'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { [keysConstants.USER]: userOnCookies } = parseCookies({ req })

  const user = userOnCookies ? JSON.parse(userOnCookies) : null

  return {
    props: {
      user,
    },
  }
}
