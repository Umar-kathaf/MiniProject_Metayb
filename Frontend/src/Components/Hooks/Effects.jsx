import React, { useEffect, useState } from "react";

const Effects = () => {
    const [count, setCount] = useState(0)
    // const [seconds, setSeconds] = useState(0)
    // const [intervalId, setIntervalId] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setCount(count +1)
    }, 500)
  },[]);
  return (
    <div> 
      <h1>UseEffect Compount rende {count} times!r</h1>
      
    </div>
  );
};

export default Effects;
