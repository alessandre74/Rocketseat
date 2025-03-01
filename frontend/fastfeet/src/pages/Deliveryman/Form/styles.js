import styled from 'styled-components'

export const Container = styled.div`
  max-height: 1200px;
  max-width: 940px;
  margin: 20px auto;
  padding: 12px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    section {
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
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 420px;
    padding: 30px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 4px 6px 8px #999999;
  }
`

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`

export const FormInput = styled.div`
  margin-top: 20px;

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
