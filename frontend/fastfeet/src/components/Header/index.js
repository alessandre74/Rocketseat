import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import logo from '~/assets/logo.png'

import { Container, Content, Profile } from './styles'

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.profile)

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <ul>
            <li>
              <Link to="/order">ENCOMENDAS</Link>
            </li>
            <li>
              <Link to="/deliveryman">ENTREGADORES</Link>
            </li>
            <li>
              <Link to="/recipient">DESTINATÁRIOS</Link>
            </li>
            <li>
              <Link to="/problem">PROBLEMAS</Link>
            </li>
          </ul>
        </nav>

        <Profile>
          <span>{user.name}</span>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  )
}
