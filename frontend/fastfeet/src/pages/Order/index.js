import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import Actions from '~/pages/Order/Actions'
import Pagination from '~/components/Pagination'

import api from '~/services/api'

import { colorStatus } from '~/utils/colorStatus'

import { Container } from '~/styles/container'

import {
  Search,
  ListTable,
  NotFound,
  Status,
  StatusBall,
  Paginations,
} from './styles'

export default function Order() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)

  const LastOrder = currentPage * ordersPerPage
  const FirstOrder = LastOrder - ordersPerPage
  const currentOrders = orders.slice(FirstOrder, LastOrder)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const loadPage = id => setOrders(orders.filter(order => order.id !== +id))

  useEffect(() => {
    async function loadOrders() {
      if (currentPage !== 1) return
      const response = await api.get('/orders', {
        params: {
          s: search,
        },
      })

      const data = response.data.map(order => ({
        id: String(order.id),
        recipient: order.recipient.name,
        avatar: order.deliveryman.avatar.url,
        deliveryman: order.deliveryman.name,
        city: order.recipient.city,
        state: order.recipient.state,
        status: order.status,
        colorStatus: colorStatus(order.status),
      }))

      setOrders(data)
    }

    loadOrders()
  }, [currentPage, search])

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <Search>
        <input
          name="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por encomendas"
        />
        <Link to="/form/order">
          <MdAdd size={25} color="#fff" />
          <strong>CADASTRAR</strong>
        </Link>
      </Search>

      {!currentOrders.length && search.length ? (
        <NotFound>Não há dados!</NotFound>
      ) : (
        <ListTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id.padStart(4, '0')}</td>
                <td>{order.recipient}</td>
                <td>
                  <div>
                    <img
                      src={order.avatar && order.avatar}
                      alt={order.avatar && order.deliveryman}
                    />
                    {order.deliveryman}
                  </div>
                </td>
                <td>{order.city}</td>
                <td>{order.state}</td>
                <td>
                  <Status
                    color={order.colorStatus.color}
                    background={order.colorStatus.background}
                  >
                    <StatusBall color={order.colorStatus.color} />
                    {order.status.toUpperCase()}
                  </Status>
                </td>
                <td>
                  <Actions
                    id={order.id}
                    loadPage={loadPage}
                    color={order.colorStatus.color}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </ListTable>
      )}

      <Paginations>
        <Pagination
          itensPerPage={ordersPerPage}
          totalItens={orders.length}
          paginate={paginate}
        />
      </Paginations>
    </Container>
  )
}
