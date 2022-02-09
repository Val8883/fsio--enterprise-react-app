import { useContext } from "react";
import DrawerContext from "./DrawerContext";
import "./styles.css";

const DrawerComponent = () => {
  const drawerContext = useContext(DrawerContext);

  return (
    <div>
      {drawerContext.showDrawer ? (
        <div className="drawer">
          <p>
            I'm the child component in DrawerComponent.js. You see me when the
            drawer is open.
          </p>
          <button
            onClick={() => {
              drawerContext.toggleDrawerState(false);
            }}
          >
            Close Drawer from Child
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DrawerComponent;
