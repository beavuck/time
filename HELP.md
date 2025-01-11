# Beavuck Time

## Usage

### Set up (outside a container)

To use this service in local env (not in a container), start by preparing your .env:

```shell
cp .env.example .env
```

You can change environment variables to suit your needs, specifically depending on what URLs you run this API and your
other app(s) on.

Then, install the dependencies, and run the service with:

```shell
npm install
npm start
```

### Using the service

When you run:

```shell
curl --location 'http://localhost:9124/now' \
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

Writing tests can be made a little easier by calling the `./cover_agent.sh` script. You first need to install the
CLI tool locally, and to forge and export an OPENAI_API_KEY with some credit attached to it. In details:

```shell
pipx install git+https://github.com/Codium-ai/cover-agent.git
```

and add this to your `.bashrc` or `.zshrc` or equivalent, replacing `...` with your actual key:

```
export OPENAI_API_KEY=...
```

Then, you can run the script from this project's root:

```shell
./cover_agent.sh -s path/from/repo/root/to/file.under.test.ts
```

#### API client tests

Check out the `run-integration-tests` script in the `package.json` file. If you run the API then run the tests, you
should see the tests pass.

We write those tests using [Bruno](https://docs.usebruno.com/), because Postman is whack and bloaty and impossible to 
version cleanly within a repo.

Bruno is pretty neat -- it's made by devs for devs and it has a lot to offer right now, as well as a lot of promise.
