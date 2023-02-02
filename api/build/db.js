"use strict";
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize();
module.exports = {
    conn: sequelize
};
