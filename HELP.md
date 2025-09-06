# Beavuck Time

## Usage

### Set up (outside a container)

Install the dependencies, and run the service with:

```shell
npm install
npm run go
```

### Managing environment variables

Test environment variables are encrypted. Check out https://dotenvx.com/docs/quickstart to manage them if needed

### Using the service

When you run:

```shell
curl --location 'http://localhost:3000/now' \
--header 'Origin: http://localhost:8477'
```

you should expect an answer such as:

```json
{
    "now": "2024-06-14T18:25:46.835Z"
}
```

### Testing

#### Node tests

To run the tests, you can use:

```shell
npm test
```

#### API client tests

Check out the `run-integration-tests` script in the `package.json` file. If you run the API then run the tests, you
should see the tests pass.

We write those tests using [Bruno](https://docs.usebruno.com/), because Postman is whack and bloaty and impossible to 
version cleanly within a repo.

Bruno is pretty neat -- it's made by devs for devs and it has a lot to offer right now, as well as a lot of promise.
