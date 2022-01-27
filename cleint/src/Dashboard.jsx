import React from "react";

const Dashboard = () => {
  return (
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
            <input></input>
            <div className="greeting_button">
              <button>Fetch Greeting</button>
              <button>Set Greeting</button>
            </div>
          </div>
       
          <p>TRANSACTION</p>
          <div className="transaction">
            <div className="transaction_input">
              <input />
            </div>
            <div className="transaction_button">
              <input />
              <button>Get balance</button>
              <button>Send Coin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
