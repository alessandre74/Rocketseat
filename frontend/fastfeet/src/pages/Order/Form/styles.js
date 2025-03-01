import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 1200px;
  max-width: 940px;
  margin: 20px auto;
  padding: 12px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Button = styled.div`
  display: flex;

  a,
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 36px;
    width: 112px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 4px;
    margin-left: 14px;
    background: #7d40e7;
  }
`

export const FormData = styled.div`
  height: 220px;
  padding: 30px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 4px 6px 8px #999999;

  display: flex;
  flex-direction: column;

  .asyncSelect-css {
    width: 410px;
    font-size: 16px;
    margin-top: 8px;

    input {
      height: 35px;
    }
  }
`
export const FormSelect = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;

  strong {
    margin-right: 10px;
  }
`
export const FormInput = styled.div`
  strong {
    margin-right: 10px;
  }
  input {
    height: 45px;
    width: 100%;
    font-size: 16px;
    padding: 12px;
    margin-top: 8px;
    border: 1px solid #dddddd;
    border-radius: 4px;
  }
`
