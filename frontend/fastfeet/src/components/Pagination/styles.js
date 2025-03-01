import styled from 'styled-components'

export const Container = styled.nav`
  width: 100%;

  ul {
    display: flex;
    justify-content: center;

    li {
      font-size: 16px;
      padding: 2px;

      button {
        display: block;
        color: #7d40e7;
        background: #fff;
        padding: 10px;
        border-radius: 2px;
        border: 1px solid #dddddd;
        cursor: default !important;

        &:focus {
          color: #fff;
          background-color: #7d40e7;
        }
      }
    }
  }
`
