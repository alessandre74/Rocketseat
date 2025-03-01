import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MdMoreHoriz, MdModeEdit, MdDelete } from 'react-icons/md'

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
  ModalContent,
} from './styles'

Modal.setAppElement('#root')

const Actions = ({ idDelivery, description }) => {
  const [modalIsOpen, setModalIsOpen] = useState({
    open: false,
    visible: true,
  })

  async function handleView() {
    setModalIsOpen({ open: true, visible: true })
  }

  async function HandleConfirm() {
    try {
      await api.delete(`delivery/${idDelivery}/cancel-delivery/`)
      msg.box('Cancelado com sucesso', 'success')
    } catch (error) {
      msg.box('Erro ao cancelar!', 'error')
    }
  }

  async function HandleCancel() {
    const response = await api.get(`/orders/${idDelivery}`)

    const { data } = response

    if (!data) {
      msg.box('Encomenda não encontrada!', 'warning')
      return
    }

    if (data.canceled_at !== null) {
      msg.box('Encomenda ja foi cancelada!', 'warning')
      return
    }

    msg.boxConfirm(HandleConfirm, 'Confirma cancelamento ?')
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
              <MdModeEdit size={15} color="#4D85EE" />
              Visualizar
            </button>
          </Option>
          <Option>
            <button type="button" onClick={HandleCancel}>
              <MdDelete size={15} color="#DE3B3B" />
              Cancelar encomenda
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
          <ModalContent>
            <strong>VISUALIZAR PROBLEMA</strong>
            <p>{description}</p>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default Actions
Actions.propTypes = {
  idDelivery: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
