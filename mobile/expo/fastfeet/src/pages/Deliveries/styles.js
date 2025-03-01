import styled from 'styled-components/native'

export const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
  margin-bottom: 20px;
`

export const ProfileAvatar = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 50px;
`

export const ProfileGroup = styled.View`
  width: 200px;
`
export const ProfileMessage = styled.Text`
  font-size: 12px;
  color: #666666;
`
export const ProfileName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  width: 270px;
  color: #444444;
`

export const Deliverie = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`

export const Options = styled.View`
  flex-direction: row;
`

export const OptionItem = styled.View`
  margin-left: 10px;
  border-bottom-width: ${(props) => (props.select ? '1px' : 0)};
  border-bottom-color: #7d40e7;
`

export const OptionText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.select ? '#7D40E7' : '#999999')};
`

export const CardList = styled.FlatList.attrs({
  showVerticalIndicatorScrollIndicator: false,
})``

export const Card = styled.View.attrs({
  shadowColor: '#0000001A',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowRadius: 1.5,
  shadowOpacity: 3.0,
})`
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 4px;
  background-color: #fff;
`
export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 14px;
`
export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 12px;
  color: #7d40e7;
`
export const CardStatus = styled.View`
  padding: 12px 0;
`
export const CardInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background: #f8f9fd;
  padding: 20px;
`
export const CardData = styled.View`
  align-items: flex-start;
`
export const CardLabel = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`
export const CardText = styled.Text`
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`

export const CardButton = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`
export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: 'red',
})`
  margin: 20px 0;
`

export const CardEmpty = styled.View.attrs({
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 1.5,
  shadowOpacity: 3.0,
})`
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 200px 10px;
  font-size: 12px;
  font-weight: bold;
  color: #444444;
  border-radius: 4px;
  background-color: #f8f9fd;
`
export const CardTextEmpty = styled.Text`
  font-size: 14px;
  /* margin: 0 20px; */
  color: #707070;
`
