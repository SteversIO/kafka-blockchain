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



## Setup Kafka Ethereum Connector (working one)
1. Identify target location to store the plugin (jar) by locating `CONNECT_PLUGIN_PATH` property in **docker-compose.yml** under `connect` service.
```
CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
```
We found `/usr/share/java` so we make sure that's where we copy the plugin (jar) to.

2. Update `plugin.path` variable in `connect.standalone.config.properties`. This is a Kafka config property. It needs to include `/usr/share/java` and `/usr/share/java/plugins` because that's where we're going 
to be uploading all of our artifacts (jar files) from the Kafka Ethereum Connector build.
3. Upload the plugin and config files to the `connect` service, in one of the target paths.
```
docker cp kafka-ethereum-connector/plugins broker:/usr/share/java && \
docker cp kafka-ethereum-connector/kafka-ethereum-connector-1.0.jar broker:/usr/share/java && \
docker cp kafka-ethereum-connector/connect.standalone.config.properties broker:/tmp && \
docker cp kafka-ethereum-connector/ganache.config.properties broker:/tmp
```
### Verify files exist now.
```
docker exec -it broker bash
ls /tmp
ls /usr/share/java
ls /usr/share/java/plugins
```
### Test connector
```
docker exec -it connect bash
/bin/connect-standalone /tmp/connect.standalone.config.properties /tmp/ganache.config.properties
```

3. Add config file (ganache.config.properties) using Confluent Control Center UI
Home -> Control Center -> Connect -> (click cluster) -> Upload connector config file (`ganache.config.properties`)

### Config Properties
Regarding `ganache.config.properties`:
- When using inside of a docker container, ensure that you use `host.docker.internal` for the hostname in **web3_rpc_url**.

Regarding `docker-compose.yml`:
- Ensure that you add `network_mode: "host"` to the **connect** service.
```
connect:
    image: cnfldemos/cp-server-connect-datagen:0.5.3-7.1.0
    hostname: connect
    network_mode: "host"
```














## Building kafka-ethereum-connector
https://github.com/internetsystemsgroup/kafka-ethereum-connector

Build the project but skip the tests; they were failing locally; presumably because they require Infura or some other ??
```
cd ./kafka-ethereum-connector-source
mvn -DskipTests=true  package
```