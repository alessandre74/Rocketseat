import React from 'react'

import StepIndicator from 'react-native-step-indicator'
import PropTypes from 'prop-types'

export default function OrderStatus({ position }) {
  const labels = ['Aguardando\nRetirada', 'Retirada', 'Entregue']

  const customStyles = {
    stepIndicatorSize: 9,
    currentStepIndicatorSize: 9,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#7D40E7',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#7D40E7',
    stepStrokeUnFinishedColor: '#7D40E7',
    separatorFinishedColor: '#7D40E7',
    separatorUnFinishedColor: '#7D40E7',
    stepIndicatorFinishedColor: '#7D40E7',
    stepIndicatorUnFinishedColor: '#fff',
    stepIndicatorCurrentColor: '#7D40E7',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#7D40E7',
    stepIndicatorLabelFinishedColor: '#7D40E7',
    stepIndicatorLabelUnFinishedColor: '#fff',
    labelColor: '#999',
    labelSize: 10,
    currentStepLabelColor: '#999',
  }

  return (
    <StepIndicator
      customStyles={customStyles}
      stepCount={3}
      currentPosition={position}
      labels={labels}
    />
  )
}

OrderStatus.propTypes = {
  position: PropTypes.number.isRequired,
}
