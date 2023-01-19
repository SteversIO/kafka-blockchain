# Kafka + Blockchain 
This project is a proof-of-concept (POC) to demonstrate how to use Kafka, blockchain and Kafka connectors 
to stream blockchain data (blocks, transactions, and events) into Kafka.


### Quick Start
1. Ran Confluent's docker-compose (just `docker-compose.yml` now).  The other one is a barebones one, with suffix `-basic.yml`.
```
# Start all services
docker compose up -d

# Verify services are all running
docker compose ps
```

## Tinkering with Kafka
### Creating a topic
Following examples from [here](https://developer.confluent.io/get-started/nodejs/#build-producer)

2. I used Confluent's Control Center UI to create a topic called `test`. Then you can run the quickstart producer and consumer scripts.
2. Then ran `npm run start:producer` in one terminal
3. Run `npm run start:consumer` in another terminal


To bring everything down:
```
docker compose down
```

## Running the Kafka Web3 Connector
Copy all scripts to `broker` service (Kafka container)
```
docker cp kafka-web3-connector/kafka-web3-connector-0.2.jar broker:/usr/share/java && \
docker cp kafka-web3-connector/connect.standalone.config.properties broker:/tmp && \
docker cp kafka-web3-connector/ganache.config.properties broker:/tmp
```

Connect to the container & run the Kafka web3 connector
```
docker exec -it broker bash

> whereis connect-standalone
> /usr/bin/connect-standalone /tmp/connect.standalone.config.properties /tmp/ganache.config.properties
```