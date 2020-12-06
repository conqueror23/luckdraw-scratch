import React, { Fragment, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { ReactComponent as Logo } from "./delete.svg";
import "./App.css";
import Winners from "./winnerList/WinnerList.jsx";
import Popup from "./popups/Popups.jsx";
import acyLogo from "./acy_security_logo.png";
import santas from "./santax.gif";
import chrismasTree from "./tree.gif";
import merryChristmas from './merry-christmas.gif'

var storage = window.localStorage;

const DEFAULT = "default_list";

const getSelectedNumber = (list, calcuPower) => {
  const archDegree = 360 / list.length;
  const rotationAngle = map(calcuPower, 0, 100, 0, 1700);
  const balance = rotationAngle % 360;
  const arrowLocation = (Math.abs(360 - balance) - 90) / archDegree;
  const numberIndex =
    arrowLocation > 0
      ? Math.ceil(arrowLocation)
      : Math.ceil(list.length + arrowLocation);
  return list[numberIndex - 1];
};

const default_list = JSON.parse(storage.getItem(DEFAULT)) ?? [
  "金鳳",
  "金坊",
  "叁茶陸飯",
  "意樂",
  "韓閣",
];

// const OFFSET = Math.random();
const OFFSET = 0;

const map = function (value, in_min, in_max, out_min, out_max) {
  if (value === 0) {
    return out_min;
  }
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function App() {
  const [winnerList, setWinnerList] = useState([]);
  const r = 170;
  const cx = 250;
  const cy = 250;
  const [list, setList] = useState(default_list);
  const [selectedNumber, setSelectedNumber] = useState();
  const [openPop, setOpenPop] = useState(false);
  const [name, setName] = useState("");
  const [power, setPower] = useState(0);
  const [previousPower, setPreviousPower] = useState(0);
  const [acc, setAcc] = useState(0);
  const config = {
    mass: 50,
    tension: 200,
    friction: 200,
    precision: 0.001,
    duration: 500,
  };
  const [props, set] = useSpring(() => ({
    transform: "rotate(0deg)",
    immediate: false,
  }));
  const addItem = () => {
    storage.setItem(DEFAULT, JSON.stringify([...list, name]));
    setList([...list, name]);
    setName("");
  };
  const deleteItem = (e) => {
    const { item } = e.currentTarget.dataset;
    storage.setItem(DEFAULT, JSON.stringify(list.filter((e) => e !== item)));
    setList(list.filter((e) => e !== item));
  };
  const reset = () => {
    storage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (power !== previousPower) {
      const calcuPower = acc + power;
      set({
        from: { transform: `rotate(${map(acc, 0, 100, 0, 1700)}deg)` },
        transform: `rotate(${map(acc + power, 0, 100, 0, 1700)}deg)`,
        immediate: false,
        config,
      });
      setAcc(calcuPower);
      setPreviousPower(power);
      setSelectedNumber(getSelectedNumber(list, calcuPower));

      setTimeout(() => {
        setOpenPop(!openPop);
      }, 600);
    }
  }, [
    acc,
    config,
    list,
    openPop,
    power,
    previousPower,
    selectedNumber,
    set,
    winnerList,
  ]);

  const rederItems = (numOfItems) => {
      let items = [];
      const abbrName = (name) => {
          return name.length > 8 ? name.slice(0, 8) + "..." : name;
      };

      const  getRandomColor=()=>{
          var color = "";
          for(var i = 0; i < 3; i++) {
              var sub = Math.floor(Math.random() * 256).toString(16);
              color += (sub.length == 1 ? "0" + sub : sub);
          }
          return "#" + color;
      }

      for (let i = 0; i < numOfItems; i++) {
          let xLength = Math.cos(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
          let yLength = Math.sin(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
          let txLength =
              Math.cos(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
          let tyLength =
              Math.sin(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
          items.push(

              <Fragment key={i}>
                  <line
                      stroke={getRandomColor()}
                      strokeWidth="2"
                      x1={cx + xLength}
                      y1={cy + yLength}
                      x2={cx}
                      y2={cy}
                  />
                          <text
                              x={cx + txLength}
                              y={cy + tyLength}
                              fontSize="15px"
                              transform={`rotate(${((i + 0.5) / numOfItems + OFFSET) * 360}
                  ${cx + txLength},
                  ${cy + tyLength})`}
                          >
                                  {abbrName(list[i])}
                              </text>
                                  </Fragment>
          );
      }
      return items;
  };

  return (
      <>
    <div className="main-wrapper" style={{ overflowX: "hidden" }}>
      <Popup isOpen={openPop}>
        <div className="result-popups" >
          <img src={santas} alt="santas is bussy" />
          <p>
            The Winner is :{" "}
            <span style={{ fontWeight: "bold" }}>{selectedNumber}</span>{" "}
          </p>
          <button
            onClick={() => {
              setOpenPop(!openPop);

              setWinnerList([...winnerList, selectedNumber]);
              setList(list.filter((e) => e !== selectedNumber));
            }}
          >
            Next Round..
          </button>
        </div>
      </Popup>
    <div className="draw-area">
      <div className="content-wrapper">
        {list&&list.length>1?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          style={{ width: "50vw", height: "92vh",padding:"0 10vw"}}
        >
          <g fill="rgba(255, 255, 255, 0.6)" stroke="#f1c40f" strokeWidth="10">
            <circle cx="250" cy="250" r={r} />
          </g>
          <animated.g
            style={{
              transform: props.transform,
              transformOrigin: "center",
            }}
          >
            {rederItems(list.length)}
          </animated.g>
          <g fill="#f1c40f">
            <circle cx="250" cy="250" r="15" />
          </g>
          <g fill="white">
            <circle cx="250" cy="250" r="4" />
          </g>
          <g fill="#c0392b" stroke="#f1c40f" strokeWidth="2">
            <polygon points="250,70 230,5 270,5" />
          </g>
        </svg>:<div style={{height:"52vh",width:"50vw",marginTop:"40%",fontSize:"40px",color:"#f1c40f",padding:"0 10vw"}}> Last Winner is {list[0]}</div>}
        <PressButton setPower={setPower} />
      </div>
      {winnerList.length > 0 ? <Winners winnerList={winnerList} /> : null}
          </div>
      <img className="company-logo" src={acyLogo} alt="logo lost" />
        <img className="merrry-christmas" src={merryChristmas} alt='christmas incomming'/>

    </div>
        <div style={{ marginTop: "100vh", marginBottom: "5vh", zIndex: "1200",position:"absolute",left:"45%" }}>
            <h1> Here comes with backdoors :-D</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="button" onClick={addItem}>
            Add
          </button>
          <button className="button" onClick={reset}>
            reset
          </button>
          {list.map((n) => (
            <div key={n} className="item">
              {n}
              <Logo
                data-item={n}
                fill="#a3aab8"
                style={{
                  height: "1em",
                  width: "auto",
                  verticalAlign: "sub",
                  marginLeft: "5px",
                }}
                onClick={deleteItem}
              />
            </div>
          ))}
        </div>
      </>
  );
}

const PressButton = ({ setPower }) => {
  const randomPressure = Math.random() * 100;
  console.log("randomPressure", randomPressure);
  return (
    <button
      className="main"
      onClick={() => {
        setPower(randomPressure);
      }}
    >
      Start Rolling{" "}
    </button>
  );
};

export default App;
