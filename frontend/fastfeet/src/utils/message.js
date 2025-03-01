import Message from 'sweetalert2'

function box(message, icon) {
  Message.fire({
    heightAuto: false,
    backdrop: true,
    position: 'top-end',
    icon: `${icon}`,
    text: `${message}`,
    width: '26rem',
    showConfirmButton: false,
    timer: 2200,
  })
}

function boxConfirm(funcDelete, message = 'Confirma exclusão ?') {
  Message.fire({
    backdrop: true,
    title: `${message}`,
    icon: 'warning',
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    showCancelButton: true,
    confirmButtonColor: '#7d40e7',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then(result => {
    if (result.value) {
      funcDelete()
    }
  })
}

export default {
  box,
  boxConfirm,
}
