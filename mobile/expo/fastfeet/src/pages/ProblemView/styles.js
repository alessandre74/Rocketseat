import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 40px 18px;
`

export const CardList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``

export const Card = styled.View.attrs({
  shadowColor: '#0000001A',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 2.5,
  shadowOpacity: 6.0,
})``

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 16px 0;
  color: #fff;
`
export const CardProblem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 0 6px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #fff;
`

export const CardText = styled.Text`
  font-size: 16px;
  width: 250px;
  color: #999999;
  padding: 2px;
`
export const CardData = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #c1c1c1;
`
