# insurance-policies
Project in NodeJS created using express and axios. Also other libraries added are 'morgan' to show the request status by console, and 'nodemon' to autorun the server when it change. The server run on port 3000.

## Instructions
To run the server execute:
```
npm start
```

To run the eslint execute:
```
npm run lint
```

# API
## Basic
Welcome page
```
GET /
```

All the users
```
GET /users
```

All the policies
```
GET /policies
```

## The task
Get user data filtered by user id (with all your policies).
```
GET /users/id:id
```

Get user data filtered by user name (with all your policies). The name has to be exact, match case inclusive.
```
GET /users/name:name
```

Get the list of policies linked to a user name. The name has to be exact, match case inclusive.
```
GET /policies/name:name
```

Get the user linked to a policy number.
```
GET /policies/id:id
```

# Note
This API does not use authentication
