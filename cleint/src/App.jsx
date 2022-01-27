import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Dashboard from './Dashboard';
import Greeter from '../../backend/src/artifacts/contracts/Greeter.sol/Greeter.json'
import Token from '../../backend/src/artifacts/contracts/Token.sol/Token.json'

const greeterAddress = "0x3C70164b876D0D66dF4EBc4E9BfcA5b52833e627"
const tokenAddress = "0x40F97701751EE3434B01e4a4Ff14400394B7B454"

function App() {
  const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />

        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header> */}
      {/* <Dashboard/> */}
      <div>
      <div className="card">
        <div className="crypto_card">
          <div className="card_heading">
            <h3>WALLET</h3>
            <p>Blockchain</p>
          </div>
          <div className="card_account_number">
            <p>account number</p>
            <p>123450607789012345678</p>
          </div>
          <div className="card_detail">
            <div className="card_holder_name">
              <p>Name</p>
              <p>prathamesh katkar</p>
            </div>
            <div className="card_expiry_date">
              <p>Expires on</p>
              <p>10/25</p>
            </div>
          </div>
        </div>
        <div className="crypto_form">
          <p>GREETING</p>
          <div className="greeting">
            <input  onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting"></input>
            <div className="greeting_button">
              <button onClick={getBalance}>Fetch Greeting</button>
              <button onClick={setGreeting}>Set Greeting</button>
            </div>
          </div>
       
          <p>TRANSACTION</p>
          <div className="transaction">
            <div className="transaction_input">
              <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID"/>
            </div>
            <div className="transaction_button">
              <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
              <button onClick={getBalance}>Get balance</button>
              <button onClick={sendCoins}>Send Coin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
