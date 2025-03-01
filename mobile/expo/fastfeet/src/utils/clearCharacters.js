function zipCode(value) {
  return value.replace('-', '')
}
function cpf(value) {
  return value
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
}

export default { zipCode, cpf }
