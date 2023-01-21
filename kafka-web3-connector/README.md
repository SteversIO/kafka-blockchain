# Kafka Web3 Connector
[Github repo for Kafka Web3 Connector](https://github.com/satran004/kafka-web3-connector). *thank you satran004 for your work!*

## Install custom Kafka connector
Upload the connector plugin, it's jar dependencies (in /plugins), and config files to the `broker` service.
```
docker cp kafka-web3-connector/kafka-web3-connector-0.2.jar broker:/usr/share/java && \
docker cp kafka-web3-connector/connect.standalone.config.properties broker:/tmp && \
docker cp kafka-web3-connector/ganache.config.properties broker:/tmp
```

## Running the custom Kafka connector
Log into container to run the connector. The connector will now stream blockchain blocks (and transactions) in realtime.
```
docker exec -it broker bash
/bin/connect-standalone /tmp/connect.standalone.config.properties /tmp/ganache.config.properties
```

&nbsp;
# Debugging & Troubleshooting
## Motivation
This section explains how I tracked down the proper location for the custom **Kafka connector** plugins to live; since Confluent has its own opinions on how to build a Kafka container and it doesn't line up with the standard Kafka Docker image.
1. Identify target location to store the plugin (jar) by locating `CONNECT_PLUGIN_PATH` property in **docker-compose.yml** under `connect` service. 
We found `/usr/share/java` so we make sure that's where we copy the plugin (jar) to.
```
CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
```

*Note*:
(Many of the services have the kafka commands installed, and they all have the same location. We're actually going to be running the scripts from the `broker` service since that's the actual Kafka container)

2. Update `plugin.path` variable in `connect.standalone.config.properties`. This is a Kafka config property. It needs to include `/usr/share/java` and `/usr/share/java/plugins` because that's where we're going 
to be uploading all of our artifacts (jar files) from the Kafka Ethereum Connector build.

&nbsp;
## Verifying the files were copied properly
```
docker exec -it broker bash
ls /tmp
ls /usr/share/java
ls /usr/share/java/plugins
```

&nbsp;
### Docker host/container communication
Regarding `ganache.config.properties`:
- When using inside of a docker container, ensure that you use `host.docker.internal` for the hostname in **web3_rpc_url** and NOT localhost/127.0.0.1/0.0.0.0
