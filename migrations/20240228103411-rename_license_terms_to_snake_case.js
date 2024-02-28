'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('LicenseTerms', 'license_term');

    // Rename columns
    await queryInterface.renameColumn('license_term', 'licenseType', 'license_type');
    await queryInterface.renameColumn('license_term', 'licenseTerms', 'license_terms');
    await queryInterface.renameColumn('license_term', 'copyrightNotice', 'copyright_notice');
    await queryInterface.renameColumn('license_term', 'createdAt', 'created_at');
    await queryInterface.renameColumn('license_term', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('license_term', 'license_type', 'licenseType');
    await queryInterface.renameColumn('license_term', 'license_terms', 'licenseTerms');
    await queryInterface.renameColumn('license_term', 'copyright_notice', 'copyrightNotice');
    await queryInterface.renameColumn('license_term', 'created_at', 'createdAt');
    await queryInterface.renameColumn('license_term', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('license_term', 'LicenseTerms');
  }
};