'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Rename the columns
    await queryInterface.renameColumn('Todos', 'isCompleted', 'is_Completed');
    await queryInterface.renameColumn('Todos', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Todos', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('Todos', 'deletedAt', 'deleted_at');
    await queryInterface.renameColumn('Todos', 'createdBy', 'created_by');
    await queryInterface.renameColumn('Todos', 'updatedBy', 'updated_by');
    await queryInterface.renameColumn('Todos', 'deletedBy', 'deleted_by');
  },

  down: async (queryInterface) => {
    // Reverse the column renaming
    await queryInterface.renameColumn('Todos', 'isCompleted', 'is_Completed');
    await queryInterface.renameColumn('Todos', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Todos', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('Todos', 'deleted_at', 'deletedAt');
    await queryInterface.renameColumn('Todos', 'created_by', 'createdBy');
    await queryInterface.renameColumn('Todos', 'updated_by', 'updatedBy');
    await queryInterface.renameColumn('Todos', 'deleted_by', 'deletedBy');
  },
};
