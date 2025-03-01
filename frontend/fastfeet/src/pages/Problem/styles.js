import styled from 'styled-components'

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    height: 36px;
    width: 237px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 10px 30px;
    color: #999999;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 142px;
    background: #7d40e7;
    color: #fff;
    border-radius: 4px;

    span {
      margin-left: 4px;
      font-weight: bold;
    }
  }
`

export const ListTable = styled.table`
  border-collapse: separate !important;
  border-spacing: 0 15px !important;
  font-size: 16px;

  th {
    color: #444444;
    text-align: left;
    padding: 0 20px;
  }

  th:first-child {
    text-align: left;
    width: 220px;
  }

  th:nth-child(2) {
    width: 856px;
  }

  th:last-child {
    text-align: center;
  }

  td {
    color: #666666;
    height: 60px;
    padding: 0 20px;
    background: #fff;
  }

  td:first-child {
    text-align: left;
    border-radius: 4px 0 0 4px;
  }

  td:last-child {
    border-radius: 0 4px 4px 0;
  }
`

export const NotFound = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 300px 400px;
  height: 100px;
  width: 400px;
  font-size: 20px;
  color: #fff;
  border-radius: 4px;
  background: #7159c1;
  box-shadow: 1px 1px 8px #000000;
`

export const Paginations = styled.div`
  display: flex;
  justify-content: center;
`
