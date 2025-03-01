import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MdMoreHoriz, MdModeEdit, MdDelete } from 'react-icons/md'

import msg from '~/utils/message'
import api from '~/services/api'

import { Container, Dots, ActionList, Options, Option } from './styles'

export default function Actions({ id, loadPage }) {
  async function handleDelete() {
    try {
      await api.delete(`/recipients/${id}`)
      loadPage(id)
      msg.box('Excluido com sucesso!', 'success')
    } catch (error) {
      msg.box('Erro ao excluir!', 'error')
    }
  }

  async function OrderFindRecipient() {
    const response = await api.get(`/orderfind/${id}/recipients`)
    if (response.data !== null) {
      return msg.box('Destinatário com encomenda cadastrada!', 'warning')
    }
    msg.boxConfirm(handleDelete)
  }

  return (
    <Container>
      <Dots>
        <MdMoreHoriz size={20} color="#C6C6C6" />
      </Dots>

      <ActionList>
        <Options>
          <Option>
            <Link to={`/form/recipient/${id}`}>
              <MdModeEdit size={15} color="#4D85EE" />
              Editar
            </Link>
          </Option>
          <Option>
            <button type="button" onClick={OrderFindRecipient}>
              <MdDelete size={15} color="#DE3B3B" />
              Excluir
            </button>
          </Option>
        </Options>
      </ActionList>
    </Container>
  )
}

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  loadPage: PropTypes.func.isRequired,
}
