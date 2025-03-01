import React, { useState, useEffect } from 'react'

import Actions from '~/pages/Problem/Actions'
import Pagination from '~/components/Pagination'
import api from '~/services/api'

import { Container } from '~/styles/container'

import { ListTable, NotFound, Paginations } from './styles'

export default function Problem() {
  const [problems, setProblems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [problemsPerPage] = useState(10)

  const LastProblems = currentPage * problemsPerPage
  const FirstProblems = LastProblems - problemsPerPage
  const currentProblems = problems.slice(FirstProblems, LastProblems)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  useEffect(() => {
    if (currentPage !== 1) return
    async function loadProblems() {
      const response = await api.get('/delivery/problems')

      const data = response.data.map(problem => ({
        id: String(problem.id),
        delivery_id: String(problem.delivery_id).padStart(2, '0'),
        description: problem.description,
      }))

      setProblems(data)
    }

    loadProblems()
  }, [currentPage])

  return (
    <Container>
      <h1>Problemas na entrega</h1>
      {!currentProblems ? (
        <NotFound>Não há dados!</NotFound>
      ) : (
        <ListTable>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentProblems.map(problem => (
              <tr key={problem.id}>
                <td>#{problem.delivery_id.padStart(4, '0')}</td>
                <td>{problem.description}</td>
                <td>
                  <Actions
                    idDelivery={problem.delivery_id}
                    description={problem.description}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </ListTable>
      )}

      <Paginations>
        <Pagination
          itensPerPage={problemsPerPage}
          totalItens={problems.length}
          paginate={paginate}
        />
      </Paginations>
    </Container>
  )
}
