import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "../assets/logo-open2be.png";
import {
  ABI,
  ABIepToken,
  contractAddress,
  epTokenContractAddress,
} from "../ABI/ABI";
import Web3 from "web3";

export default function Main() {
  const [account, setAccount] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");

  const onChange = (event) => {
    setDeposit(event.target.value);
  };

  const onWithdrawChange = (event) => {
    setWithdraw(event.target.value);
  };

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  console.log(account);

  function handleDeposit() {
    const web3 = new Web3(window.web3.currentProvider);
    let amount = web3.utils.toWei(deposit, "ether");
    const contractEpToken = new web3.eth.Contract(
      ABIepToken,
      epTokenContractAddress
    );
    contractEpToken.methods
      .approve(contractAddress, amount)
      .send({ from: account })
      .then((result) => {
        const contract = new web3.eth.Contract(ABI, contractAddress);
        contract.methods
          .deposit(1, amount, false)
          .send({ from: account })
          .then((depositResult) => console.log(depositResult));
        console.log(contract);
      });
  }

  function handleWithdraw() {
    const web3 = new Web3(window.web3.currentProvider);
    let amount = web3.utils.toWei(withdraw, "ether");
    const contract = new web3.eth.Contract(ABI, contractAddress);
    contract.methods
      .withdraw(0, amount, false)
      .send({ from: account })
      .then((withdrawResult) => console.log(withdrawResult));
  }

  function handleClaim() {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    contract.methods
      .claim(deposit)
      .call()
      .then((claimResult) => console.log(claimResult));
  }

  function handleProfit() {
    const web3 = new Web3(window.web3.currentProvider);
    let profit = web3.utils.toWei(deposit, "ether");
    const contract = new web3.eth.Contract(ABI, contractAddress);
    contract.methods
      .userInfo(profit)
      .call()
      .then((profitResult) => console.log(profitResult));
  }

  

  return (
    <div className="">
      <div className="mt-4 mx-auto d-flex justify-content-between align-items-center w-75">
        <img src={logo} alt="" />
        <button
          className="rounded-pill px-4 py-2 bg-primary text-white shadow-none"
          onClick={connect}
        >
          {account.length > 0 ? account : "Connect"}
        </button>
      </div>
      <div className="container mt-4 border rounded">
        <div className="mt-4 row text-center">
          <div className="col">Compounding</div>
          <div className="col">
            <FiCheckCircle />
          </div>
          <div className="col">Automatic</div>
        </div>
        <div className="mt-4 row text-center">
          <div className="col">APY</div>
          <div className="col">222.07%</div>
          <div className="col"></div>
        </div>
        <div className="mt-4 row text-center">
          <div className="col">Deposit</div>
          <div className="col">0.000</div>
          <div className="col">LP</div>
        </div>
        <div className="mt-4 row text-center">
          <div className="col">Profit</div>
          <div className="col">0.000 Xcoins</div>
          <div className="col">
            <button className="px-3 border rounded-pill" onClick={handleClaim}>
              Claim
            </button>
          </div>
          <div className="mt-4 border-top"></div>
          <div className="p-3 mx-auto w-75">
            <Tabs>
              <TabList className="d-flex justify-content-center align-items-baseline">
                <Tab>Deposit</Tab>
                <div> | </div>
                <Tab>Withdraw</Tab>
              </TabList>
              <TabPanel>
                <input
                  type="text"
                  name=""
                  id=""
                  value={deposit}
                  onChange={onChange}
                  className="rounded-pill w-100 px-3"
                />
                <p>WALLET BALANCE: 0.000 Xcoins</p>
                <button className="px-3 rounded-pill" onClick={handleDeposit}>
                  Deposit
                </button>
              </TabPanel>
              <TabPanel>
                <input
                  type="text"
                  name=""
                  id=""
                  value={withdraw}
                  onChange={onWithdrawChange}
                  className="rounded-pill w-100 px-3"
                />
                <p>WALLET BALANCE: 0.000 Xcoins</p>
                <button className="px-3 rounded-pill" onClick={handleWithdraw}>
                  Withdraw
                </button>
              </TabPanel>
            </Tabs>
          </div>
          <p>0.5% fee for withdrawals within 3 days</p>
        </div>
        <div className="mt-4 border-top"></div>
        <div className="text-center mt-3 mb-3">
          <h5>YOUR BALANCE</h5>
          <h2>$</h2>
          <button className="px-3 rounded-pill" onClick={connect}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
