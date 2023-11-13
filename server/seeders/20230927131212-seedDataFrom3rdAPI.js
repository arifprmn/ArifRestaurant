"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios({
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cookin&category[0]=chocolate&health[0]=alcohol-free",
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3e485ed6d0msh9ca2e6ba4440083p1e8addjsn8750d17cd8ba",
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    });
    // console.log(response.data.hints);
    let food = response.data.hints;
    let foods = food.map((el) => {
      return {
        name: el.food.label,
        price: 10000,
        description: "enak",
        imageUrl: el.food.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    console.log(foods);
    await queryInterface.bulkInsert("Food", foods, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
