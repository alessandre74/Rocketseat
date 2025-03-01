import styled from 'styled-components/native'
import { Camera } from 'expo-camera'

export const Container = styled.View`
  padding: 30px 18px;
`

export const Card = styled.View.attrs({
  shadowColor: '#999999',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 0.8,
  shadowOpacity: 3.0,
})`
  height: 550px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #fff;
`
export const CardCamera = styled(Camera)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`

export const CardIcon = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`

export const CardRadius = styled.View`
  padding: 20px;
  border-radius: 40px;
  background-color: #000000;
  opacity: 0.5;
`
export const CardImage = styled.Image`
  flex: 1;
  width: 100%;
`

export const CardText = styled.Text`
  font-size: 16px;
  color: #444444;
`
