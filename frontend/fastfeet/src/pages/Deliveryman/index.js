import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import Actions from '~/pages/Deliveryman/Actions'
import Pagination from '~/components/Pagination'

import api from '~/services/api'

import { Container } from '~/styles/container'
import { Search, ListTable, NotFound, Paginations } from './styles'

export default function Deliveryman() {
  const [deliveries, setDeliveries] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deliveriesPerPage] = useState(10)

  const LastDeliveries = currentPage * deliveriesPerPage
  const FirstDeliveries = LastDeliveries - deliveriesPerPage
  const currentDeliveries = deliveries.slice(FirstDeliveries, LastDeliveries)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const loadPage = id =>
    setDeliveries(deliveries.filter(deliverie => deliverie.id !== +id))

  useEffect(() => {
    async function loadDeliveries() {
      if (currentPage !== 1) return
      const response = await api.get('/deliveryman', {
        params: {
          s: search,
        },
      })

      const data = response.data.map(deliveryman => ({
        id: deliveryman.id,
        avatar: deliveryman.avatar.url,
        name: deliveryman.name,
        email: deliveryman.email,
      }))

      setDeliveries(data)
    }

    loadDeliveries()
  }, [currentPage, search])

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <Search>
        <input
          name="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por entregadores"
        />

        <Link to="/form/deliveryman" type="button">
          <MdAdd size={25} color="#fff" />
          <span>CADASTRAR</span>
        </Link>
      </Search>

      {!currentDeliveries.length && search.length ? (
        <NotFound>Não há dados!</NotFound>
      ) : (
        <ListTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {currentDeliveries.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>#{String(deliveryman.id).padStart(2, '0')}</td>
                <td>
                  <div>
                    <img
                      src={deliveryman.avatar && deliveryman.avatar}
                      alt={deliveryman.name}
                    />
                  </div>
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <Actions id={String(deliveryman.id)} loadPage={loadPage} />
                </td>
              </tr>
            ))}
          </tbody>
        </ListTable>
      )}

      <Paginations>
        <Pagination
          itensPerPage={deliveriesPerPage}
          totalItens={deliveries.length}
          paginate={paginate}
        />
      </Paginations>
    </Container>
  )
}
