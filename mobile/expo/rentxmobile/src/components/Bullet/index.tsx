import React from 'react'
import * as S from './styles'

type Props = {
  active: boolean
}

export function Bullet({ active }: Props) {
  return <S.Container active={active} />
}
