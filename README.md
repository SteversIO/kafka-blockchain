# Kafka + Blockchain 
This project is a proof-of-concept (POC) to demonstrate how to use Kafka, blockchain and Kafka connectors 
to stream blockchain data (blocks, transactions, and events) into Kafka.

&nbsp;
## Kafka Quick Start
```
npm install
docker compose up -d
```

### Create a producer
```
npm run start:producer
```

### Create a consumer
```
npm run start:consumer
```

### Control Center (UI)
Navigate to [localhost:9021](http://localhost:9021) in your favorite browser.

&nbsp;
## Blockchain Quick Start

1. Spin up Ganache locally (in separate terminal)
```
npx ganache-cli
```
2. Capture ganache-cli output values for `Mnemonic` and `Listening on...`
```
> Mnemonic:      escape fluid width tooth below review ask spy outside velvet ivory timber
> Listening on 127.0.0.1:8545
```
2. Update **port** only in `web3_rpc_url` in `/kafka-web3-connector/ganache.config.properties`
     - Since we're using Docker containers, you need to keep he *host.docker.internal* 
3. Update your mnemonic seed phrase in `ganacheMnemonic` in `/quickstart/spamTransactions.js`
4. Setup & Run one of the Kafka connectors. See individual README:
   - [kafka-web3-connector](/kafka-web3-connector/README.md) *(recommended)*
   - [kafka-ethereum-connector](/kafka-ethereum-connector/README.md)

&nbsp;
## Tinkering with Kafka
### Creating a topic

1. I used Confluent's Control Center UI to create a topic called `test`. Then you can run the quickstart producer and consumer scripts.
2. Then ran `npm run start:producer` in one terminal
3. Run `npm run start:consumer` in another terminal

To bring everything down:
```
docker compose down
```

### Run the Kafka web3 connector
See individual README in /kafka-ethereum-connector and /kafka-web3-connector





