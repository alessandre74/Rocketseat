import { createTheme } from '@shopify/restyle'
import { colors } from './_colors'
import { spacing } from './_spacing'
import { textVariants } from './_textVariants'
import { buttonVariants } from './_buttonVariants'

export const theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants
})

export type ThemeProps = typeof theme
