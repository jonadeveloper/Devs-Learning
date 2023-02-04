require('dotenv').config({ path: __dirname+'/.env' });
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/devslearning`, {
    logging: false,
    native: false,
});
const basename = path.basename(__filename);



const modelDefiners: any[] = [];


fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file: any) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file: any) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Course, Category } = sequelize.models;

Course.belongsToMany(Category, { through: "CourseCategory" })
Category.belongsToMany(Course, { through: "CourseCategory" })


module.exports = {
    ...sequelize.models,
    conn: sequelize,
};