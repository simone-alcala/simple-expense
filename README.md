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
        "name": "lorem"
      }
```

## Users

```yml 
GET /users
    - Route to get all users (only ADMIN)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 0,
          "email": "lorem@gmail.com",
          "firstName": "loremipsum",
          "lastName": "loremipsum",
          "type": "ADMIN" or "APPROVER" or "USER"
        }
      ]
```

```yml 
GET /users/:id
    - Route to get a user by ID (only ADMIN)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 0,
        "email": "lorem@gmail.com",
        "firstName": "loremipsum",
        "lastName": "loremipsum",
        "type": "ADMIN" or "APPROVER" or "USER"
      }
```

```yml 
PATCH /users/:id
    - Route to get a user by ID (only ADMIN)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "type": "ADMIN" or "APPROVER" or "USER"
      }
    - response: { }
```

```yml 
POST /token
    - Route to validate token
    - headers: { }
    - body: {
        "token": "lorem"
      }
    - response: { }
```

## Expenses

```yml 
POST /expenses
    - Route to add a new expense (only ADMIN)
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
    - Route to get all requests of the logged in user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 1,
          "description": "lorem",
          "createdDate": "DD/MM/YYYY",
          "status": "lorem",
          "amount": "0",
          "approverComment": "lorem",
          "requesterId": 0
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
          "approverComment": "lorem",
          "status": "lorem",
          "amount": "0",
          "requesterId": 0,
          "requestItems": [
          {
            "id": 1,
            "date": "YYYY-MM-DD",
            "amount": "00.00",
            "observation": "lorem",
            "receipt": "base64"
          }],
          "approvals": [
          {
            "id": 0,
            "requestId": 0,
            "approverId": 0,
            "createdDate": "YYYY-MM-DD",
            "comment": "lorem",
            "status": "lorem"
          }],
        }
      ]
```

```yml 
GET /requests/status/:status
    - Route to get all expenses by a status (only user APPROVER)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 1,
          "description": "lorem",
          "createdDate": "DD/MM/YYYY",
          "status": "lorem",
          "amount": "0",
          "requesterId": 0,
          "requesterName": "lorem",
          "requestItems": [
          {
            "id": 1,
            "date": "DD/MM/YYYY",
            "amount": "00.00",
            "observation": "",
            "receipt": ""
          }],
        }
      ]
```

```yml 
GET /requests/:id
    - Route to get a request by ID (only logged in user)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
        "id": 1,
        "description": "lorem",
        "createdDate": "YYYY-MM-DD",
        "status": "lorem",
        "amount": "0",
        "requesterId": 0,
        "approverComment": "lorem",
        "requestItems": [
          {
            "id": 0,
            "requestId": 0,
            "expenseId": 0,
            "date": "YYYY-MM-DD",
            "observation": "lorem",
            "amount": 00.00,
            "receipt": ""
    	  }
        ],
        "approvals": [
          {
            "id": 0,
            "requestId": 0,
            "approverId": 0,
            "createdDate": "YYYY-MM-DD",
            "comment": "lorem",
            "status": "lorem"
          }
        ]
      }
```

```yml 
PATCH /requests/:id
    - Route to update status by ID (only logged in user)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "status": "lorem"
      }
    - response: {}
```

## RequestItems

```yml 
POST /request-items/:id
    - Route to add a new request item by request ID (only requester and request status must be OPEN)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "expenseId": 0,
        "amount": 00.00,
        "date": "YYYY-MM-DD"
        "observation"?: "lorem"
        "receipt"?: "lorem"
      }
    - response: {
        "requestItemId": 0
      }
```

```yml 
GET /request-items/item/:id
    - Route to get a request item by item ID (only requester)
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
        "request": {
        "id": 2,
	  "description": "lorem",
	  "createdDate": "YYYY-MM-DD",
	  "status": "lorem",
	  "approverComment": "lorem",
	  "amount": 00.00,
	  "requesterId": 0
        }
      }

```

```yml 
GET /request-items/items/:id
    - Route to get all request items by request ID (only requester)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: [
        {
          "id": 0,
          "expenseId": 0,
          "date": "DD/MM/YYYY",
          "observation": "lorem",
          "amount": 00.00,
          "receipt": "lorem",
        }
      ]

```

```yml 
PUT /request-items/items/:requestId/:itemId
    - Route to update a request item by request ID and item ID (only requester and request status must be OPEN or REVIEW)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "expenseId"?: 0,
        "amount"?: 00.00,
        "date"?: "YYYY-MM-DD"
        "observation"?: "lorem"
        "receipt"?: "lorem"
      }
    - response: {
        "requestItemId": 0
      }

```

## Approvals

```yml 
POST /approvals/:requestId
    - Route to create a approval register by request ID (only usertype: APPROVER)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "comment": "lorem",
        "status": "APPROVED" or "REJECTED" or "REVIEW"
      }
    - response: {}
```
