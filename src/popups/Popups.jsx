import React from "react";
import { css } from "@emotion/css";
import { useSpring, useTransition, animated } from "react-spring";

import backFrame from './red-christmas-background.jpg'
export default function Popup({ isOpen, children }) {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 }
  });
  const transitions = useTransition(isOpen, null, {
    from: { transform: `scale(1.5)`, opacity: 0 },
    enter: { transform: `scale(1)`, opacity: 1 },
    leave: { transform: `scale(1.5)`, opacity: 0 },
    unique: true
  });
  console.log(transitions);
  return (
    <div className={cssWrapper}>
      <animated.div className={cssOverlay} style={props} />
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} className={cssContent} style={props}>
            <div>{children}</div>
          </animated.div>
        ) : null
      )}
    </div>
  );
}

const cssWrapper = css`
  position: fixed;
  border-radius:8px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const cssContent = css`
  position: relative;
  background:url(${backFrame}) center center/cover no-repeat;
  z-index: 5;
  border-radius: 50%;
  align-self: flex-start;
  color: #fff;
  width: 422px;
  padding: 30px;
  box-sizing: border-box;
  min-height: 150px;
  margin: auto;
  border-radius:8px;
`;

const cssOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;
