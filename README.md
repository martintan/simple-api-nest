# Simple CRUD API

## Build the application

If there are any changes in the dependencies or in the Docker image / compose file, 
rebuild the Docker image with the following command:
```
docker compose build --no-cache
```

If this doesn't work, then you will need to delete the container & image then re-run the application.

## Run the application

Run the application in development
```
docker-compose up dev
```

Run the application in production
```
docker-compose up prod
```