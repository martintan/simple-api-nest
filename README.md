# Simple CRUD API

This is a simple CRUD API built with NestJS and TypeScript.

---

## Prerequisites

Before you begin, make sure you have the following requirements installed on your machine:

- Docker
- Docker Compose

---

## Building the application

To build the application, you will need to build the Docker image.

First, navigate to the root directory of the project. Then, run the following command to build the Docker image:

```
docker compose build --no-cache
```

If there are any changes in the dependencies or in the Docker image / compose file, you may need to rebuild the Docker image with the --no-cache flag to ensure that the changes are applied:

```
docker compose build --no-cache
```

If this doesn't work, then you will need to delete the container & image then re-run the application.

---

## Running the application

To run the application in development mode, use the following command:

```
docker compose up dev mongodb
```

To run the application in production mode, use the following command:

```
docker compose up prod mongodb
```

---

## Stopping the application

To stop the application, use the CTRL + C keyboard combination.

To remove the containers and networks created by docker-compose up, use the following command:

```
docker compose down
```

## Run tests

To run unit tests, use the following command:

```
npm run test
```

---

## API Documentation

### Get all Cities

Retrieves a list of all cities in the database.

#### Request

```
GET /city/all
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "cities": [
    {
      "id": "5f5e945fe07f6929a42d3e42",
      "name": "San Francisco",
      "country": "US",
      "temperature": 288.71,
      "humidity": 53
    },
    {
      "id": "5f5e945fe07f6929a42d3e43",
      "name": "New York",
      "country": "US",
      "temperature": 291.48,
      "humidity": 61
    }
  ]
}
```

---

### Get a City by Name

Retrieves a city with the specified name.

#### Request

```
GET /city/name?name=San%20Francisco
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5f5e945fe07f6929a42d3e42",
  "name": "San Francisco",
  "country": "US",
  "temperature": 288.71,
  "humidity": 53
}
```

---

### Create a City

Creates a new city with the specified name. The country and weather data will be retrieved from the OpenWeatherMap API.

#### Request

```
POST /city
Content-Type: application/json

{
  "city": "Paris"
}
```

---

#### Response

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "5f5e945fe07f6929a42d3e44",
  "name": "Paris",
  "country": "France",
  "temperature": 292.15,
  "humidity": 63
}
```

#### Errors

- 500 Internal Server Error: An error occurred while trying to create the city.

#### Notes

- The city field is required.
- If a city with the same name already exists, it will be overwritten.

---

### Update a City

Updates the city with the specified ID.

#### Request

```
PUT /city/5f5e945fe07f6929a42d3e44
Content-Type: application/json

{
  "name": "Paris-renamed",
  "country": "France-renamed"
}
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "5f5e945fe07f6929a42d3e44",
  "name": "Paris-renamed",
  "country": "France-renamed",
  "temperature": 292.15,
  "humidity": 63
}
```

#### Errors

- 400 Bad Request: The city with the specified ID was not found.
- 500 Internal Server Error: An error occurred while trying to update the city.

#### Notes

- Only the fields included in the request body will be updated. Other fields will remain unchanged.

---

### Delete a City

Deletes the city with the specified ID.

#### Request

```
DELETE /city/5f5e945fe07f6929a42d3e44
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true
}
```

#### Errors

- 200 OK: The city with the specified ID was not found.
- 500 Internal Server Error: An error occurred while trying to delete the city.
