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
    - Route to add a new expense
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

## Requests

```yml 
POST /requests
    - Route to add a new request
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "description": "loremipsum",
      }
    - response: {
        "requestId": 0
      }
```

```yml 
GET /requests
    - Route to get all expenses 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 1,
          "description": "lorem",
          "createdDate": "YYYY-MM-DD",
          "status": "lorem",
          "amount": "0",
          "requesterId": 0,
          "requestItems": [],
          "approvals": []
        }
      ]
```

```yml 
GET /requests/user/:requesterId
    - Route to get all expenses of a user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 1,
          "description": "lorem",
          "createdDate": "YYYY-MM-DD",
          "status": "lorem",
          "amount": "0",
          "requesterId": 0,
          "requestItems": [],
          "approvals": []
        }
      ]
```

```yml 
GET /requests/status/:status
    - Route to get all expenses by a status
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 1,
          "description": "lorem",
          "createdDate": "YYYY-MM-DD",
          "status": "lorem",
          "amount": "0",
          "requesterId": 0,
          "requestItems": [],
          "approvals": []
        }
      ]
```

```yml 
GET /requests/:id
    - Route to get all expenses by ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 1,
        "description": "lorem",
        "createdDate": "YYYY-MM-DD",
        "status": "lorem",
        "amount": "0",
        "requesterId": 0,
        "requestItems": [],
        "approvals": []
      }
```

```yml 
PATCH /requests/:id
    - Route to update status
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "status": "lorem"
      }
    - response: {}
```

## RequestItems

```yml 
POST /request-items/:id
    - Route to add a new request item by request ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "expenseId": 0,
        "amount": 00.00,
        "date": "YYYY-MM-DD"
        "observation": "lorem" optional
        "receipt": "lorem" optional
      }
    - response: {
        "requestItemId": 0
      }
```

```yml 
GET /request-items/item/:id
    - Route to get a request item by ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 0,
        "requestId": 0,
        "expenseId": 0,
        "date": "YYYY-MM-DD",
        "observation": "lorem",
        "amount": 00.00,
        "receipt": "lorem",
      }

```

```yml 
GET /request-items/items/:id
    - Route to get all request items by request ID
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 0,
        "expenseId": 0,
        "date": "DD/MM/YYYY",
        "observation": "lorem",
        "amount": 00.00,
        "receipt": "lorem",
      }

```