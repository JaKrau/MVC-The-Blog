# Tech Blog

A blogging/forum style app using node.js, express, handlebars, and mysql/sequelize.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[App Live Here](https://tech-blog-1willcobb-830bce22bbd8.herokuapp.com/)
(Hosted w/ heroku eco-dinos, alow a few seconds to spin up)

## Description 

This app is a forum style blogging app where authenticated users can log in and view forum topics written by all users. Users have access to a dashboard to create new blog posts and are able to view, create, update, and delete their own posts. All users are able to view and make comments on any post. 

This app is served through an Express/Mode.js server hosted on an eco-dino heroku server (if it loads slow the first time thats why). The pages are served dynamically using handlebars templating and MVC framework. Database was written with Sequelize and can be seeded with included seed files. 

Other technologies include express-session to track user login and expires after 24 hours. Dayjs was used for date management. In development eslint and prettier were used for cleaner code.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Questions](#questions)
- [License](#license)

## Installation

```bash
npm install
```

  For installing this application, you will need to run npm install

  You will need mysql setup on your dev device for local dev.

  mysql connections are hidden in a .env file with the following layout. Create and place your login information in this file:

  ```
    DB_NAME= "blog_db"
    DB_USER= ""
    DB_PASSWORD= ""
  ```

  you will also need to source your db with the seed files if you wish and seed it with seed.db

  ```
  npm run seeds
  ```

## Usage

once packages installed, open a terminal and type the following: 

  ```bash
  npm start
```

Open your browser to localhost:3001

## Demo

![demo](/public/images/tech_blog.gif)
![demo1](/public/images/demo_1.png)
![demo2](/public/images/demo_2.png)
![demo3](/public/images/demo_3.png)


## Contributions
  You are welcome to contribute! I look forward to hearing from you

## Questions
  Please reach out to me if you have any questions about the functionality of the app or installation
  [GitHub](https://github.com/1willcobb) |
  [Email](mailto:cobb.will@gmail.com)

## License
[MIT License](https://choosealicense.com/licenses/mit/)

  The license used for this application is MIT License which can be found at the [here](https://choosealicense.com/licenses/mit/)
