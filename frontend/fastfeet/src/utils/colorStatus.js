function colorStatus(statusOrder) {
  const status = [
    { status: 'Entregue', color: '#2ca42b', background: '#dff0df' },
    { status: 'Retirada', color: '#4D85EE', background: '#BAD2FF' },
    { status: 'Pendente', color: '#C1BC35', background: '#F0F0DF' },
    { status: 'Cancelada', color: '#DE3B3B', background: '#FAB0B0' },
  ]

  return status.find(item => item.status === statusOrder)
}

export { colorStatus }
