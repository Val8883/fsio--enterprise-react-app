import { useState } from "react";
import "./styles.css";

const App = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <h1>useState Examples</h1>
      <h2>
        When showMessage's state is updated, previous state doesn't matter much.
      </h2>
      <h3>
        Current showMessage State:&nbsp;
        {showMessage ? <span>true</span> : <span>false</span>}
      </h3>
      <h2>{showMessage}</h2>
      {showMessage ? (
        <h3>When `showMessage` is true, you see me.</h3>
      ) : (
        <h3>When it's false, you don't</h3>
      )}
      <button onClick={() => setShowMessage(false)}>Hide message</button>
      <h2>
        But when new state does depend on previous state, prevState can be
        passed into the setCounter function below. Pretty cool!&nbsp;
        <span role="img" aria-label="sunglasses emoji">
          😎
        </span>
      </h2>
      <h3>Current Count:&nbsp; {counter}</h3>
      <button onClick={() => setCounter((prevCounter) => prevCounter - 1)}>
        Remove 1
      </button>
      <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
        Add 1
      </button>
    </div>
  );
};

export default App;
