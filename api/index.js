const server = require("./build/app.js");
const { conn } = require("./build/db.js");
const { postCourses, postCategories, postAdmin } = require("./postInfo.js");
const dbCourses = require("./courses.json");
const dbCategories = require("./categories.json");
const dbAdmin = require("./admin.json");
const { DB_PORT } = process.env;
const PORT = DB_PORT || 5432;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at", PORT);
    dbCategories.categories.map((category) => {
      return postCategories(category);
    });
    dbCourses.courses.map((course, index) => {
      return postCourses(course);
    });
    dbAdmin.admin.map((user) => {
      return postAdmin(user);
    });
  });
});
