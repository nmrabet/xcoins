import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "../assets/logo-open2be.png";
import {
  ABI,
  ABIepToken,
  xCoinABI,
  contractAddress,
  epTokenContractAddress,
  xCoinContract,
} from "../ABI/ABI";
import Web3 from "web3";

export default function Main() {
  const [account, setAccount] = useState("");
  const [depositInput, setDepositInput] = useState("");
  const [withdrawInput, setWitdhrawInput] = useState("");
  const [reward, setReward] = useState("");
  const [deposit, setDeposit] = useState("");

  const onChange = (event) => {
    setDepositInput(event.target.value);
  };

  const onWithdrawChange = (event) => {
    setWitdhrawInput(event.target.value);
  };

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    checkProfit(accounts[0]);
    checkDeposit(accounts[0]);
  }

  console.log(account);

  function handleDeposit() {
    const web3 = new Web3(window.web3.currentProvider);
    let amount = web3.utils.toWei(depositInput, "ether");
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
          .deposit(2, amount, false)
          .send({ from: account })
          .then((depositResult) => console.log(depositResult));
      });
  }

  function handleWithdraw() {
    const web3 = new Web3(window.web3.currentProvider);
    let amount = web3.utils.toWei(withdrawInput, "ether");
    const contractXCoin = new web3.eth.Contract(xCoinABI, xCoinContract);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const result = contract.methods.userInfo(2, account).call();
    console.log(result);
    let pendingRewards = result[2];
    contractXCoin.methods.transfer(pendingRewards, account).then((result) => {
      contractAddress.methods
        .withdraw(2, amount, false)
        .send({ from: account })
        .then((withdrawResult) => console.log(withdrawResult));
    });
  }

  const checkProfit = async (acc) => {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const result = await contract.methods.pendingXcoin(2, acc).call();
    let profitAmount = web3.utils.fromWei(result, "ether");
    setReward(profitAmount);
  };

  const checkDeposit = async (acc) => {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const result = await contract.methods.userInfo(2, acc).call();
    console.log(result);
    let depositAmount = result[0];
    depositAmount = web3.utils.fromWei(depositAmount, "ether");
    setDeposit(depositAmount);
  };

  function handleClaim() {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    contract.methods
      .claim(2)
      .send({ from: account })
      .then((claimResult) => console.log(claimResult));
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
          <div className="col">{deposit}</div>
          <div className="col">LP</div>
        </div>
        <div className="mt-4 row text-center">
          <div className="col">Profit</div>
          <div className="col">{reward} Xcoins</div>
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
                  value={depositInput}
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
                  value={withdrawInput}
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
