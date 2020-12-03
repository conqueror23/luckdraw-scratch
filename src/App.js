import React, { Fragment, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import {ReactComponent as Logo} from "./delete.svg";
import "./App.css";
import Winners from './winnerList/WinnerList.jsx'

var storage = window.localStorage;

const DEFAULT = "default_list";

const getSelectedNumber =(list,calcuPower)=>{
  const archDegree = 360/list.length
    const rotationAngle = map(calcuPower, 0, 100, 0, 1700)
    const balance = rotationAngle%360;
    const arrowLocation =(Math.abs(360-balance)-90)/archDegree
    const numberIndex = arrowLocation>0?Math.ceil(arrowLocation):Math.ceil(list.length+arrowLocation)
    return list[numberIndex-1];

}

const default_list = JSON.parse(storage.getItem(DEFAULT)) ?? [
  "金鳳",
  "金坊",
  "叁茶陸飯",
  "意樂",
  "韓閣",
];

// const OFFSET = Math.random();
const OFFSET =0;

const map = function (value, in_min, in_max, out_min, out_max) {
  if (value === 0) {
    return out_min;
  }
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function App() {
    const [winnerList,setWinnerList] =useState([]);
  const r = 190;
  const cx = 250;
  const cy = 250;
  const [list, setList] = useState(default_list);
  const [name, setName] = useState("");
  const [power, setPower] = useState(0);
    const [previousPower,setPreviousPower]= useState(0)
  const [acc, setAcc] = useState(0);
  const config = { mass: 50, tension: 200, friction: 200, precision: 0.001 };
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
  const reset=()=>{
    storage.clear()
    window.location.reload()
  }

  useEffect(() => {
      if(power!==previousPower){
          set({
              from: { transform: `rotate(${map(acc, 0, 100, 0, 1700)}deg)` },
              transform: `rotate(${map(acc + power, 0, 100, 0, 1700)}deg)`,
              immediate: false,
              config,
          });
          setAcc(acc + power);
          setPreviousPower(power);
          const calcuPower =acc+power
          const selectedNumber =getSelectedNumber(list,calcuPower)


          if(!winnerList.includes(selectedNumber)){
              setWinnerList([...winnerList,selectedNumber])
          }
      }
  }, [acc, config, list, power, previousPower, set, winnerList]);



  const rederItems = (numOfItems) => {
    let items = [];
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
            stroke="#4065a2"
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
            {list[i]}
          </text>
        </Fragment>
      );
    }
    return items;
  };


  return (
    <div className="main-wrapper" style={{ overflowX: "hidden" }}>
        <div className="content-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        style={{ width: "60vw", height: "80vh" }}
      >
        <g fill="white" stroke="green" strokeWidth="10">
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
        <g fill="#7fdaf8">
          <circle cx="250" cy="250" r="15" />
        </g>
        <g fill="black">
          <circle cx="250" cy="250" r="4" />
        </g>
        <g fill="#1a3997" stroke="#91abd0" strokeWidth="2">
          <polygon points="250,70 230,10 270,10" />
        </g>
      </svg>
      <PressButton setPower={setPower} />
      <div style={{ marginTop: "20vh", marginBottom: "5vh" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="button" onClick={addItem}>Add</button>
        <button className="button" onClick={reset}>reset</button>
        {list.map(n => (
          <div key={n} className="item">
            {n}
            <Logo
              data-item={n}
              fill="#a3aab8"
              style={{ height: "1em", width:'auto', verticalAlign: "sub", marginLeft: "5px" }}
              onClick={deleteItem}
            />
          </div>
        ))}
      </div>
          </div>
        <Winners winnerList={winnerList}/>
    </div>
  );
}

const PressButton = ({ setPower }) => {
  const [pressed, toggle] = useState(false);
  const [width, setWidth] = useState(0);
  const [props, set] = useSpring(() => ({
    width: "0%",
    backgroundColor: "hotpink",
  }));
  useEffect(() => {
    if (pressed)
      set({
        from: { width: "0%", backgroundColor: "hotpink" },
        to: { width: "100%", backgroundColor: "red" },
        immediate: false,
        config: { duration: 400 },
      });
    else {
          setPower(parseInt(width));
      set({ to: { width: "0%", backgroundColor: "hotpink" }, immediate: true });
    }
  }, [pressed, set, setPower, width]);

  return (
    <button
      className="main"
      onMouseDown={() => {
        toggle(!pressed);
      }}
      onMouseUp={() => {
        toggle(!pressed);
      }}
      onTouchStart={() => {
        toggle(!pressed);
      }}
      onTouchEnd={() => {
        toggle(!pressed);
      }}
    >
      <animated.div
        className="fill"
        style={{
          width: props.width,
          background: props.backgroundColor,
        }}
      />
      <animated.div className="content">
        {props.width.interpolate((x) => {
          setWidth(parseInt(x));
          return x === "0%" ? "Hold Me For More Strength" : "Pressurised "+parseInt(x) + "%";
        })}
      </animated.div>
    </button>
  );
};

export default App;
