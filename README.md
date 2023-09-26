# MVC The Blog

A blogging/forum app using node.js, express, handlebars, and mysql/sequelize.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Note: Heroku simply crashes at start-up, this app is presently only viewable via localhost.
[heroku link](https://the-blog-a70fd43fbaef.herokuapp.com/)

## Description 

This app is a forum style blogging app where authenticated users can log in and view forum topics written by all users. Users have access to a dashboard to create new blog posts and are able to view, create, update, and delete their own posts. All users are able to view and make comments on any post. 

This app is served through an Express/Mode.js server hosted on an eco-dino heroku server. The pages are served dynamically using handlebars templating and the MVC framework. The database was written with Sequelize and can be seeded with included seed files. 

Other technologies include express-session to track user login and expires after 24 hours. Dayjs was used for date management.

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

once packages are installed, open a terminal and type the following: 

  ```bash
  npm start
```

Open your browser to localhost:3001

## Demo

![demo](/public/images/home.png)
![demo1](/public/images/feed.png)
![demo2](/public/images/dashboard.png)



## Contributions
  I can't get this thing to run without crashing on Heroku, help in that matter would be greatly appreciated!

## Questions
  Please reach out to me if you have any questions about the functionality of the app or installation
  [GitHub](https://github.com/JaKrau/MVC-The-Blog)

## License

See LICENSE.txt for more information.
