import styled, { css } from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors.wifi};
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    border-radius: 18px;
    box-shadow: 0 0 4px ${theme.colors.text_detail};
  `}
`
