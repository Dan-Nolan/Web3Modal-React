import { ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import './App.css';

const providerOptions = {
  // portis: {
  //   package: Portis,
  //   options: {
  //     id: // TODO: add PORTIS id here 
  //   }
  // },
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     infuraId: // TODO: add infura ID here
  //   }
  // }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions // required
});


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Web3 />
      </div>
    </div>
  );
}

function Web3() {
  const [account, setAccount] = useState({ connected: false });
  
  async function connect() {
    const web3ModalProvider = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    async function setAccountFromProvider() {
      const signer = await provider.getSigner(0);
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setAccount({
        connected: true,
        provider,
        address,
        signer,
        balance: ethers.utils.formatEther(balance)
      });
    }

    setAccountFromProvider();

    web3ModalProvider.on("accountsChanged", () => {
      setAccountFromProvider();
    });
  }

  async function signMessage() {
    const signedMessage = await account.signer.signMessage("Please Login to our website!");
    console.log(signedMessage);
  }

  if(!account.connected) {
    return (
      <div className="button" onClick={connect}>
        Connect to Web3!
      </div>
    )
  }
  else {
    return (
      <div className="account">
        { account.address } - { account.balance }

        <div className="button" onClick={signMessage}>
          Sign Message
        </div>
      </div>
    )
  }

}


export default App;
