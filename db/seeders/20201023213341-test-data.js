'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [{
      parkName: "Roller Coaster Tycoon",
      city: "San Francisco",
      provinceState: "California",
      country: "U.S.A.",
      opened: new Date(),
      size: "100 sq. mi.",
      description: "The best theme park ever!",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Parks', null, {});
  }
};
