import avro from 'avsc';

import { disciplines, skills } from './quickstart/models.js';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'discipline',
      type: { type: 'enum', symbols: disciplines }
    },
    {
      name: 'skill',
      type: 'string'
    }
  ]
});
