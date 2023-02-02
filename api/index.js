const server = require('./build/app.js');
const { conn } = require('./build/db.js');

const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at', PORT); 
  });
});