# ⏲️ Beavuck Time

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

This lightweight service needs no persistence layer, is capable of handling multiple concurrent requests, and is
protected by an API key for security and performance reasons.

Made available as a Docker image, for easy deployment and scaling.

---

## ⚙️ Usage

### 🪧 Set up (docker-compose example)

To run the service in a docker-compose environment, add this in your `docker-compose.yml`'s services section:

```yaml
  time:
    image: beavuck/time:latest
    ports:
      - "YOUR_CHOSEN_PORT_NUMBER_HERE:3000"
      # HOST_PORT:CONTAINER_PORT (Container port is the API_PORT variable below, which defaults to 3000)
    environment:
      - API_KEY=swordfish # Choose a better key -- you'll use that key in the header of your requests to this service
      - API_PORT=3000 # Optional, defaults to 3000
```

Here's the simple docker compose file I used to test this service:

```yaml
services:
  time:
    image: beavuck/time:latest
    ports:
      - "3000:3000"
    environment:
      - API_KEY=swordfish
```

When you're ready, just run your services with:

```shell
docker compose up -d
```

### ✨ Using the service

Now, when you run:

```shell
curl --location 'http://localhost:{{YOUR_CHOSEN_PORT_NUMBER_HERE}}/now' \
--header 'time-api-key: {{API_KEY}}'
```

you should expect an answer such as:

```json
{
  "now": "2024-06-15T12:35:48.022Z"
}
```
