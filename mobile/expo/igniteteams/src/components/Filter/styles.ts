import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

export type FilterStyleProps = {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `}

  height: 38px;
  width: 70px;
  border-radius: 4px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`
