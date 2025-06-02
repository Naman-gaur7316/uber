# API Documentation

## User Signup

### Endpoint
`POST /api/v1/user/signup`

### Description
This endpoint allows a new user to sign up by providing their first name, last name, email, and password. Upon successful signup, a JSON Web Token (JWT) and user details are returned.

### Request Body
The request body should be a JSON object containing the following fields:

- `firstname` (string, required): The first name of the user. Must be at least 4 characters long.
- `lastname` (string, optional): The last name of the user. Must be at least 4 characters long if provided.
- `email` (string, required): The email address of the user. Must be unique.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null
  }
}
```

#### Error Responses

- `400 Bad Request`
  - Email already exists
  ```json
  {
    "error": "Email already exists"
  }
  ```
  - Validation errors
  ```json
  {
    "errors": {
      "field_name": {
        "_errors": ["Error message here"]
      }
    }
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:3000/api/v1/user/signup \
-H "Content-Type: application/json" \
-d '{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## User Login

### Endpoint
`POST /api/v1/user/login`

### Description
This endpoint allows an existing user to log in by providing their email and password. Upon successful login, a JSON Web Token (JWT) and user details are returned.

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null
  }
}
```

#### Error Responses

- `401 Unauthorized`
  - Invalid email or password
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:3000/api/v1/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## User Profile

### Endpoint
`GET /api/v1/user/profile`

### Description
This endpoint allows an authenticated user to retrieve their profile information.

### Request Headers
The request must include a valid JWT token in the `Authorization` header.

- `Authorization: Bearer JWT_TOKEN_HERE`

### Response

#### Success (200 OK)
```json
{
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null
  }
}
```

#### Error Responses

- `401 Unauthorized`
  - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X GET http://localhost:3000/api/v1/user/profile \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

## User Logout

### Endpoint
`GET /api/v1/user/logout`

### Description
This endpoint allows an authenticated user to log out by invalidating their JWT token.

### Request Headers
The request must include a valid JWT token in the `Authorization` header.

- `Authorization: Bearer JWT_TOKEN_HERE`

### Response

#### Success (200 OK)
```json
{
  "message": "Logout Successful"
}
```

#### Error Responses

- `401 Unauthorized`
  - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X GET http://localhost:3000/api/v1/user/logout \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

## Captain Signup

### Endpoint
`POST /api/v1/captain/signup`

### Description
This endpoint allows a new captain to sign up by providing their first name, last name, email, password, and vehicle details. Upon successful signup, a JSON Web Token (JWT) and captain details are returned.

### Request Body
The request body should be a JSON object containing the following fields:

- `firstname` (string, required): The first name of the captain. Must be at least 4 characters long.
- `lastname` (string, optional): The last name of the captain. Must be at least 4 characters long if provided.
- `email` (string, required): The email address of the captain. Must be unique.
- `password` (string, required): The password for the captain account. Must be at least 6 characters long.
- `vehicleColor` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehiclePlate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicleCapacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicleType` (string, required): The type of the vehicle. Must be one of `car`, `motorcycle`, or `auto`.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "VEHICLE_COLOR_HERE",
      "plate": "VEHICLE_PLATE_HERE",
      "capacity": "VEHICLE_CAPACITY_HERE",
      "vehicleType": "VEHICLE_TYPE_HERE"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### Error Responses

- `400 Bad Request`
  - Email already exists
  ```json
  {
    "error": "Email already exists"
  }
  ```
  - Validation errors
  ```json
  {
    "errors": {
      "field_name": {
        "_errors": ["Error message here"]
      }
    }
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:3000/api/v1/captain/signup \
-H "Content-Type: application/json" \
-d '{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicleColor": "Red",
  "vehiclePlate": "ABC123",
  "vehicleCapacity": 4,
  "vehicleType": "car"
}'
```

## Captain Login

### Endpoint
`POST /api/v1/captain/login`

### Description
This endpoint allows an existing captain to log in by providing their email and password. Upon successful login, a JSON Web Token (JWT) and captain details are returned.

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the captain.
- `password` (string, required): The password for the captain account.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "VEHICLE_COLOR_HERE",
      "plate": "VEHICLE_PLATE_HERE",
      "capacity": VEHICLE_CAPACITY_HERE,
      "vehicleType": "VEHICLE_TYPE_HERE"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### Error Responses

- `401 Unauthorized`
  - Invalid email or password
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:3000/api/v1/captain/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## Captain Profile

### Endpoint
`GET /api/v1/captain/profile`

### Description
This endpoint allows an authenticated captain to retrieve their profile information.

### Request Headers
The request must include a valid JWT token in the `Authorization` header.

- `Authorization: Bearer JWT_TOKEN_HERE`

### Response

#### Success (200 OK)
```json
{
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstname": "FIRST_NAME_HERE",
      "lastname": "LAST_NAME_HERE"
    },
    "email": "EMAIL_HERE",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "VEHICLE_COLOR_HERE",
      "plate": "VEHICLE_PLATE_HERE",
      "capacity": VEHICLE_CAPACITY_HERE,
      "vehicleType": "VEHICLE_TYPE_HERE"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### Error Responses

- `401 Unauthorized`
  - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X GET http://localhost:3000/api/v1/captain/profile \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

## Captain Logout

### Endpoint
`GET /api/v1/captain/logout`

### Description
This endpoint allows an authenticated captain to log out by invalidating their JWT token.

### Request Headers
The request must include a valid JWT token in the `Authorization` header.

- `Authorization: Bearer JWT_TOKEN_HERE`

### Response

#### Success (200 OK)
```json
{
  "message": "Logout Successful"
}
```

#### Error Responses

- `401 Unauthorized`
  - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Example Request
```bash
curl -X GET http://localhost:3000/api/v1/captain/logout \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```
