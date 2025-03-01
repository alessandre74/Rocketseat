import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 40px 18px;
`

export const Card = styled.View.attrs({
  shadowColor: '#0000001A',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowRadius: 1.5,
  shadowOpacity: 3.0,
})`
  padding: 14px 14px 6px 14px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #fff;
`
export const CardProblem = styled.View`
  height: 300px;
  margin-bottom: 8px;
`

export const CardInput = styled.TextInput`
  font-size: 16px;
  color: #666666;
`
