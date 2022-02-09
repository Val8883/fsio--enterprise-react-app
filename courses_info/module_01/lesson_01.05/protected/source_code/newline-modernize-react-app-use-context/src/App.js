import { useState } from "react";
import DrawerContext from "./DrawerContext";
import InBetweenComponent from "./InbetweenComponent";
import "./styles.css";

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawerState = (val) => {
    setShowDrawer(val);
  };

  return (
    <DrawerContext.Provider value={{ showDrawer, toggleDrawerState }}>
      <div className="App">
        <h1>useContext Example</h1>
        <InBetweenComponent />
        {!showDrawer ? (
          <>
            <p>
              I'm the parent component in App.js. You see me when the drawer is
              closed.
            </p>
            <button onClick={() => toggleDrawerState(true)}>
              Open Drawer from Parent
            </button>
          </>
        ) : null}
      </div>
    </DrawerContext.Provider>
  );
};

export default App;
