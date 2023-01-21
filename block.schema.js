import avro from 'avsc';

const web3BlockAvro = {
  "type": "record",
  "name": "Record",
  "fields": [
    {
      "name": "number",
      "type": "long"
    },
    {
      "name": "hash",
      "type": "string"
    },
    {
      "name": "parentHash",
      "type": "string"
    },
    {
      "name": "logsBloom",
      "type": "string"
    },
    {
      "name": "transactionsRoot",
      "type": "string"
    },
    {
      "name": "stateRoot",
      "type": "string"
    },
    {
      "name": "receiptsRoot",
      "type": "string"
    },
    {
      "name": "miner",
      "type": "string"
    },
    {
      "name": "difficulty",
      "type": "string"
    },
    {
      "name": "totalDifficulty",
      "type": "string"
    },
    {
      "name": "extraData",
      "type": "string"
    },
    {
      "name": "size",
      "type": "string"
    },
    {
      "name": "gasLimit",
      "type": "string"
    },
    {
      "name": "gasUsed",
      "type": "string"
    },
    {
      "name": "nrgLimit",
      "type": "string"
    },
    {
      "name": "nrgUsed",
      "type": "string"
    },
    {
      "name": "timestamp",
      "type": "long"
    },
    {
      "name": "seed",
      "type": "string"
    },
    {
      "name": "sealType",
      "type": "string"
    },
    {
      "name": "signature",
      "type": "string"
    },
    {
      "name": "publicKey",
      "type": "string"
    },
    {
      "name": "mainChain",
      "type": "string"
    },
    {
      "name": "transactions",
      "type": {
        "type": "array",
        "items": {
          "type": "record",
          "namespace": "Record",
          "name": "transactions",
          "fields": [
            {
              "name": "blockHash",
              "type": "string"
            },
            {
              "name": "blockNumber",
              "type": "long"
            },
            {
              "name": "from",
              "type": "string"
            },
            {
              "name": "to",
              "type": "string"
            },
            {
              "name": "nrg",
              "type": "string"
            },
            {
              "name": "nrgPrice",
              "type": "string"
            },
            {
              "name": "gas",
              "type": "string"
            },
            {
              "name": "gasPrice",
              "type": "string"
            },
            {
              "name": "hash",
              "type": "string"
            },
            {
              "name": "input",
              "type": "string"
            },
            {
              "name": "nonce",
              "type": "long"
            },
            {
              "name": "transactionIndex",
              "type": "long"
            },
            {
              "name": "value",
              "type": "string"
            },
            {
              "name": "timestamp",
              "type": "long"
            },
            {
              "name": "v",
              "type": "string"
            },
            {
              "name": "r",
              "type": "string"
            },
            {
              "name": "s",
              "type": "string"
            }
          ]
        }
      }
    },
    {
      "name": "transaction_hashes",
      "type": {
        "type": "array",
        "items": "null"
      }
    }
  ]
};

export default avro.Type.forSchema(web3BlockAvro);
