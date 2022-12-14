const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); 


const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Turn on connection to database and server
sequelize.sync({ force:false }).then(()=>{
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
})



