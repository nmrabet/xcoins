import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "../assets/logo-open2be.png";
import { ABI, contractAddress } from "../ABI/ABI";
import Web3 from "web3";

export default function Main() {
  const [account, setAccount] = useState("");

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  console.log(account);

  function handleDeposit() {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(ABI, contractAddress);
    // contract.methods
    //   ._xcoinPerBlock()
    //   .call()
    //   .then((result) => console.log(result));
    console.log(contract);
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
          <div className="col">Xcoins</div>
        </div>
        <div className="mt-4 row text-center">
          <div className="col">Profit</div>
          <div className="col">0.000 Xcoins</div>
          <div className="col">
            <button className="px-3 border rounded-pill">Claim</button>
          </div>
          <div className="mt-4 border-top"></div>
          <div className="p-3 mx-auto d-flex justify-content-between align-items-baseline w-75">
            <Tabs>
              <TabList className="d-flex justify-content-between align-items-baseline">
                <Tab>Deposit</Tab>
                <div> | </div>
                <Tab>Withdraw</Tab>
              </TabList>
              <TabPanel>
                <input
                  type="text"
                  name=""
                  id=""
                  className="rounded-pill w-100"
                />
                <p>WALLET BALANCE: 0.000 Xcoins</p>
              </TabPanel>
              <TabPanel>
                <input
                  type="text"
                  name=""
                  id=""
                  className="rounded-pill w-100"
                />
                <p>WALLET BALANCE: 0.000 Xcoins</p>
              </TabPanel>
            </Tabs>
            <p>0.5% fee for withdrawals within 3 days</p>
          </div>
        </div>
        <div className="mt-4 border-top"></div>
        <div className="text-center mt-3 mb-3">
          <h5>YOUR BALANCE</h5>
          <h2>$</h2>
          <button className="rounded-pill">Connect</button>
          <button onClick={handleDeposit}> Withdraw </button>
        </div>
      </div>
    </div>
  );
}
