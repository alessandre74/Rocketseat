import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import { MdMoreHoriz, MdVisibility, MdModeEdit, MdDelete } from 'react-icons/md'

import Modal from 'react-modal'
import modalStyles from '~/utils/modalStyles'
import msg from '~/utils/message'
import api from '~/services/api'

import {
  Container,
  Dots,
  ActionList,
  Options,
  Option,
  Information,
  Dates,
  Date,
  Signature,
  ModalContent,
  Status,
} from './styles'

Modal.setAppElement('#root')

const Actions = ({ id, loadPage, color }) => {
  const [ordersView, setOrdersView] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState({
    open: false,
    visible: true,
  })

  async function handleView() {
    const response = await api.get(`/orders/${id}`)

    const data = [
      {
        id: response.data.id,
        street: response.data.recipient.street,
        number: response.data.recipient.number,
        state: response.data.recipient.state,
        city: response.data.recipient.city,
        startDate: response.data.start_date
          ? format(parseISO(response.data.start_date), 'dd/MM/yyyy')
          : '__/__/____',
        endDate: response.data.end_date
          ? format(parseISO(response.data.end_date), 'dd/MM/yyyy')
          : '__/__/____',
        zipCode: response.data.zip_code,
        signature: response.data.signature && response.data.signature.url,
        status: response.data.status,
      },
    ]

    setOrdersView(data)
    setModalIsOpen({ open: true, visible: true })
  }

  async function handleDelete() {
    try {
      await api.delete(`/orders/${id}`)
      loadPage(id)
      msg.box('Excluido com sucesso!', 'success')
    } catch (error) {
      msg.box('Erro ao excluir!', 'error')
    }
  }

  return (
    <Container>
      <Dots>
        <MdMoreHoriz size={20} color="#C6C6C6" />
      </Dots>

      <ActionList>
        <Options>
          <Option>
            <button type="button" onClick={handleView}>
              <MdVisibility size={15} color="#8E5BE8" />
              Visualizar
            </button>
          </Option>
          <Option>
            <Link to={`/form/order/${id}`}>
              <MdModeEdit size={15} color="#4D85EE" />
              Editar
            </Link>
          </Option>
          <Option>
            <button type="button" onClick={() => msg.boxConfirm(handleDelete)}>
              <MdDelete size={15} color="#DE3B3B" />
              Excluir
            </button>
          </Option>
        </Options>
      </ActionList>

      {modalIsOpen.open && (
        <Modal
          isOpen={modalIsOpen.visible}
          onRequestClose={() => setModalIsOpen({ open: false, visible: false })}
          style={modalStyles}
        >
          {ordersView.map(order => (
            <ModalContent key={order.id}>
              <Information>
                <span>Informações da encomenda</span>
                <p>
                  {order.street}, {order.number}
                </p>
                <p>
                  {order.city} {order.state}
                </p>
                <p>{order.zipCode}</p>
              </Information>

              <Dates>
                <span>Datas</span>
                <Date>
                  <span>Retirada:</span>
                  <p>{order.startDate}</p>
                </Date>

                <Date>
                  <span>Entrega :</span>
                  <p>{order.endDate}</p>
                </Date>
              </Dates>

              <Signature>
                <span>Assinatura do destinatário</span>
                {order.signature ? (
                  <img src={order.signature} alt={order.signature} />
                ) : (
                  <Status color={color}>Encomenda {order.status}</Status>
                )}
              </Signature>
            </ModalContent>
          ))}
        </Modal>
      )}
    </Container>
  )
}

export default Actions

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  loadPage: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}
