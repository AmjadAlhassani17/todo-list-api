'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Resources', 'file_name', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Resources', 'mim_type', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Resources', 'file_size', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('Resources');
  },
};
