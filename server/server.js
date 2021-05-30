const app = require('./app');

app.listen(process.env.PORT, () => {
  // Connect the app to the databse
  app.connect();
  console.log(`Ready, server running on ${process.env.PORT}`)
});
