# Kafka Web3 Connector

## Setup
1. Identify target location for jar file.
*target path can be found in environment variable section in docker-compose.yml 
```
CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
```

2. Upload the jar file to the `broker` service, in one of the target paths.
```\
docker cp kafka-web3-connector/kafka-web3-connector-0.2.jar connect:/usr/share/java && \
docker cp kafka-web3-connector/kafka-web3-connector-0.2.jar broker:/usr/share/java && \
docker cp kafka-web3-connector/connect.standalone.config.properties broker:/tmp && \
docker cp kafka-web3-connector/ganache.config.properties broker:/tmp

ls /tmp
ls /usr/share/java
```

2B. Test connector
```
docker exec -it broker bash
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