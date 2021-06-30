import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Main() {
  return (
    <div className="">
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
            </Tabs>
            <p>0.5% fee for withdrawals within 3 days</p>
          </div>
          <input
            type="text"
            name=""
            id=""
            className="rounded-pill w-75 mx-auto"
          />
          <p>WALLET BALANCE: 0.000 Xcoins</p>
        </div>
        <div className="mt-4 border-top"></div>
        <div className="text-center mt-3 mb-3">
          <h5>YOUR BALANCE</h5>
          <h2>$</h2>
          <button className="rounded-pill">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
