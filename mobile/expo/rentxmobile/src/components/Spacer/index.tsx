import React from 'react'
import * as S from './styles'

export type SpacerProps = {
  direction_?: 'row' | 'column'
  space?: number
}

export function Spacer({ direction_ = 'column', space = 8 }: SpacerProps) {
  return <S.Container direction_={direction_} space={space} />
}
