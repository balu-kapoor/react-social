import React, { useState, useEffect } from "react";
import Facebook from "./components/Facebook";
import "./App.css";

function App() {
  const [logout, setLogout] = useState(false);
  // console.log(window.FB);

  useEffect(() => {}, [logout]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Facebook Auth</h1>

        <button
          className="logout"
          onClick={() => {
            window.FB.logout(function (response) {
              // user is now logged out
              console.log(response);
            });
            setLogout(false);
          }}
        >
          Logout
        </button>
      </header>
      <p className="App-intro">To get started, login with facebook</p>

      <Facebook />
    </div>
  );
}

export default App;
