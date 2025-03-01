function colorStatus(statusOrder) {
  const status = [
    { status: 'entregue', color: '#2ca42b', background: '#dff0df' },
    { status: 'retirada', color: '#4D85EE', background: '#BAD2FF' },
    { status: 'pendente', color: '#C1BC35', background: '#F0F0DF' },
    { status: 'cancelada', color: '#DE3B3B', background: '#FAB0B0' },
  ]

  return status.find(item => item.status === statusOrder)
}

export { colorStatus }
