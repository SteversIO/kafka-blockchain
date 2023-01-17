import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    { name: "number", type: 'string' },
    { name: "hash", type: 'string' },
    { name: "parentHash", type: 'string' },
    { name: "logsBloom", type: 'string' },
    { name: "transactionsRoot", type: 'string' },
    { name: "stateRoot", type: 'string' },
    { name: "receiptsRoot", type: 'string' },
    { name: "miner", type: 'string' },
    { name: "difficulty", type: 'string' },
    { name: "totalDifficulty", type: 'string' },
    { name: "extraData", type: 'string' },
    { name: "size", type: 'string' },
    { name: "gasUsed", type: 'string' },
    { name: "gasLimit", type: 'string' },
    { name: "nrgLimit", type: 'string' },
    { name: "nrgUsed", type: 'string' },
    { name: "timestamp", type: 'string' },
    { name: "seed", type: 'string' },
    { name: "sealType", type: 'string' },
    { name: "signature", type: 'string' },
    { name: "publicKey", type: 'string' },
    { name: "mainChain", type: 'string' },
    { name: "transactions", type: 'string' },
    { name: "transaction_hashes" , type: 'string' }
  ]
});
