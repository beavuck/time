# Beavuck Time

Get the current time in ISO format, in UTC timezone.

## Getting Started

To set up and run the project, run:

```shell
npm install
npm start
```

## Usage

To use this service, in local env, run:

```shell
curl --location 'http://localhost:3000/now' \
--header 'time-api-key: swordfish'
```

and you should expect an answer such as:

```json
{ "currentTime": "2024-06-14T18:25:46.835Z" }
```

## Deployment

To build the Docker image, run:

```shell
docker build -t beavuck-time:latest .
```
