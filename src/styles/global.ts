import { globalCss } from '@stitches/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
 
export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    color: '#3333',
  },

  body: {
    backgroundColor: '$white',
    color: '$gray900',
    '-webkit-font-smoothing': 'antialiased',
  },

  '.container-box': {
    maxWidth: '84.5rem',
    padding: '0 $10',
    margin: '0 auto',
  },

  'body, input, textarea, button': {
    fontFamily: 'Inter',
    fontWeight: 400,
  },

  '@media (max-width: 768px)': {
    '.container': {
      maxWidth: '100%',
      width: '100%',
    },
  },

  '@media (max-width: 558px)': {
    '#dialog-custom ': {
      '> div:last-child': {
        minWidth: 'calc(100% - 40px)',
      },
    },
  },

  '.react-loading-skeleton': {
    lineHeight: 1.5,
  },

  '.flex-wrapper': {
    display: 'flex',
    gap: 30,

    '> div': {
      display: 'block',
      width: '100%',
    },
  },
})
 
