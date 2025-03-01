import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

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
  padding: 22px 10px;
  margin-bottom: 14px;
  border-radius: 4px;
  background-color: #fff;
`
export const CardTitle = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 4px;
  color: #7d40e7;
`

export const CardData = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
`
export const CardInfo = styled.View`
  margin-top: 14px;
`
export const CardLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-bottom: 8px;
`
export const CardText = styled.Text`
  font-size: 14px;
  color: #666666;
`
export const CardButton = styled.View.attrs({
  shadowColor: '#0000001A',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowRadius: 1.5,
  shadowOpacity: 3.0,
})`
  flex-direction: row;
`

export const TButton = styled(RectButton)`
  flex: 3;
  justify-content: center;
  align-items: center;
  height: 84px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f8f9fd;
`
export const TButtonCenter = styled(RectButton)`
  flex: 3;
  justify-content: center;
  align-items: center;
  height: 84px;
  border: 1px solid #eee;
  background-color: #f8f9fd;
`

export const ButtonText = styled.Text`
  font-size: 12px;
  color: #999999;
`
