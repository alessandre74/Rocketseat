import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '../pages/SignIn'

import Deliveryman from '~/pages/Deliveryman'
import Order from '~/pages/Order'
import Problem from '~/pages/Problem'
import Recipient from '~/pages/Recipient'
import OrderForm from '~/pages/Order/Form'
import DeliverymanForm from '~/pages/Deliveryman/Form'
import RecipientForm from '~/pages/Recipient/Form'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" component={Order} isPrivate />
      <Route path="/form/order/:id" component={OrderForm} isPrivate />
      <Route path="/form/order" component={OrderForm} isPrivate />

      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route
        path="/form/deliveryman/:id"
        component={DeliverymanForm}
        isPrivate
      />
      <Route path="/form/deliveryman" component={DeliverymanForm} isPrivate />

      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/form/recipient/:id" component={RecipientForm} isPrivate />
      <Route path="/form/recipient" component={RecipientForm} isPrivate />

      <Route path="/problem" component={Problem} isPrivate />

      <Route path="/" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  )
}
