const bcrypt = require('bcryptjs')

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Distribuidora FasFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          administrator: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: () => {},
}
