const server = require('./build/app.js');
const { conn } = require('./build/db.js');
const { postCourses, postCategories } = require('./postInfo.js');
const dbCourses = require('./courses.json');
const dbCategories = require('./categories.json');

const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at', PORT);
    dbCategories.categories.map((category) => {
      return postCategories(category);
    });
    dbCourses.courses.map((course, index) => {
      return postCourses(course);
    });
  });
});

