import React, { useState, useEffect } from "react";

const ClickCounterComponent = () => {
  const [clickCount1, setClickCount1] = useState(0);
  const [clickCount2, setClickCount2] = useState(0);
  const [intervalCount, setIntervalCount] = useState(0);

  //   console.log("Render called");

  //   useEffect(() => {
  //     console.log("useEffect for clickCount1");
  //   }, [clickCount1]);

  //   useEffect(() => {
  //     console.log("useEffect for clickCount2");
  //   }, [clickCount2]);

  //   useEffect(() => {
  //     console.log("useEffect for no state parameter");
  //   }, []);

  useEffect(() => {
    console.log("useEffect for clickCount1 and clickCount2");
  }, [clickCount1, clickCount2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const person = { firstName: "Juan", lastName: "Dela Cruz" };

  useEffect(() => {
    console.log("useEffect for person object");
  }, [person.firstName, person.lastName]);

  return (
    <div>
      <h2>Click Counter</h2>

      <p>
        <label>Click Count: {clickCount1} </label>
        <button onClick={(e) => setClickCount1((prev) => 1)}>Button 1</button>
      </p>

      <p>
        <label>Click Count: {clickCount2} </label>
        <button onClick={(e) => setClickCount2((prev) => prev + 1)}>
          Button 2
        </button>
      </p>
      <p>
        <label>{intervalCount}</label>
      </p>
    </div>
  );
};

export default ClickCounterComponent;
