const app = require('./app');

app.listen(process.env.PORT, () => {
  app.connect();
  console.log(`Ready, server running on ${process.env.PORT}`)
});
