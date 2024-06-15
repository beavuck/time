# Beavuck Time

## Analysis

Run a SonarQube analysis with:

```bash
./sonar_scan.sh
```

## Usage

### Set up (outside a container)

To use this service in local env (not in a container), start by preparing your .env:

```shell
cp .env.example .env
```

If you want to change the API Key from the current one (`swordfish`), do so in the `.env` file. More generally, you can
change environment variables to suit your needs.

Then, install the dependencies, and run the service with:

```shell
npm install
npm start
```

### Using the service

When you run:

```shell
curl --location 'http://localhost:{{YOUR_CHOSEN_PORT_NUMBER_HERE}}/now' \
--header 'time-api-key: {{API_KEY}}'
````

you should expect an answer such as:

```json
{
  "now": "2024-06-14T18:25:46.835Z"
}
```

## Deployment

To build, tag, and push the Docker image, use GitLab to create a tag from the `main` branch.

A pipeline will be created, which you can run manually when you're ready.

Or simply run:

```shell
docker login
```

Then
```shell
docker build -t beavuck-time:latest .
docker tag beavuck-time:latest beavuck/time:latest
docker push beavuck/time:latest
```
