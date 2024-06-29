import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
// import { TransitionGroup } from "ReactTransitionGroup";
import "../../index.css";

const UpcomingLiveWebinar = ({ items, active }) => {
  const [state, setState] = useState({
    items: items,
    active: active,
    direction: "",
  });

  const moveLeft = () => {
    let newActive = state.active - 1;
    setState({
      ...state,
      active: newActive < 0 ? state.items.length - 1 : newActive,
      direction: "left",
    });
  };

  const moveRight = () => {
    let newActive = state.active + 1;
    setState({
      ...state,
      active: newActive % state.items.length,
      direction: "right",
    });
  };

  const generateItems = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let level;
    for (let i = state.active - 2; i < state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = state.items.length + i;
      } else if (i >= state.items.length) {
        index = i % state.items.length;
      }
      level = state.active - i;
      items.push(<Item key={index} id={state.items[index]} level={level} />);
    }
    return items;
  };
  return (
    <section className="relative">
      <div id="carousel">
        <div className="arrow arrow-left" onClick={moveLeft}>
          <i className="fi-arrow-left"></i>
        </div>
        <TransitionGroup>{generateItems()}</TransitionGroup>
        <div className="arrow arrow-right" onClick={moveRight}>
          <i className="fi-arrow-right"></i>
        </div>
      </div>
    </section>
  );
};

const Item = ({ id, level }) => {
  const className = "item level" + level;
  return <div className={className}>{id}</div>;
};

export default UpcomingLiveWebinar;
