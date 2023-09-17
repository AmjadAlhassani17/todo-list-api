'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Todos', 'updatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Todos', 'deletedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Todos', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    // Remove the columns if you need a down migration
    await queryInterface.removeColumn('Todos', 'createdBy');
    await queryInterface.removeColumn('Todos', 'updatedBy');
    await queryInterface.removeColumn('Todos', 'deletedBy');
    await queryInterface.removeColumn('Todos', 'deletedAt');
  },
};
