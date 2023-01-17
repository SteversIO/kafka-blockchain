# Kafka + Blockchain 
This project is a proof-of-concept (POC) to demonstrate how to use Kafka, blockchain and Kafka connectors 
to stream blockchain data (blocks, transactions, and events) into Kafka.

## Tinkering with Kafka

### Creating a topic
Following examples from [here](https://developer.confluent.io/get-started/nodejs/#build-producer)


1. Ran Confluent's docker-compose (just `docker-compose.yml` now).  The other one is a basic one, with suffix `-basic.yml`.
```
# Start all services
docker compose up -d

# Verify services are all running
docker compose ps
```

2. I used Confluent's Control Center UI to create a topic called `test`. Then you can run the quickstart producer and consumer scripts.
2. Then ran `npm run start:producer` in one terminal
3. Run `npm run start:consumer` in another terminal


To bring everything down:
```
docker compose down
```