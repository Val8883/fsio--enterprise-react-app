import { useEffect, useState, useRef } from "react";
import "./styles.css";

const App = () => {
  const inputRef = useRef(null);
  const [number, setNumber] = useState(0);
  const numberRef = useRef(number);
  const [numberDiff, setNumberDiff] = useState(null);

  const focusInput = () => inputRef.current.focus();

  const calcNewDiff = (e) => {
    setNumber(e.target.value);
  };

  useEffect(() => {
    const oldNumber = numberRef.current;

    if (number > oldNumber) {
      setNumberDiff("higher");
    } else if (number < oldNumber) {
      setNumberDiff("lower");
    } else if (number === oldNumber) {
      setNumberDiff("same");
    }

    // Don't forget to update reference manually
    numberRef.current = number;
  }, [number]);

  return (
    <div className="App">
      <h1>useRef Example</h1>
      <h3>The input gets focused on once the button is clicked.</h3>
      <label htmlFor="rate">Number</label>
      <input
        id="rate"
        type="number"
        ref={inputRef}
        placeholder="Number here"
        onChange={(e) => calcNewDiff(e)}
      />
      <div>
        <button onClick={() => focusInput()}>Focus the input</button>
      </div>
      {numberDiff === "higher" ? (
        <h4>The new rate {number} is higher than the old one.</h4>
      ) : null}
      {numberDiff === "lower" ? (
        <h4>The new rate {number} is lower than the old one.</h4>
      ) : null}
    </div>
  );
};

export default App;
