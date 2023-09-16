import { createBox, createText } from '@shopify/restyle'
import { ThemeProps } from '../theme'
import { Item } from '../components/Item'
import { Button } from '../components/Button'

const Box = createBox<ThemeProps>()
const Text = createText<ThemeProps>()

export function Home() {
  return (
    <Box flex={1} bg="primary_800" justifyContent="center" alignItems="center" p="m">
      <Box width="100%" bg="white" p="l" borderRadius={6}>
        <Text variant="title">Plano Trimestral</Text>

        <Box gap="m" borderTopWidth={1} borderColor="gray" pt="xl">
          <Item icon="timer" title="Entrega em 72h" />
          <Item icon="local-shipping" title="Delivery grátis" />
          <Item icon="credit-card" title="R$ 99,90 por mês" />
        </Box>

        <Box flexDirection="row" mt="xl" gap="m">
          <Button title="Simular" variant="secondary" />
          <Button title="Contratar" variant="primary" />
        </Box>
      </Box>
    </Box>
  )
}
