import Kafka from 'node-rdkafka';
import eventType from '../../eventType.js';

import { topic, getDiscipline, getSkill } from '../models.js';

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: topic
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueRandomMessage() {
  const discipline = getDiscipline();
  const skill = getSkill();
  const event = { 
    discipline, 
    skill 
  };
  const success = stream.write(eventType.toBuffer(event));     
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

setInterval(() => {
  queueRandomMessage();
}, 2500);
