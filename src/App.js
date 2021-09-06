import React, { useState } from "react";
import Game from "./Game";
import "./index.css";

let err;

function App() {
  const [size, setSize] = useState(3);

  const inputHandler = (e) => {
    const val = e.target.value;
    if (val <= 8 && val >= 2) {
      setSize(val);
      err = "";
    } else if (val.length > 0) {
      console.log("entered here");
      err = (
        <p style={{ color: "red" }}>
          Please enter value between 2-8, we don't support entered value
        </p>
      );
      setSize(0);
      console.log(err);
    } else {
      setSize(3);
      err = "";
    }
  };

  return (
    <div className="main-div">
      <h1>TIC TAC TOE</h1>
      <div style={{ margin: "1.5rem" }}>
        <label className="size-label" htmlFor="boxSize">
          ENTER THE SIZE OF BOX
        </label>
        <input
          className="size-input"
          type="number"
          onChange={inputHandler}
          name="boxSize"
        />
      </div>
      <div style={{ minHeight: "2rem" }}>{err}</div>
      <div style={{ marginLeft: "25%" }}>
        <Game value={size} />
      </div>
    </div>
  );
}

export default App;
