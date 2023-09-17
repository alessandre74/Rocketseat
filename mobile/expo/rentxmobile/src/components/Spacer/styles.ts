import styled, { css } from 'styled-components/native'
import { SpacerProps } from '.'

const spacer = {
  row: (space: number | undefined) => css`
    height: 8px;
    width: ${space}px;
  `,

  column: (space: number | undefined) => css`
    height: ${space}px;
    width: 100%;
  `
}

export const Container = styled.View<SpacerProps>`
  ${({ direction_, space }) => css`
    ${direction_ === 'row' ? spacer.row(space) : spacer.column(space)};
  `}
`
