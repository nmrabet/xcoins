import React from "react";
import logo from "../assets/logo-open2be.png";

export default function Navbar() {
  function connect() {
    window.ethereum.request({ method: "eth_requestAccounts" });
  }
  console.log(connect);

  return (
    <div className="mt-4 mx-auto d-flex justify-content-between align-items-center w-75">
      <img src={logo} alt="" />
      <button className="rounded-pill px-4 py-2 bg-primary text-white" onClick={connect}>
        Connect
      </button>
    </div>
  );
}
