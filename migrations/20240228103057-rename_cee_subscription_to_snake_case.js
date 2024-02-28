'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('CeeSubscriptions', 'cee_subscription');

    // Rename columns
    await queryInterface.renameColumn('cee_subscription', 'ceeListingId', 'cee_listing_id');
    await queryInterface.renameColumn('cee_subscription', 'licenseType', 'license_type');
    await queryInterface.renameColumn('cee_subscription', 'licenseTerms', 'license_terms');
    await queryInterface.renameColumn('cee_subscription', 'copyrightNotice', 'copyright_notice');
    await queryInterface.renameColumn('cee_subscription', 'licenseStartDate', 'license_start_date');
    await queryInterface.renameColumn('cee_subscription', 'licenseEndDate', 'license_end_date');
    await queryInterface.renameColumn('cee_subscription', 'clientId', 'client_id');
    await queryInterface.renameColumn('cee_subscription', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_subscription', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('cee_subscription', 'cee_listing_id', 'ceeListingId');
    await queryInterface.renameColumn('cee_subscription', 'license_type', 'licenseType');
    await queryInterface.renameColumn('cee_subscription', 'license_terms', 'licenseTerms');
    await queryInterface.renameColumn('cee_subscription', 'copyright_notice', 'copyrightNotice');
    await queryInterface.renameColumn('cee_subscription', 'license_start_date', 'licenseStartDate');
    await queryInterface.renameColumn('cee_subscription', 'license_end_date', 'licenseEndDate');
    await queryInterface.renameColumn('cee_subscription', 'client_id', 'clientId');
    await queryInterface.renameColumn('cee_subscription', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_subscription', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('cee_subscription', 'CeeSubscriptions');
  }
};