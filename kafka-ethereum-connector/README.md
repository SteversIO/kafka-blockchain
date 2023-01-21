# Kafka Ethereum Connector
[Github Repo](https://github.com/internetsystemsgroup/kafka-ethereum-connector/issues/new)


## Setting up the connector
1. Identify target location to store the plugin (jar) by locating `CONNECT_PLUGIN_PATH` property in **docker-compose.yml** under `connect` service. 
We found `/usr/share/java` so we make sure that's where we copy the plugin (jar) to.
```
CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
```

*Note*:
(Many of the services have the kafka commands installed, and they all have the same location. We're actually going to be running the scripts from the `broker` service since that's the actual Kafka container)

2. Update `plugin.path` variable in `connect.standalone.config.properties`. This is a Kafka config property. It needs to include `/usr/share/java` and `/usr/share/java/plugins` because that's where we're going 
to be uploading all of our artifacts (jar files) from the Kafka Ethereum Connector build.

3. Upload the connector plugin, it's jar dependencies (in /plugins), and config files to the `broker` service.
```
docker cp kafka-ethereum-connector/kafka-ethereum-connector-1.0.jar broker:/usr/share/java && \
docker cp kafka-ethereum-connector/plugins broker:/usr/share/java && \
docker cp kafka-ethereum-connector/connect.standalone.config.properties broker:/tmp && \
docker cp kafka-ethereum-connector/ganache.config.properties broker:/tmp
```

### 3B. Verify files exist
```
docker exec -it broker bash
ls /tmp
ls /usr/share/java
ls /usr/share/java/plugins
```

## Running the connector!
```
docker exec -it broker bash
/bin/connect-standalone /tmp/connect.standalone.config.properties /tmp/ganache.config.properties
```

### Config Properties
Regarding `ganache.config.properties`:
- When using inside of a docker container, ensure that you use `host.docker.internal` for the hostname in **web3_rpc_url**.


## Building kafka-ethereum-connector from source
https://github.com/internetsystemsgroup/kafka-ethereum-connector

Build the project but skip the tests; they were failing locally; presumably because they require Infura or some other ??
```
mvn clean -DskipTests=true package
```