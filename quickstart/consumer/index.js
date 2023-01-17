import Kafka from 'node-rdkafka';
import eventType from '../../eventType.js';
import minimist from 'minimist';
import { topic } from '../models.js';

const brokers = ['localhost:9092'];

const args = minimist(process.argv.slice(2));

const consumerNumber = args['n'];

const consumerConfig = {
  'group.id': `web3-blocks-group${consumerNumber}`,
  'metadata.broker.list': brokers,
  'enable.auto.commit': false, // don't commit my offset
};

const topicConfig = {
  'auto.offset.reset': 'earliest' // consume from the start
};

// Create empty topicConfig object to have consumer only pick up messages that started after it came online.
const consumer = new Kafka.KafkaConsumer(consumerConfig, topicConfig);

consumer.connect();

consumer.on('ready', () => {
  const topics = [topic, 'web3-blocks'];
  consumer.subscribe(topics);
  consumer.consume();
}).on('data', function(data) {
  const dataTopic = data.topic;
  const timestamp = data.timestamp;
  console.log(`Received message from topic ${dataTopic} at ${new Date(timestamp).toTimeString()}, offset: ${data.offset}`);
  if(dataTopic == 'web3-blocks') {
    processWeb3Blocks(data);
  } else if(dataTopic == topic) {
    processTestData(data);
  }
});

function processTestData(data) {
  console.log(`\t\ttest data is ${eventType.fromBuffer(data.value)}`);
}

function processWeb3Blocks(data) {
  try {
    const block = JSON.parse(data.value);
    console.log(`\t\tBlock ${block.number} of size ${block.size} contained ${block.transactions.length} transactions. Recorded at ${new Date(block.timestamp).toUTCString()}`);
  } catch(error) {
    // TODO: do something?
  }
}