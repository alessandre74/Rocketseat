import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const ActionList = styled.div`
  display: none;

  &:hover {
    display: block;
  }
`
export const Dots = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover + ${ActionList} {
    display: block;
  }
`

export const Options = styled.div`
  position: absolute;
  width: 200px;
  margin-top: 4px;
  left: calc(50% - 100px);
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #999999;
  padding: 8px;
  box-shadow: 1px 1px 8px #000000;
  z-index: 10;

  &::before {
    position: absolute;
    content: '';
    left: calc(50% - 8px);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
  }
`
export const Option = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  & + div {
    margin-top: 2px;
    padding-top: 4px;
    border-top: 1px solid #eeeeee;
  }

  button {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #999999;
    border: 0;

    svg {
      margin-right: 6px;
    }
  }
`

export const ModalContent = styled.div`
  font-size: 14px;
  padding: 4px;

  p {
    font-size: 16px;
    color: #666666;
    margin: 6px 0 6px 0;
  }
`
