import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

const Pagination = ({ itensPerPage, totalItens, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItens / itensPerPage); i += 1) {
    pageNumbers.push(i)
  }

  return (
    <Container>
      <ul>
        {pageNumbers.map(num => (
          <li key={num}>
            <button type="button" onClick={() => paginate(num)}>
              {num}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Pagination

Pagination.propTypes = {
  itensPerPage: PropTypes.number.isRequired,
  totalItens: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
}
