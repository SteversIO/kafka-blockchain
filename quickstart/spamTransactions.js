import { ethers } from 'ethers';

const ganacheMnemonic = 'cart quit item wisdom inject company nominee cross glory gasp dry until';

const providerConfig = {
    name: "ganache-dev",
    rpc: 'http://127.0.0.1:7545',
    chainId: 1337,
};

const provider = new ethers.providers.StaticJsonRpcProvider(
  providerConfig.rpc,
  {
    chainId: providerConfig.chainId,
    name: providerConfig.name,
  }
);

generateAccountsAndWallets().then((accounts) => {
  createRandomTransactions(accounts);
});

async function createRandomTransactions(accounts) {
  for(let i=0;i<100;i++) {
    // Pick first wallet
    const choices = [...Array(accounts.length).keys()];
    const pickIndex = Math.floor(Math.random() * choices.length);
    const choice1 = choices[pickIndex];
    const sender = accounts[choices[pickIndex]];

    // Remove that wallet as a choice
    choices.splice(pickIndex , 1);

    // Pick second wallet
    const choice2 = choices[Math.floor(Math.random() * choices.length)];

    console.log(`Chose accounts ${choice1} and ${choice2}`)
    const receiver = accounts[choice2];

    // Send Money!
    await sendMoney(sender, receiver);
  }
}

async function sendMoney(sender, receiver) {
  const fraction = (Math.random() * 1.0);
  let amountInEther = `${fraction}`;

  let tx = {
      to: receiver.address,
      value: ethers.utils.parseEther(amountInEther)
  };

  const txReceipt = await sender.wallet.sendTransaction(tx)
  console.log(`Sent ${amountInEther} eth from ${sender.address} to ${receiver.address} | tx: ${txReceipt.hash}`);
}

async function generateAccountsAndWallets() {
  const numberOfAcounts = 5;
  const accounts = [...Array(numberOfAcounts).keys()].map(async (n) => {
    let bip32Code = `m/44'/60'/0'/0/${n}`;

    const wallet = new ethers.Wallet(
      ethers.Wallet.fromMnemonic(ganacheMnemonic, bip32Code), // "private key" from second wallet address in mnemonic
      provider
    );
    
    const address = await wallet.getAddress();
    return {
      address,
      wallet
    }
  });

  return await Promise.all(accounts);
}
