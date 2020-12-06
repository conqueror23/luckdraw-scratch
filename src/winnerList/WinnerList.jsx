import React from "react";
import "./winnerList.css";

const WinnerList = ({ winnerList = [] }) => {
  return (
    <div className="winnerList" >
      <h1>Winners List :</h1>
      {winnerList.length > 0 ? (
        <>
          {winnerList.map((winner, index) => {
            return (
              <div className="winner">
                <span className="order"> Round : {index + 1}</span>
                <span> Winner : <span className="winner-value"> {winner}  </span></span>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default WinnerList;
