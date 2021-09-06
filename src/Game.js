import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
let isX = true;
let totalClicks = 0;
let isplaying;

const testObject = (size = 3) => {
  let obj = {};
  for (let i = 0; i < size; i++) {
    obj[i + 1] = new Array(+size).fill("");
  }
  return obj;
};

//Normal verification
const verifyResult = (result, using) => {
  const comp = result[0];
  if (comp === "X" || comp === "O") {
    let win = true;
    let str;
    result.forEach((val) => {
      if (val !== comp) {
        win = false;
      }
    });
    if (win) {
      str = `Winner is ${comp} using ${using}`;
      return { win: win, message: str };
    }
  }
  return { win: false, message: "No Winner" };
};

//1.Horizontal winner takes horizontal row array and the row key as parameter
const horizontalCheck = (arr, key) => {
  const status = verifyResult(arr, `row ${key}`);
  return status;
};

//2.Vertical Check takes obj as parameter
const verticalCheck = (obj) => {
  let status;
  const arrs = Object.values(obj);
  let result = [];
  for (let i = 0; i < arrs.length; i++) {
    result = arrs.map((arr) => arr[i]);
    console.log("result:", result);
    status = verifyResult(result, `column ${i + 1}`);
    if (status.win) {
      return status;
    }
  }
  return status;
};

//3.diagonal check using object
const diagonalCheck = (obj) => {
  const arrs = Object.values(obj);
  let result = [];

  for (let i = 0; i < arrs.length; i++) {
    result.push(arrs[i][i]);
  }

  let status = verifyResult(result, "diagonal");
  if (status.win) {
    return status;
  }
  result = [];
  let j = arrs.length - 1;
  for (let i = 0; i < arrs.length; i++) {
    result.push(arrs[i][j]);
    j--;
  }
  status = verifyResult(result, "diagonal");
  return status;
};

const Game = (props) => {
  //const [isX, setIsX] = useState(true);
  const [obj, setObj] = useState(testObject(3));
  const size1 = props.value;
  const [message, setMessage] = useState();

  const init = (size1) => {
    const o = testObject(size1);
    console.log("test object", o);
    totalClicks = 0;
    isplaying = true;
    setObj(o);
    setMessage("");
  };

  useEffect(() => {
    init(size1);
  }, [size1]);

  const fillBox = (val, row, col) => {
    console.log("val row---", val, row, col);
    const newObj = { ...obj };
    let [..._value] = [...newObj[row]];
    _value[col] = isX ? "X" : "O";
    newObj[row] = _value;
    console.log("newobj", newObj);
    setObj(newObj);
    isX = !isX;
    totalClicks++;
    let status = horizontalCheck(_value, row);
    if (status.win) {
      setMessage(<p>{status.message}</p>);
      isplaying = false;
      return;
    }
    status = verticalCheck(newObj);
    if (status.win) {
      setMessage(<p>{status.message}</p>);
      isplaying = false;
      return;
    }
    status = diagonalCheck(newObj);
    if (status.win) {
      setMessage(<p>{status.message}</p>);
      isplaying = false;
      return;
    }

    if (totalClicks === size1 * size1) {
      setMessage(<p>Game over!</p>);
      isplaying = false;
    }
  };

  const printBox = (obj) => {
    const arrs = Object.values(obj);
    let result = arrs.map((arr, key) => {
      return (
        <div
          key={key}
          style={{
            display: "flex",
          }}
        >
          {arr.map((value, k) => {
            return (
              <div
                key={k}
                style={{
                  border: "1px solid",
                  width: "3rem",
                  height: "3rem",
                  textAlign: "center",
                  lineHeight: "3rem",
                  background:
                    value.length === 0
                      ? "white"
                      : " rgba(196, 202, 255, 0.959)",
                  cursor: value.length === 0 ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  value.length === 0 && isplaying && fillBox(value, key + 1, k);
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      );
    });

    return result;
  };

  return (
    <div>
      {printBox(obj)}
      {message}
      {!isplaying && <button onClick={() => init(3)}>Reset Game</button>}
    </div>
  );
};

export default React.memo(Game);
