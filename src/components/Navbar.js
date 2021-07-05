import React, { useState } from "react";
import logo from "../assets/logo-open2be.png";

export default function Navbar() {
  const [ account, setAccount] = useState("");

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  console.log(account)

  return (
    <div className="mt-4 mx-auto d-flex justify-content-between align-items-center w-75">
      <img src={logo} alt="" />
      <button
        className="rounded-pill px-4 py-2 bg-primary text-white shadow-none"
        onClick={connect}
      >
        {account.length > 0 ? account : "Connect" }
      </button>
    </div>
  );
}
