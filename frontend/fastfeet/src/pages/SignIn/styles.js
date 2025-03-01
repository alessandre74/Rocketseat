import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin: 0 auto;
  height: 425px;
  width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);

  img {
    height: 44px;
    width: 258px;

    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;

    span {
      font-weight: bold;
      margin-right: 6px;
    }

    strong {
      color: red !important;
    }
    input {
      height: 45px;
      width: 100%;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 10px 15px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    button {
      height: 45px;
      width: 100%;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
    }
  }
`
export const Email = styled.div``
export const Senha = styled.div``
