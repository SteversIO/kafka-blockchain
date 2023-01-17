import Kafka from 'node-rdkafka';
import eventType from '../../eventType.js';
import blockEventType from '../../block.schema.js';

const brokers = ['localhost:9092'];
const consumerConfig = {
  'group.id': 'web3-blocks-group1',
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
  const topics = ['web3-blocks'];
  console.log('consumer ready..')
  consumer.subscribe(topics);
  consumer.consume();
}).on('data', function(data) {
  const value = data.value;
  console.log(`received message: ${blockEventType.fromBuffer(value)}`);
});
