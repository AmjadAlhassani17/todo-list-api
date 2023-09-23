'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Todos', 'created_by', {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.changeColumn('Todos', 'updated_by', {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    // Revert changes if needed
    return queryInterface.dropTable('Todos');
  },
};
