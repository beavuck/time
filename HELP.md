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

### Writing tests

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
./cover_agent.sh -s path/from/repo/root/to/testFile.ts
```
