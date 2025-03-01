import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 1200px;
  max-width: 900px;
  margin: 20px auto;
  padding: 12px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    h1 {
      font-size: 24px;
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
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 4px 6px 8px #999999;
  }
`

export const ErrForm = styled.div`
  font-weight: bold;
  color: red;
`

export const Fields = styled.div`
  display: flex;

  strong {
    margin-right: 10px;
  }

  input {
    height: 45px;
    font-size: 16px;
    padding: 12px;
    margin-top: 4px;
    margin-bottom: 10px;
    border: 1px solid #dddddd;
    border-radius: 4px;
  }
`

export const FieldName = styled.div`
  width: 690px;
  margin-right: 14px;

  input {
    width: 100%;
  }
`

export const FieldCPF = styled.div`
  width: 140px;

  input {
    width: 100%;
  }
`

export const FieldStreet = styled.div`
  margin-right: 14px;
  width: 518px;

  input {
    width: 100%;
  }
`

export const FieldNumber = styled.div`
  margin-right: 14px;
  width: 150px;

  input {
    width: 100%;
  }
`

export const FieldComplement = styled.div`
  width: 140px;

  input {
    width: 100%;
  }
`

export const FieldCity = styled.div`
  margin-right: 14px;
  width: 270px;

  input {
    width: 100%;
  }
`

export const FieldState = styled.div`
  margin-right: 14px;
  width: 270px;

  input {
    width: 100%;
  }
`

export const FieldZipCode = styled.div`
  width: 270px;

  input {
    width: 100%;
  }
`
