'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('LicenseTerms', 'license_terms');

    // Rename columns
    await queryInterface.renameColumn('license_terms', 'licenseType', 'license_type');
    await queryInterface.renameColumn('license_terms', 'licenseTerms', 'license_terms');
    await queryInterface.renameColumn('license_terms', 'copyrightNotice', 'copyright_notice');
    await queryInterface.renameColumn('license_terms', 'createdAt', 'created_at');
    await queryInterface.renameColumn('license_terms', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('license_terms', 'license_type', 'licenseType');
    await queryInterface.renameColumn('license_terms', 'license_terms', 'licenseTerms');
    await queryInterface.renameColumn('license_terms', 'copyright_notice', 'copyrightNotice');
    await queryInterface.renameColumn('license_terms', 'created_at', 'createdAt');
    await queryInterface.renameColumn('license_terms', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('license_terms', 'LicenseTerms');
  }
};