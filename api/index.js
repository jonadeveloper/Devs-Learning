const server = require('./build/app.js');
const { conn } = require('./build/db.js');
const { postInfo } = require('./postInfo.js');
const dbInfo = require('./db.json');

const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at', PORT);
    dbInfo.courses.map((course) => {
      return postInfo(course);
    });
  });
});

