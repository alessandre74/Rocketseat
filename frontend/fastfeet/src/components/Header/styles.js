import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
`

export const Content = styled.div`
  height: 64px;
  border: 1px solid #999;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      width: 135px;
    }

    a {
      display: flex;
      font-weight: bold;
    }

    ul {
      display: flex;
      font-weight: bold;
      margin-left: 30px;
      padding: 0 22px;
      border-left: 1px solid #ddd;
      li {
        padding: 6px 14px;

        a {
          color: #999;
          &:focus {
            color: #444444;
          }
        }
      }
    }
  }
`
export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 16px;
    font-weight: bold;
    color: #707070;
    margin-bottom: 4px;
  }
  button {
    font-weight: bold;
    color: #fff;
    padding: 4px;
    background-color: #de3b3b;
    border: none;
    border-radius: 4px;
  }
`
