# Getting started


# .env SETUP

```yml 
### DATABASE_URL
 - postgres://user:password@host:port/database_name

### PORT=port number
 - Default 5000

### BCRYPT=salts
 - Number of salts, e.g. 10

### JWT_KEY=key
 - Your super secret key

### JWT_EXPIRATION=expiration time
 - Number in miliseconds
```
#
# Run
```yml 
 - npm install
 - npm run migrate
 - npm run dev
 ```

#
# ROUTES

## Authentication

```yml 
POST /sign-up
    - Route to sign-up 
    - body: {
        "email": "lorem@gmail.com",
        "firstName": "loremipsum",
        "lastName": "loremipsum",
        "password": "loremipsum"
      }
```

```yml 
POST /sign-in
    - Route to login
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum"
      }
    - response: {
        "token": "loremipsum",
      }
```

## Users

```yml 
GET /users
    - Route to get all users 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 0,
          "email": "lorem@gmail.com",
          "firstName": "loremipsum",
          "lastName": "loremipsum"
        }
      ]
```

```yml 
GET /users/:id
    - Route to get a user by ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 0,
        "email": "lorem@gmail.com",
        "firstName": "loremipsum",
        "lastName": "loremipsum"
      }
```

## Expenses

```yml 
POST /expenses
    - Route to get all expenses 
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "description": "loremipsum",
        "type": "lorem"
      }
    - response: {}
```

```yml 
GET /expenses
    - Route to get all expenses 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 0,
          "description": "loremipsum",
          "type": "lorem"
        }
      ]
```

```yml 
GET /expenses/:id
    - Route to get a expense by ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 0,
        "description": "loremipsum",
        "type": "lorem"
      }
```