const server = require('./src/app.tsx');
const { conn } = require('./src/db.tsx');

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});