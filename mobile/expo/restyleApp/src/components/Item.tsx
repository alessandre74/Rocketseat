import { createBox, createText, useTheme } from '@shopify/restyle'
import { ThemeProps } from '../theme'

import { MaterialIcons } from '@expo/vector-icons'

const Box = createBox<ThemeProps>()
const Text = createText<ThemeProps>()

type Props = {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Item({ title, icon }: Props) {
  const theme = useTheme<ThemeProps>()
  return (
    <Box flexDirection="row" alignItems="center" gap="s">
      <MaterialIcons name={icon} size={24} color={theme.colors.primary_700} />
      <Text variant="body">{title}</Text>
    </Box>
  )
}
