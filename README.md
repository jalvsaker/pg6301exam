# PG6301 exam

[![Node.js CI](https://github.com/pg6301-fall2022/exam-jalvsaker/actions/workflows/node.js.yml/badge.svg)](https://github.com/pg6301-fall2022/exam-jalvsaker/actions/workflows/node.js.yml)
[Git repo](https://github.com/pg6301-fall2022/exam-jalvsaker)

[Azure Deployment](http://pg6301exam-1038.azurewebsites.net/)
Can be slow to start after a period of inactivity.

For admin access use username `admin` and password `admin`

## Features: 
* Everyone can see the menu.
* Log in/ registering of users.
* Logged-in users can add orders to the cart and order for a set time.
* Logged-in users can use the chat (websocket)
* Admin-users can can use the admin panel:
  * Add to foods to the menu
  * Edit existing foods
  * Delete foods from the menu
  * See orders
* more than 80% test coverage (check GitHub action run)

## Endpoints:
* /api/login
  * GET - public - get your current user (from cookie)
  * POST - public - Login
  * DELETE - public - Log out - destroy cookie
* /api/login/new
  * POST - public - register and login to new user
* /api/foods
  * GET - public - get all foods on the menu
  * POST - admin only - add a new food to the menu
* /api/:id
  * PUT - admin only - change info about the food
  * DELETE - admin only - delete food
* /api/orders
  * GET - admin only - get list of all placed orders
  * POST - logged-in users only - place an order

## Run locally
  * Run `npm install`
  * create `.env` file in the `server` directory with the following structure: 
```
COOKIE_SECRET=
MONGODB_URL=
MONGODB_DATABASE=
```
* To run in development mode: `npm run dev`
* To run in production mode: `npm run build` and then `npm start`
* To run tests `npm test`
* To run tests with coverage `npm run verify`