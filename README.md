# E-commerce backend

![badge](https://img.shields.io/badge/license-isc-blue)

## [Description](#table-of-contents)

A MySQL database and application backend for an e-commerce site, where users are able to interact and manipulate data: they can create, update, delete or view desired products, tags and categories. Powered with MySQL2, Express, Sequelize and Dotenv.

![Demo](./images/SS%20DEMO.png)

## [Demo Video](./images/E-commerce%20Backend%20Demo.webm)
[Link to video](https://drive.google.com/file/d/1Ugx_dwyFLo2oPddwA3K-xrsiCfVOeaiy/view) 

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Technologies](#technologies)
* [Questions](#questions)



## [Installation](#table-of-contents)

Clone this repository on your local machine:

```sh
$ git clone https://github.com/lukecp5/e-commerce-backend.git
$ cd e-commerce-backend
```

To install and set up the application, run:
```sh
$ npm install employee-tracker
```

You will also need to place a .env file in the root directory of the project, in order to connect to your MySQL database.

file: .env
```
DB_NAME = employee_db
DB_PASSWORD = 'Your MySQL Password'
DB_USER = 'root'
```

---


## [Usage](#table-of-contents)

After installation is complete and .env file created in root directory, complete the following steps:
1. Create a MySQL database on your local machine using the *schema.sql* file located in the /db/ directory (From the MySQL CLI, write 'SOURCE db/schema.sql;')
2. Seed the database with sample data to be used for testing purposes(Run *npm run seed* from inside the root directory of the project)

Now you're ready to start the application! You can start the server by running: 
```
npm start
```

---

## [License](#table-of-contents)
The application is covered under the following license:
[ISC](https://choosealicense.com/licenses/isc)


## [Contributing](#table-of-contents)

For the moment this project does not accept contributions from third parties. Thank you for your interest.

## [Technologies](#table-of-contents)

This application was built with: 
* Node.js
* Sequelize
* Express.js
* MySQL2
* Dotenv

## [Questions](#table-of-contents)

Please feel free to contact me using the following links:
* [GitHub: jcuetos97](https://github.com/jcuetos97)
* [Email: jcuetos97@gmail.com](mailto:jcuetos97@gmail.com)
* [LinkedIn: jcuetos97](https://www.linkedin.com/in/jcuetos97/)
* [Website: jcuetos97](https://jcuetos97.github.io/Web-Developer-Portfolio/)
  
 
