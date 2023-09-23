'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('users', 'createdAt', 'created_at');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    // Remove the columns if you need a down migration
    return queryInterface.dropTable('users');
  },
};
