import Kafka from 'node-rdkafka';
import eventType from '../../eventType.js';

const brokers = ['localhost:9092'];
const consumerConfig = {
  'group.id': 'my-app-name-frombeginning',
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
  console.log('consumer ready..')
  consumer.subscribe(['test']);
  consumer.consume();
}).on('data', function(data) {
  console.log(`received message: ${eventType.fromBuffer(data.value)}`);
});
