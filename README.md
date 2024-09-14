# ⏲️ Beavuck Time

## 📊 Status

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=beavuck-services_time)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=bugs)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=beavuck-services_time&metric=coverage)](https://sonarcloud.io/summary/new_code?id=beavuck-services_time)

---

## 💡 Why

You can't count on client devices to all be set up with the correct date and time.

But keeping track of time is usually busywork, not the business of your core APIs. And you probably don't want to flood
your own APIs, whenever you want to get an accurate timestamp for entities in your apps.

So you can set up this simple microservice, whose only job should be to answer the question: "what time is it right
now?"

---

## 🎯 What

Get the current time in ISO format, in UTC timezone.

This lightweight service focuses on one job.

It needs no persistence layer, is capable of handling multiple concurrent requests, and is protected by a simple
CORS config for security and performance reasons.

Dockerized for easy deployment and scaling.

---

## 🔍 Where

The code lives on [GitLab](https://gitlab.com/beavuck-services/time),
and the Docker image is hosted on [Docker Hub](https://hub.docker.com/r/beavuck/time)

### 🦊 GitLab

You can find the code on GitLab, where, once you have read the [CONTRIBUTING.md](CONTRIBUTING.md) file, you can also
create issues and merge requests.

Feel free to fork the repo and make your own changes at will, as per the [UNLICENSE](UNLICENSE).

### 🐳 Docker Hub

Most devs will only use Docker Hub for their purposes with this project, to use it as is as a dependency for their own
projects. On Docker Hub, while you're developing, you should use the `beavuck/time:latest` tag to always get the latest
version.

When the time comes to go to production, to protect yourself from surprise breaking changes, you should instead point to
specific minor version tags, such as `beavuck/time:2.0` : those will not get breaking changes, but they will get
security updates and bugfixes while they're active.

---

## ⚙️ Usage

### 🪧 Set up (docker-compose example)

To run the service in a docker-compose environment, add this in your `docker-compose.yml`'s services section:

```yaml
time:
  image: beavuck/time:latest
  ports:
    - 'SOME_PORT_NUMBER:3000'
    # HOST_PORT:CONTAINER_PORT (Since we are in a container, CONTAINER_PORT corresponds to the API_PORT variable below)
  environment:
    - HOST_URL: https://time-api.example.com
    # HOST_URL: That API's URL. Essential for CORS config.
    - TRUSTED_ORIGINS: https://my.app.com,https://my-other.app.com
    # TRUSTED_ORIGINS: To allow requests from any origin, include * (not recommended). If empty, will only allow requests from the HOST_URL's origin. Defaults to the HOST_URL's origin
    - API_PORT: 3000
    # API_PORT: Optional. Internal port when in a container. Defaults to 3000
    - RATE_LIMIT: 100
    # RATE_LIMIT: Optional. Max allowed number of requests per minute for each IP address. If negative or 0, no limit. Defaults to no limit
    - LOG_LEVEL: info
    # LOG_LEVEL: Optional. Logging levels include error, warn, info, http, verbose, debug, silly. Defaults to info
    - MAX_LOG_FILES: 7d
    # MAX_LOG_FILES: Optional. Maximum number of logs to keep. This can be a number of files or number of days. If using days, add 'd' as the suffix. Default is 7d
    - MAX_SIZE_LOG_FILES: 1m
    # MAX_SIZE_LOG_FILES: Maximum size of the file after which it will rotate. This can be a number of bytes, or units of kb, mb, and gb. If using the units, add 'k', 'm', or 'g' as the suffix. The units need to directly follow the number. Default is null
```

Here's the simple docker compose file I used to test this service locally:

```yaml
services:
  time:
    image: beavuck/time:latest
    ports:
      - '3000:3000'
    environment:
      HOST_URL: http://127.0.0.1:3000
      TRUSTED_ORIGINS: http://127.0.0.1:8000,http://localhost:8000
      LOG_LEVEL: debug
```

When you're ready, just run your services with:

```shell
docker compose up -d
```

### ✨ Using the service

Now, when you run:

```shell
curl --location 'http://localhost:{{SOME_PORT_NUMBER}}/now' \
--header 'Origin: {{SOME_TRUSTED_ORIGIN}}'
```

you should expect an answer such as:

```json
{
  "now": "2024-06-15T12:35:48.022Z"
}
```

---

## 🛡️ CORS

This service is protected by a CORS policy, which you can configure by setting the `TRUSTED_ORIGINS` environment
variable.

When you use the API, keep in mind what roles these headers play:

| `"Origin:"`                                  | `"Referer:"`                   | Result |
| -------------------------------------------- | ------------------------------ | ------ |
| Defined and API `TRUSTED_ORIGINS` set to `*` | Whatever                       | ✅     |
| Trusted                                      | Whatever                       | ✅     |
| Same as this API's host                      | Whatever                       | ✅     |
| Not defined                                  | Same as this API's host        | ✅     |
| Defined and not trusted                      | Whatever                       | 🛑     |
| Not defined                                  | Not defined                    | 🛑     |
| Not defined or not trusted                   | Different from this API's host | 🛑     |

---

## 📜 License

Have at it.

This project uses the Unlicense. See the [UNLICENSE](UNLICENSE) file for details.
