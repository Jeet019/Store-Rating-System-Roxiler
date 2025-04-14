const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        database: 'store_rating_db',

    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Unable to connect to database: ", error.message);       
    }
})();

module.exports = sequelize;