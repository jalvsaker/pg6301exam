# PG6301 exam

[![Node.js CI](https://github.com/pg6301-fall2022/exam-jalvsaker/actions/workflows/node.js.yml/badge.svg)](https://github.com/pg6301-fall2022/exam-jalvsaker/actions/workflows/node.js.yml)

[Azure Deployment](http://pg6301exam-1038.azurewebsites.net/)
Can be slow to start after a period of inactivity.


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