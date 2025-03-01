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

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 142px;
    background: #7d40e7;
    color: #fff;
    border-radius: 4px;

    strong {
      margin-left: 4px;
    }
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

export const ListTable = styled.table`
  border-collapse: separate !important;
  border-spacing: 0 18px !important;
  font-size: 16px;
  width: 100%;

  th {
    color: #444444;
    text-align: left;
  }

  th:first-child {
    text-align: left;
    padding-left: 20px;
    width: 80px;
  }

  th:nth-child(2) {
    width: 220px;
  }

  th:nth-child(3) {
    width: 300px;
  }
  th:nth-child(4) {
    width: 160px;
  }

  th:nth-child(5) {
    width: 160px;
  }
  th:nth-child(6) {
    width: 180px;
  }

  th:last-child {
    text-align: center;
  }

  td {
    color: #666666;
    height: 60px;
    background: #fff;
  }

  td:first-child {
    text-align: left;
    padding-left: 20px;
    border-radius: 4px 0 0 4px;
  }

  td:nth-child(3) {
    div {
      display: flex;
      align-items: center;
    }

    img {
      height: 36px;
      width: 36px;
      margin-right: 6px;
      border-radius: 50%;
    }
  }

  td:nth-child(6) {
    font-size: 14px;
  }

  td:last-child {
    border-radius: 0 4px 4px 0;
  }
`
export const Status = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  background: ${props => props.background && props.background};
  color: ${props => props.color && props.color};
  border-radius: 14px;
  max-width: 8em;
  padding: 4px 4px 4px 8px;
`

export const StatusBall = styled.div`
  content: '';
  height: 10px;
  width: 10px;
  margin-right: 6px;
  background: ${props => props.color && props.color};
  border-radius: 50%;
`

export const Paginations = styled.div`
  display: flex;
  justify-content: center;
`
