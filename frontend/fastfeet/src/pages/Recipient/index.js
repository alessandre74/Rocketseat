import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import Actions from '~/pages/Recipient/Actions'
import Pagination from '~/components/Pagination'

import api from '~/services/api'

import { Container } from '~/styles/container'
import { Search, ListTable, NotFound, Paginations } from './styles'

export default function Recipients() {
  const [recipients, setRecipients] = useState([])
  const [search, setSearch] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [recipientsPerPage] = useState(10)

  const LastRecipients = currentPage * recipientsPerPage
  const FirstRecipients = LastRecipients - recipientsPerPage
  const currentRecipients = recipients.slice(FirstRecipients, LastRecipients)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const loadPage = id =>
    setRecipients(recipients.filter(recipient => recipient.id !== +id))

  useEffect(() => {
    if (currentPage !== 1) return
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          s: search,
        },
      })

      const data = response.data.map(recipient => ({
        id: String(recipient.id),
        name: recipient.name,
        address: `${recipient.street}, ${recipient.number} - ${recipient.state}`,
        email: recipient.email,
      }))

      setRecipients(data)
    }

    loadRecipients()
  }, [currentPage, search])

  return (
    <Container>
      <h1>Gerenciando destinatários</h1>
      <Search>
        <input
          name="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por destinatários"
        />

        <Link to="/form/recipient" type="button">
          <MdAdd size={25} color="#fff" />
          <span>CADASTRAR</span>
        </Link>
      </Search>

      {!currentRecipients.length && search.length ? (
        <NotFound>Não há dados!</NotFound>
      ) : (
        <ListTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipients.map(recipient => (
              <tr key={recipient.id}>
                <td>#{recipient.id.padStart(2, '0')}</td>
                <td>{recipient.name}</td>
                <td>{recipient.address}</td>
                <td>
                  <Actions id={recipient.id} loadPage={loadPage} />
                </td>
              </tr>
            ))}
          </tbody>
        </ListTable>
      )}

      <Paginations>
        <Pagination
          itensPerPage={recipientsPerPage}
          totalItens={recipients.length}
          paginate={paginate}
        />
      </Paginations>
    </Container>
  )
}
