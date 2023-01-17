import Kafka from 'node-rdkafka';
import eventType from '../../eventType.js';

const brokers = ['localhost:9092'];
const consumerConfig = {
  'group.id': 'web3-blocks-group5',
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
  const topics = ['test', 'web3-blocks'];
  consumer.subscribe(topics);
  consumer.consume();
}).on('data', function(data) {
  const topic = data.topic;
  const timestamp = data.timestamp;
  console.log(`Received message from topic ${topic} at ${new Date(timestamp).toUTCString()}, offset: ${data.offset}`);
  if(topic == 'web3-blocks') {
    processWeb3Blocks(data);
  } else if(topic== 'test') {
    processTestData(data);
  }
});

function processTestData(data) {
  console.log(`test data is ${eventType.fromBuffer(data.value)}`);
}

function processWeb3Blocks(data) {
  try {
    const block = JSON.parse(data.value);
    console.log(`Block ${block.number} of size ${block.size} contained ${block.transactions.length} transactions. Recorded at ${new Date(block.timestamp).toUTCString()}`);
  } catch(error) {
    // TODO: do something?
  }
}