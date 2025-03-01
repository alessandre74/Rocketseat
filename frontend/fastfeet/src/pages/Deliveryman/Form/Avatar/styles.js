import styled from 'styled-components'

export const Container = styled.div`
  height: 510px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }
    input {
      display: none;
    }
  }
`

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 3px dashed #ddd;

  p {
    font-size: 16px;
    font-weight: bold;
    color: #ddd;
  }
`
